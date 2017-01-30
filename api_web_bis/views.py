from myproject.models import Events
from myproject.serializers import EventsSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
import datetime

class Summary(APIView): 
    renderer_classes = (JSONRenderer, )
    queryset = Events.objects.all()
    serializer_class = EventsSerializer

    
    def get(self, request):  
        start_time = request.GET['start_time']
        queryset = Events.objects.filter(State = start_time)
        '''def get(self, request): start_time
        queryset = Events.objects.all()
         queryset = Events.objects.filter(State = 'Minnesota')
         queryset = Events.objects.find(Time = "2016-11-08 20:00:00" ), headline='Hello')
        queryset = Events.objects.sum(((Time = ('$gte'=ISODate("2016-11-08T20:00:00Z"),'$lte'=ISODate("2016-11-08T20:10:00Z")))))
        queryset = Events.objects(Time='2016-11-08 20:00:00Z')
        '''
        
        

        serialized = EventsSerializer(queryset, many=True)
        return Response(serialized.data)

class Map(APIView): 
    renderer_classes = (JSONRenderer, )
    queryset = Events.objects.all()
    serializer_class = EventsSerializer
    
    def get(self, request, format=None):
        ''' queryset = Events.objects.all()
         queryset = Events.objects.filter(State = 'Minnesota')
         queryset = Events.objects.find(Time = "2016-11-08 20:00:00" ), headline='Hello')
        queryset = Events.objects.sum(((Time = ('$gte'=ISODate("2016-11-08T20:00:00Z"),'$lte'=ISODate("2016-11-08T20:10:00Z")))))
        
        '''
        queryset = Events.objects.all()

        serialized = EventsSerializer(queryset, many=True)
        return Response(serialized.data)
        
class Timeline(APIView): 
    renderer_classes = (JSONRenderer, )
    queryset = Events.objects.all()
    serializer_class = EventsSerializer
    
    def get(self, request, format=None):
        ''' queryset = Events.objects.all()
         queryset = Events.objects.filter(State = 'Minnesota')
         queryset = Events.objects.find(Time = "2016-11-08 20:00:00" ), headline='Hello')
        queryset = Events.objects.sum(((Time = ('$gte'=ISODate("2016-11-08T20:00:00Z"),'$lte'=ISODate("2016-11-08T20:10:00Z")))))
        
        '''
        queryset = Events.objects.filter(Time = "2016-11-08 20:00:00")

        serialized = EventsSerializer(queryset, many=True)
        return Response(serialized.data)

      
        
