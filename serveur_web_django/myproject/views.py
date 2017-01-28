from myproject.models import Events
from myproject.serializers import EventsSerializer, SummarySerializer, MapSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import datetime


class Summary(APIView):
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):
        to = request.query_params['start_time']
        format_str = '%Y-%m-%dT%H:%M:%S.%fZ'
        to = datetime.strptime(to, format_str)

        pipeline = [{
            '$match': {
                'Time': {
                    '$lte': to
                    }
                }
            },
            {
                '$group': {
                    '_id': "summary",
                    'Clinton': {
                        '$sum': "$Clinton"
                    },
                    'Trump': {
                        '$sum': "$Trump"
                    }
                }
            }
        ]

        queryset = Events.objects.aggregate(*pipeline)
        summary = SummarySerializer(queryset, many=True)

        pipeline = [
            {
                '$match': {
                    'Time': {
                        '$lte': to
                    }
                }
            },
            {
                '$group': {
                    '_id': '$Abr',
                    'Gvoters': {
                        '$first': '$Gvoters'
                    },
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

        data = {
            'Clinton': {
                'votes': summary.data[0]['Clinton'],
                'Gvoters': 0
            },
            'Trump': {
                'votes': summary.data[0]['Trump'],
                'Gvoters': 0
            }
        }

        queryset = Events.objects.aggregate(*pipeline)
        serialized = MapSerializer(queryset, many=True)

        for result in serialized.data:
            winner = ""
            max_votes = 0
            for candidate in result:
                if candidate not in ['_id', 'Gvoters'] and result[candidate] > max_votes:
                    max_votes = result[candidate]
                    winner = candidate

            if winner in ['Trump', 'Clinton']:
                data[winner]['Gvoters'] += result['Gvoters']

        return Response(data)


class Map(APIView):
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):
        to = request.query_params['start_time']
        format_str = '%Y-%m-%dT%H:%M:%S.%fZ'
        to = datetime.strptime(to, format_str)

        pipeline = [
            {
                '$match': {
                    'Time': {
                        '$lte': to
                    }
                }
            },
            {
                '$group': {
                    '_id': '$Abr',
                    'Gvoters': {
                        '$first': '$Gvoters'
                    },
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

        queryset = Events.objects.aggregate(*pipeline)
        serialized = MapSerializer(queryset, many=True)

        data = {}
        for result in serialized.data:
            winner = ""
            max_votes = 0
            for candidate in result:
                if candidate not in ['_id', 'Gvoters'] and result[candidate] > max_votes:
                    max_votes = result[candidate]
                    winner = candidate

            data[result['_id']] = {
                'fillKey': winner,
                'Gvoters': result['Gvoters'],
                'Clinton': {
                    'votes': result['Clinton']
                },
                'Trump': {
                    'votes': result['Trump']
                },
                'Autre': {
                    'votes': result['Autre']
                },
                'Blanc': {
                    'votes': result['Blanc']
                },
                'Castle': {
                    'votes': result['Castle']
                },
                'McMullin': {
                    'votes': result['McMullin']
                },
                'Stein': {
                    'votes': result['Stein']
                },
                'Johnson': {
                    'votes': result['Johnson']
                }
            }

        return Response(data)


class Timeline(APIView):
    renderer_classes = (JSONRenderer, )


class Turnout(APIView):
    renderer_classes = (JSONRenderer, )
