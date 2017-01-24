from rest_framework import serializers
from myproject.models import Events

		
class EventsSerializer(serializers.Serializer):
    Time = serializers.CharField()
    State = serializers.CharField(max_length=200)
    Clinton = serializers.CharField(max_length=200)
    Trump = serializers.CharField(max_length=200)
    Autre = serializers.CharField(max_length=200)
    Castle = serializers.CharField(max_length=200)
    McMullin = serializers.CharField(max_length=200)
    Blanc = serializers.CharField(max_length=200)
    Stein = serializers.CharField(max_length=200)
    Johnson = serializers.CharField(max_length=200)

    def create(self, attrs, instance=None):
        if instance is not None:
            for k, v in attrs.iteritems():
                setattr(instance, k, v)
            return instance
        return Events(**attrs)