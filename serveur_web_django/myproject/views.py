from myproject.models import Events
from myproject.serializers import EventsSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import datetime


class Summary(APIView):
    renderer_classes = (JSONRenderer, )
    queryset = Events.objects.all()
    serializer_class = EventsSerializer

    def get(self, request, format=None):
        to = request.query_params['start_time']
        format_str = '%Y-%m-%dT%H:%M:%S.%fZ'
        to = datetime.strptime(to, format_str)

        raw = {
            'Time': {
                '$lte': to
            }
        }

        pipeline = [{
            '$match': {
                'Time': {
                    '$lte': to
                    }
                }
            },
            {
                '$group': {
                    '_id': "sum",
                    'Trump': {
                        '$sum': "$Trump"
                    },
                    'Clinton': {
                        '$sum': "$Clinton"
                    },
                    'Autre': {
                        '$sum': "$Autre"
                    },
                    'Blanc': {
                        '$sum': "$Blanc"
                    },
                    'Castle': {
                        '$sum': "$Castle"
                    },
                    'McMullin': {
                        '$sum': "$McMullin"
                    },
                    'Stein': {
                        '$sum': "$Stein"
                    },
                    'Johnson': {
                        '$sum': "$Johnson"
                    }
                }
            }
        ]

        # queryset = Events.objects.aggregate(*pipeline)
        queryset = Events.objects(__raw__=raw)
        serialized = EventsSerializer(queryset, many=True)
        return Response(serialized.data)
