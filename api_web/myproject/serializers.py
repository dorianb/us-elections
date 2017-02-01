from rest_framework import serializers
from myproject.models import Events


class GvotersSerializer(serializers.Serializer):
    _id = serializers.CharField()
    Gvoters = serializers.IntegerField()

    def create(self, attrs, instance=None):
        if instance is not None:
            for k, v in attrs.iteritems():
                setattr(instance, k, v)
            return instance
        return Events(**attrs)


class SummarySerializer(serializers.Serializer):
    turnout = serializers.FloatField()
    Clinton = serializers.DictField()
    Trump = serializers.DictField()

    def create(self, attrs, instance=None):
        if instance is not None:
            for k, v in attrs.iteritems():
                setattr(instance, k, v)
            return instance
        return Events(**attrs)


class MapSerializer(serializers.Serializer):
    _id = serializers.CharField()
    Gvoters = serializers.IntegerField()
    turnout = serializers.FloatField()
    fillKey = serializers.CharField()
    Clinton = serializers.DictField()
    Trump = serializers.DictField()
    Castle = serializers.DictField()
    McMullin = serializers.DictField()
    Stein = serializers.DictField()
    Johnson = serializers.DictField()
    Autre = serializers.DictField()
    Blanc = serializers.DictField()

    def create(self, attrs, instance=None):
        if instance is not None:
            for k, v in attrs.iteritems():
                setattr(instance, k, v)
            return instance
        return Events(**attrs)
