from myproject.models import Events
from myproject.serializers import SummarySerializer, MapSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import datetime

import pandas as pd
import os


class Summary(APIView):
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
                '$project': {
                    'Trump': {'$ifNull': ["$Trump", 0]},
                    'Clinton': {'$ifNull': ["$Clinton", 0]},
                    'Autre': {'$ifNull': ["$Autre", 0]},
                    'Blanc': {'$ifNull': ["$Blanc", 0]},
                    'Castle': {'$ifNull': ["$Castle", 0]},
                    'McMullin': {'$ifNull': ["$McMullin", 0]},
                    'Stein': {'$ifNull': ["$Stein", 0]},
                    'Johnson': {'$ifNull': ["$Johnson", 0]},
                    'Gvoters': 1,
                    'Voters': 1,
                    '_id': '$Abr'
                }
            },
            {
                '$project': {
                    'Trump': 1,
                    'Clinton': 1,
                    'Gvoters': 1,
                    'Voters': 1,
                    '_id': 1,
                    'max_votes': {
                        '$max': ["$Trump", "$Clinton", "$Autre", "$Blanc", "$Castle", "$McMullin", "$Stein", "$Johnson"]
                    },
                    'total_votes': {
                        '$add': ["$Trump", "$Clinton", "$Autre", "$Blanc", "$Castle", "$McMullin", "$Stein", "$Johnson"]
                    }
                }
            },
            {
                '$project': {
                    'Trump': 1,
                    'Clinton': 1,
                    '_id': 1,
                    'Clinton_GE': {
                        '$cond': {
                            'if': {'$eq': ['$max_votes', '$Clinton']}, 'then': '$Gvoters', 'else': 0}
                    },
                    'Trump_GE': {
                        '$cond': {
                            'if': {'$eq': ['$max_votes', '$Trump']}, 'then': '$Gvoters', 'else': 0}
                    },
                    'ratio': {
                        '$divide': ['$total_votes', '$Voters']
                    }
                }
            },
            {
                '$group': {
                    '_id': "",
                    'Trump': {
                        '$sum': '$Trump'
                    },
                    'Clinton': {
                        '$sum': "$Clinton"
                    },
                    'Trump_GE': {
                        '$sum': '$Trump_GE'
                    },
                    'Clinton_GE': {
                        '$sum': '$Clinton_GE'
                    },
                    'ratio': {
                        '$avg': '$ratio'
                    }
                }
            },
            {
                '$project': {
                    'turnout': {
                        '$multiply': ['$ratio', 100]
                    },
                    'Trump': {
                        'votes': '$Trump',
                        'Gvoters': '$Trump_GE'
                    },
                    'Clinton': {
                        'votes': '$Clinton',
                        'Gvoters': '$Clinton_GE'
                    }
                }
            }
        ]

        queryset = Events.objects.aggregate(*pipeline)
        serialized = SummarySerializer(queryset, many=True)

        data = {
            'turnout': serialized.data[0]['turnout'],
            'Clinton': serialized.data[0]['Clinton'],
            'Trump': serialized.data[0]['Trump']
        }

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
                '$project': {
                    'Trump': {'$ifNull': ["$Trump", 0]},
                    'Clinton': {'$ifNull': ["$Clinton", 0]},
                    'Autre': {'$ifNull': ["$Autre", 0]},
                    'Blanc': {'$ifNull': ["$Blanc", 0]},
                    'Castle': {'$ifNull': ["$Castle", 0]},
                    'McMullin': {'$ifNull': ["$McMullin", 0]},
                    'Stein': {'$ifNull': ["$Stein", 0]},
                    'Johnson': {'$ifNull': ["$Johnson", 0]},
                    'Gvoters': 1,
                    'Voters': 1,
                    '_id': '$Abr'
                }
            },
            {
                '$project': {
                    'Trump': 1,
                    'Clinton': 1,
                    'Autre': 1,
                    'Blanc': 1,
                    'Castle': 1,
                    'McMullin': 1,
                    'Stein': 1,
                    'Johnson': 1,
                    'Gvoters': 1,
                    'Voters': 1,
                    '_id': 1,
                    'max_votes': {
                        '$max': ["$Trump", "$Clinton", "$Autre", "$Blanc", "$Castle", "$McMullin", "$Stein", "$Johnson"]
                    },
                    'total_votes': {
                        '$add': ["$Trump", "$Clinton", "$Autre", "$Blanc", "$Castle", "$McMullin", "$Stein", "$Johnson"]
                    }
                }
            },
            {
                '$project': {
                    'Trump': 1,
                    'Clinton': 1,
                    'Autre': 1,
                    'Blanc': 1,
                    'Castle': 1,
                    'McMullin': 1,
                    'Stein': 1,
                    'Johnson': 1,
                    'Gvoters': 1,
                    '_id': 1,
                    'fillKey': {
                        '$switch': {
                          'branches': [
                             {'case': {'$eq': ['$max_votes', '$Trump']}, 'then': "Trump"},
                             {'case': {'$eq': ['$max_votes', '$Clinton']}, 'then': "Clinton"},
                             {'case': {'$eq': ['$max_votes', '$Autre']}, 'then': "Autre"},
                             {'case': {'$eq': ['$max_votes', '$Blanc']}, 'then': "Blanc"},
                             {'case': {'$eq': ['$max_votes', '$Castle']}, 'then': "Castle"},
                             {'case': {'$eq': ['$max_votes', '$McMullin']}, 'then': "McMullin"},
                             {'case': {'$eq': ['$max_votes', '$Stein']}, 'then': "Stein"},
                             {'case': {'$eq': ['$max_votes', '$Johnson']}, 'then': "Johnson"},
                          ]
                        }
                    },
                    'ratio': {
                        '$divide': ['$total_votes', '$Voters']
                    }
                }
            },
            {
                '$project': {
                    'fillKey': 1,
                    'Gvoters': 1,
                    'turnout': {
                        '$multiply': ['$ratio', 100]
                    },
                    'Trump': {
                        'votes': '$Trump'
                    },
                    'Clinton': {
                        'votes': '$Clinton'
                    },
                    'Autre': {
                        'votes': '$Autre'
                    },
                    'Blanc': {
                        'votes': '$Blanc'
                    },
                    'Castle': {
                        'votes': '$Castle'
                    },
                    'McMullin': {
                        'votes': '$McMullin'
                    },
                    'Stein': {
                        'votes': '$Stein'
                    },
                    'Johnson': {
                        'votes': '$Johnson'
                    }
                }
            }
        ]

        queryset = Events.objects.aggregate(*pipeline)
        serialized = MapSerializer(queryset, many=True)

        data = {}
        for result in serialized.data:
            _id = result.pop('_id')
            data[_id] = result

        return Response(data)


class Prediction(APIView):
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):

        path = os.path.dirname(os.path.realpath(__file__))

        df_state_to_initial_letters = pd.read_csv(path + 'percent-elections-dem.csv', skiprows=4, header=0, encoding='latin1')
        df_state_to_initial_letters['Dpercentagesince1856'] = df_state_to_initial_letters['Dpercentagesince1856'].str.replace('%', '')
        df_states_Dpercentagesince1856 = pd.DataFrame(df_state_to_initial_letters[['states', 'Dpercentagesince1856']])

        df_states_Dpercentagesince1856.to_json(path_or_buf='df_states_Dpercentagesince1856')
        print('df_state_to_initial_letters')

        return Response()


class Timeline(APIView):
    renderer_classes = (JSONRenderer, )
