# -*- coding: utf-8 -*-
"""
Created on Wed Jan 18 12:03:21 2017

@author: Kasa
"""

from django.http import HttpResponse
from django.conf.urls import url, include
from django.contrib import admin

from mongoengine import connect
connect('USAElection')


    

    
    