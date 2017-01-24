from myproject.models import Events
from myproject.serializers import EventsSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

class Summary(APIView): 
    renderer_classes = (JSONRenderer, )
    queryset = Events.objects.all()
    serializer_class = EventsSerializer
    
    def get(self, request, format=None):
        queryset = Events.objects.all()
        serialized = EventsSerializer(queryset, many=True)
        return Response(serialized.data)
        
