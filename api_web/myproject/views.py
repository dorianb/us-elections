from myproject.models import Events
from myproject.serializers import GvotersSerializer, SummarySerializer, \
                                    MapSerializer
from myproject.pipelines import Pipeline

from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import datetime

import pandas as pd
import numpy as np
import os


class Summary(APIView):
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):
        to = request.query_params['start_time']
        format_str = '%Y-%m-%dT%H:%M:%S.%fZ'
        to = datetime.strptime(to, format_str)

        queryset = Events.objects.aggregate(*Pipeline().getResults(to))
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

        queryset = Events.objects.aggregate(*Pipeline().getResultsByState(to))
        serialized = MapSerializer(queryset, many=True)

        data = {}
        for result in serialized.data:
            _id = result.pop('_id')
            data[_id] = result

        return Response(data)


class Prediction(APIView):
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):

        # Get results
        to = request.query_params['start_time']
        format_str = '%Y-%m-%dT%H:%M:%S.%fZ'
        to = datetime.strptime(to, format_str)

        queryset = Events.objects.aggregate(*Pipeline().getResultsByState(to))
        results = MapSerializer(queryset, many=True).data

        # Get Gvoters by state
        queryset = Events.objects.aggregate(*Pipeline().getGvotersByState())
        gvoters = GvotersSerializer(queryset, many=True).data

        # Get predictions
        path = os.path.dirname(os.path.realpath(__file__))
        df = pd.read_csv(path + '/percent-elections-dem.csv',
                         skiprows=4, header=0, encoding='latin1')
        df['Dpercentagesince1856'] = df['Dpercentagesince1856'].str.replace(
            '%', '')
        df = df[['states', 'Dpercentagesince1856']].set_index('states')
        df = df['Dpercentagesince1856'].astype(np.float32)
        data = df.to_dict()

        # Mixe predictions, results and gvoter
        for gvoter in gvoters:
            _id = gvoter.pop('_id')
            result = [result for result in results if result.get('_id') == _id]
            if len(result) > 0:
                data[_id] = {
                    'Gvoters': result[0]['Gvoters'],
                    'fillKey': result[0]['fillKey']
                }
            else:
                winner = 'Clinton' if data[_id] > 0.50 else 'Trump'
                data[_id] = {
                    'Gvoters': gvoter['Gvoters'],
                    'fillKey': winner
                }

        return Response(data)


class Timeline(APIView):
    renderer_classes = (JSONRenderer, )
