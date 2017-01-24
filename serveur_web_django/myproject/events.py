from mongoengine import Document
from mongoengine.fields import *

class Events(Document):
	Time = StringField()
	State = StringField()
	Clinton = StringField()
	Trump = StringField()
	