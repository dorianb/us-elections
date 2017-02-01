from mongoengine import Document
from mongoengine.fields import *


class Events(Document):
    Time = DateTimeField()
    State = StringField()
    Clinton = LongField()
    Trump = LongField()
    Autre = LongField()
    Castle = LongField()
    McMullin = LongField()
    Blanc = LongField()
    Stein = LongField()
    Johnson = LongField()
    Voters = LongField()
    Gvoters = LongField()
    Abr = StringField()
