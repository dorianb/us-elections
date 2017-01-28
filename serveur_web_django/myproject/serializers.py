from rest_framework import serializers
from myproject.models import Events


class EventsSerializer(serializers.Serializer):
    Time = serializers.DateTimeField()
    State = serializers.CharField()
    Clinton = serializers.IntegerField()
    Trump = serializers.IntegerField()
    Autre = serializers.IntegerField()
    Castle = serializers.IntegerField()
    McMullin = serializers.IntegerField()
    Blanc = serializers.IntegerField()
    Stein = serializers.IntegerField()
    Johnson = serializers.IntegerField()
    Voters = serializers.IntegerField()
    Gvoters = serializers.IntegerField()
    Abr = serializers.CharField()

    def create(self, attrs, instance=None):
        if instance is not None:
            for k, v in attrs.iteritems():
                setattr(instance, k, v)
            return instance
        return Events(**attrs)
