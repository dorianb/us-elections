# us-elections
NoSQL project

## Base de données

La base de données contient les résultats des élections de 2016 par état.

Exemple de requête:
```
rs0:PRIMARY> db.events.findOne()
{
    "_id" : ObjectId("588b22fc5617cf6a8756cf0e"),
    "Time" : ISODate("2016-11-08T20:00:00Z"),
    "State" : "Minnesota",
    "Abr" : "MN",
    "Voters" : 3972330,
    "Gvoters" : 10,
    "Autre" : 41657,
    "Castle" : 9456,
    "Clinton" : 1367716,
    "Johnson" : 112972,
    "McMullin" : 53076,
    "Stein" : 36985,
    "Trump" : 1322951
}
```

### Connexion à l'instance

```
mongo --ssl --sslAllowInvalidCertificates loadBalancer-58809977.eu-west-2.elb.amazonaws.com/db
```

## Application web
L'application web expose des services pour accéder au données. Le serveur web Django est utilisé pour exécuter l'application.

L'application web est déployé en continue sur une instance EC2 Amazon et accessible à cette adresse: http://52.90.157.37/

Les trois services exposés sont:
- http://52.90.157.37/summary?start_time=2016-11-08T20:00:00.000Z
- http://52.90.157.37/map?start_time=2016-11-08T20:00:00.000Z
- http://52.90.157.37/timeline?start_time=2016-11-08T20:00:00.000Z

### Install

#### python3 and pip
```
sudo apt-get install python pip
```

#### Modules
```
pip install Django mongoengine djangorestframework
```

### Start
```
python manage.py runserver
```

Si nécessaire, ajouter le dossier où les bibliothèques sont installées:
```
export PYTHONPATH=$PYTHONPATH:"/opt/anaconda3/lib/python3.5/site-packages"
```

## Dashboard
Le dashboard est une application écrite avec les frameworks Reactjs et D3js.

L'architecture Flux a été mise en place pour garantir la stabilité de l'application.
![](https://cask.scotch.io/2014/10/V70cSEC.png)

Le design du site est inspiré de celui du huffingtonpost: http://elections.huffingtonpost.com/2016/results/president

Le dashboard est déployé en continue sur une instance EC2 Amazon et accessible à cette adresse: http://54.91.134.147

### Install
La processus d'installation décrit ci-dessous vous permettra de tester l'application sur votre poste.

#### Nodejs and npm
Sur Ubuntu:
```
sudo apt-get install node nodejs-legacy npm
```

#### Node modules
Installer les packages nécessaires pour l'application.
```
npm install
```

### Build
Construire les fichiers javascript à partir des fichiers sources.
```
npm run build
```

### Start
Démarrer l'application
```
npm run start
```

### Deploy

Le déploiement continue est réalisé à l'aide de docker, aws-cli et jq.
Il faut modifier la configuration de la commande deploy afin d'indiquer le dépôt ECR vers lequel déployer l'image de l'application.
```
npm run deploy
```
