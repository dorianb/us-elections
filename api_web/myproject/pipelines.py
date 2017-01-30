

class Pipeline():

    def getGvotersByState():
        return [
            {
                '$project': {
                    'Gvoters': 1,
                    '_id': '$Abr'
                }
            }
        ]

    def getResults(to):
        return [
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
                        '$max': ["$Trump", "$Clinton", "$Autre", "$Blanc",
                                 "$Castle", "$McMullin", "$Stein", "$Johnson"]
                    },
                    'total_votes': {
                        '$add': ["$Trump", "$Clinton", "$Autre", "$Blanc",
                                 "$Castle", "$McMullin", "$Stein", "$Johnson"]
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
                            'if': {'$eq': ['$max_votes', '$Clinton']},
                            'then': '$Gvoters', 'else': 0}
                    },
                    'Trump_GE': {
                        '$cond': {
                            'if': {'$eq': ['$max_votes', '$Trump']},
                            'then': '$Gvoters', 'else': 0}
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
                        '$add': [100, {'$multiply': ['$ratio', -100]}]
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

    def getResultsByState(to):
        return [
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
                        '$max': ["$Trump", "$Clinton", "$Autre", "$Blanc",
                                 "$Castle", "$McMullin", "$Stein", "$Johnson"]
                    },
                    'total_votes': {
                        '$add': ["$Trump", "$Clinton", "$Autre", "$Blanc",
                                 "$Castle", "$McMullin", "$Stein", "$Johnson"]
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
                             {'case': {'$eq': ['$max_votes', '$Trump']},
                              'then': "Trump"},
                             {'case': {'$eq': ['$max_votes', '$Clinton']},
                              'then': "Clinton"},
                             {'case': {'$eq': ['$max_votes', '$Autre']},
                              'then': "Autre"},
                             {'case': {'$eq': ['$max_votes', '$Blanc']},
                              'then': "Blanc"},
                             {'case': {'$eq': ['$max_votes', '$Castle']},
                              'then': "Castle"},
                             {'case': {'$eq': ['$max_votes', '$McMullin']},
                              'then': "McMullin"},
                             {'case': {'$eq': ['$max_votes', '$Stein']},
                              'then': "Stein"},
                             {'case': {'$eq': ['$max_votes', '$Johnson']},
                              'then': "Johnson"},
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
                        '$add': [100, {'$multiply': ['$ratio', -100]}]
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
