#!/usr/bin/env bash

# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

configure_aws_cli(){
	aws --version
	aws configure set default.region us-east-1
	aws configure set default.output json
}

deploy_cluster() {

    family="dashboard-static-app"

    make_task_def
    register_definition
    if [[ $(aws ecs update-service --cluster dashboard-cluster-1 --service dashboard-service --task-definition $revision | \
                   $JQ '.service.taskDefinition') != $revision ]]; then
        echo "Error updating service."
        return 1
    fi

    # wait for older revisions to disappear
    # not really necessary, but nice for demos
    for attempt in {1..30}; do
        if stale=$(aws ecs describe-services --cluster dashboard-cluster-1 --services dashboard-service | \
                       $JQ ".services[0].deployments | .[] | select(.taskDefinition != \"$revision\") | .taskDefinition"); then
            echo "Waiting for stale deployments:"
            echo "$stale"
            sleep 5
        else
            echo "Deployed!"
            return 0
        fi
    done
    echo "Service update took too long."
    return 1
}

make_task_def(){
	task_template= '[
    {
      "volumesFrom": [],
      "memory": 500,
      "extraHosts": null,
      "dnsServers": null,
      "disableNetworking": null,
      "dnsSearchDomains": null,
      "portMappings": [
        {
          "hostPort": 80,
          "containerPort": 80,
          "protocol": "tcp"
        }
      ],
      "hostname": null,
      "essential": true,
      "entryPoint": [],
      "mountPoints": [],
      "name": "dashboard-container",
      "ulimits": null,
      "dockerSecurityOptions": null,
      "environment": [],
      "links": null,
      "workingDirectory": null,
      "readonlyRootFilesystem": null,
      "image": "%s.dkr.ecr.us-east-1.amazonaws.com/dashboard:%s",
      "command": null,
      "user": null,
      "dockerLabels": null,
      "logConfiguration": null,
      "cpu": 1024,
      "privileged": null,
      "memoryReservation": null
    }
  ]'

	task_def=$(printf "$task_template" $AWS_ACCOUNT_ID $CIRCLE_SHA1)
}

push_ecr_image(){
	eval sudo $(aws ecr get-login --region us-east-1)
  AWS_ACCOUNT_ID="104705712208"
  CIRCLE_SHA1="latest"
	sudo docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/dashboard:$CIRCLE_SHA1
}

register_definition() {

    if revision=$(aws ecs register-task-definition --container-definitions "$task_def" --family $family | $JQ '.taskDefinition.taskDefinitionArn'); then
        echo "Revision: $revision"
    else
        echo "Failed to register task definition"
        return 1
    fi

}

configure_aws_cli
push_ecr_image
deploy_cluster
