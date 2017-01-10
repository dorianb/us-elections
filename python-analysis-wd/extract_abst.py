# coding: utf-8
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import math
from geopy.distance import vincenty


#extract each state


file_names=[\
'2016-11-08-20-00_Minnesota.txt',\
'2016-11-08-20-01_Alabama.txt',\
'2016-11-08-20-01_Montana.txt',\
'2016-11-08-20-01_Utah.txt',\
'2016-11-08-20-02_Caroline_du_Sud.txt',\
'2016-11-08-20-02_New_York.txt',\
'2016-11-08-20-03_Nouveau_Mexique.txt',\
'2016-11-08-20-04_Californie.txt',\
'2016-11-08-20-04_Colorado.txt',\
'2016-11-08-20-05_Connecticut.txt',\
'2016-11-08-20-08_District_de_Columbia.txt',\
'2016-11-08-20-08_Kentucky.txt',\
'2016-11-08-20-09_Caroline_du_Nord.txt',\
'2016-11-08-20-09_Vermont.txt',\
'2016-11-08-20-10_Dakota_du_Sud.txt',\
'2016-11-08-20-11_Alaska.txt',\
'2016-11-08-20-13_Arkansas.txt',\
'2016-11-08-20-13_Washington.txt',\
'2016-11-08-20-15_Hawai.txt',\
'2016-11-08-20-17_Wisconsin.txt',\
'2016-11-08-20-19_Georgie.txt',\
'2016-11-08-20-22_Ohio.txt',\
'2016-11-08-20-24_Missouri.txt',\
'2016-11-08-20-24_New_Hampshire.txt',\
'2016-11-08-20-24_Virginie.txt',\
'2016-11-08-20-27_Iowa.txt',\
'2016-11-08-20-28_Delaware.txt',\
'2016-11-08-20-29_Arizona.txt',\
'2016-11-08-20-31_Louisiane.txt',\
'2016-11-08-20-31_Massachusetts.txt',\
'2016-11-08-20-31_Texas.txt',\
'2016-11-08-20-34_Dakota_du_Nord.txt',\
'2016-11-08-20-35_Tennessee.txt',\
'2016-11-08-20-36_Wyoming.txt',\
'2016-11-08-20-37_Floride.txt',\
'2016-11-08-20-37_Illinois.txt',\
'2016-11-08-20-40_Nevada.txt',\
'2016-11-08-20-41_Idaho.txt',\
'2016-11-08-20-41_Pennsylvanie.txt',\
'2016-11-08-20-43_Virginie_Occidentale.txt',\
'2016-11-08-20-48_Maryland.txt',\
'2016-11-08-20-48_Mississippi.txt',\
'2016-11-08-20-48_Rhode_Island.txt',\
'2016-11-08-20-50_Michigan.txt',\
'2016-11-08-20-51_Oklahoma.txt',\
'2016-11-08-20-52_Nebraska.txt',\
'2016-11-08-20-56_New_Jersey.txt',\
'2016-11-08-20-57_Indiana.txt',\
'2016-11-08-20-57_Kansas.txt',\
'2016-11-08-20-58_Maine.txt',\
'2016-11-08-20-59_Oregon.txt']

ancient=[]
votants=[]
nombre_de_suffrages_exprimes=[]
states=[]
new_states=[]




#"http://www2.census.gov/programs-surveys/demo/tables/voting/Alabama.xlsx"
dict_cand_reg={}
#for file_name in file_names:
dict_struct_per_state={}
for a_ind in range(len(file_names)):
    
    if a_ind<3000:

        #    if a_ind<3:
        file_name=file_names[a_ind]
        # print file_name.split('_')
        # print "file_name.split('_')"
        # print file_name.split('_')[1].replace('.txt','')
        state_un=file_name.split('_',1)[1].replace('.txt','')
        # print type(state_un)
        
        # print "file_name.split('_')[1].replace('.txt','')"
        # print file_name
        # print "file_name \n"
        #state_un
        #with open(np_unique_state[0]+'_summarize.csv', 'rb') as f:
        with open(state_un+'_summarize.csv', 'rb') as f:
            #dataframe_gr_size.to_csv(f)
            print state_un
            print pd.read_csv(filepath_or_buffer=f)
            print "pd.read_csv(filepath_or_buffer=f)"
            #raw_input()
        #dict_struct_per_state[state_un]=pd.DataFrame(pd.read_csv(filepath_or_buffer=f))
        new_states.append(state_un)
        



        
        #dict_struct_per_state[state_un]=1
        # print dict_struct_per_state
        # print "dict_struct_per_state"
        print '******************** \n'
        #raw_input()


        
dict_votant_nb_suf_states={'votants':votants,'nombre_de_suffrages_exprimes':nombre_de_suffrages_exprimes,'states':states}

df_votant_nb_suf_states=pd.DataFrame.from_dict(dict_votant_nb_suf_states)
#df_votant_nb_suf_states.to_csv('df_votant_nb_suf_states.csv')

df_votant_nb_suf_states=pd.DataFrame(pd.read_csv(filepath_or_buffer='df_votant_nb_suf_states.csv'))



print df_votant_nb_suf_states
print "pd.DataFrame(pd.read_csv(filepath_or_buffer='df_votant_nb_suf_states.csv'))"

print len(new_states)
print "len(new_states)"

#dict_votant_nb_suf_states[


    
print len(file_names)
print "file_names"




xlsx_file_names=[\
'PuertoRico.xlsx',\
'Wyoming.xlsx',\
'Wisconsin.xlsx',\
'WestVirginia.xlsx',\
'Washington.xlsx',\
'Virginia.xlsx',\
'Vermont.xlsx',\
'Utah.xlsx',\
'Texas.xlsx',\
'Tennessee.xlsx',\
'SouthDakota.xlsx',\
'SouthCarolina.xlsx',\
'RhodeIsland.xlsx',\
'Pennsylvania.xlsx',\
'Oregon.xlsx',\
'Oklahoma.xlsx',\
'Ohio.xlsx',\
'NorthDakota.xlsx',\
'NorthCarolina.xlsx',\
'NewYork.xlsx',\
'NewMexico.xlsx',\
'NewJersey.xlsx',\
'NewHampshire.xlsx',\
'Nevada.xlsx',\
'Nebraska.xlsx',\
'Montana.xlsx',\
'Missouri.xlsx',\
'Mississippi.xlsx',\
'Minnesota.xlsx',\
'Michigan.xlsx',\
'Massachusetts.xlsx',\
'Maryland.xlsx',\
'Maine.xlsx',\
'Louisiana.xlsx',\
'Kentucky.xlsx',\
'Kansas.xlsx',\
'Iowa.xlsx',\
'Indiana.xlsx',\
'Illinois.xlsx',\
'Idaho.xlsx',\
'Hawaii.xlsx',\
'Georgia.xlsx',\
'Florida.xlsx',\
'DistrictofColumbia.xlsx',\
'Delaware.xlsx',\
'Connecticut.xlsx',\
'Colorado.xlsx',\
'California.xlsx',\
'Arkansas.xlsx',\
'Arizona.xlsx',\
'Alaska.xlsx',\
'Alabama.xlsx']
print '**************** \n *********************'
import Levenshtein
# for file_xlsx in xlsx_file_names:
#     file_xlsx_=file_xlsx.replace('.xlsx','')
#     # print Levenshtein.ratio('hello world', 'hello')
#     # print Levenshtein.ratio(file_xlsx_,new_states[0])
#     lev_rat=[Levenshtein.ratio(file_xlsx_,new_states[a]) for a in range(len(new_states))]
#     #    print np.min([Levenshtein.ratio(file_xlsx_,new_states[a]) for a in range(len(new_states))])
#     minmin=np.min([Levenshtein.ratio(file_xlsx_,new_states[a]) for a in range(len(new_states))])
#     maxax=np.max([Levenshtein.ratio(file_xlsx_,new_states[a]) for a in range(len(new_states))])
#     minmin=np.min(lev_rat)
#     maxax=np.max(lev_rat)
    
    
#     print [new_states[a] for a in range(len(lev_rat)) if lev_rat[a] ==maxax]
#     print file_xlsx_
#     raw_input()
#     print "\n ----"
########################################
xlsx_file_names_=[el.replace('.xlsx','') for el in  xlsx_file_names]

import xlrd
extracted_total_nb_people_able_to_vote=[]
for new_state in new_states:
    #file_xlsx_=file_xlsx.replace('.xlsx','')

    lev_rat=[Levenshtein.ratio(new_state,el) for el in xlsx_file_names_]
    #    print np.min([Levenshtein.ratio(file_xlsx_,new_states[a]) for a in range(len(new_states))])
    minmin=np.min(lev_rat)
    maxax=np.max(lev_rat)
    
    matching_names=[xlsx_file_names_[a] for a in range(len(xlsx_file_names_)) if lev_rat[a] ==maxax]
    # print matching_names
    matching_name=matching_names[0]
    
    # print new_state
    if new_state=='Dakota_du_Nord':
        matching_name=matching_names[1]
    if new_state=='Caroline_du_Nord':
        # print '\n \n CAROLINE'
        matching_names=[xlsx_file_names_[a] for a in range(len(xlsx_file_names_)) if lev_rat[a] >maxax-0.1]
        # print matching_names
        # print "matching_names"
        
        matching_name=matching_names[1]
    
        # raw_input()
    if 0:
        print matching_name
        print new_state
        print "\n ----"
    #matching name est le xlsx correspondant à new state
    
    workbook = xlrd.open_workbook(matching_name+'.xlsx')
    #print workbook
    #print "workbook"
    worksheet = workbook.sheet_by_index(0)

    #cellule B3 ci dessous
    #print worksheet.cell(2, 1).value
    extracted_total_nb_people_able_to_vote.append(worksheet.cell(2, 1).value)
    
    #print matching_name
    #raw_input()
#print extracted_total_nb_people_able_to_vote
#print "extracted_total_nb_people_able_to_vote"

# df_votant_nb_suf_states=pd.DataFrame(pd.read_csv(filepath_or_buffer='df_votant_nb_suf_states.csv'))

df_votant_nb_suf_states['extracted_total_nb_people_able_to_vote'] = pd.Series(extracted_total_nb_people_able_to_vote) #np.random.randn(sLength), index=df1.index)



df_votant_nb_suf_states['abstention_ratio'] = df_votant_nb_suf_states.apply(lambda row: 1-row['votants']/row['extracted_total_nb_people_able_to_vote'],axis=1)
df_votant_nb_suf_states['abstention_ratio_no_blanc'] = df_votant_nb_suf_states.apply(lambda row: 1-row['nombre_de_suffrages_exprimes']/row['extracted_total_nb_people_able_to_vote'],axis=1)

print df_votant_nb_suf_states[['abstention_ratio','states']]
print df_votant_nb_suf_states[['abstention_ratio_no_blanc','states']]
print '****** \n ******* \n resultats archi faux il faut utiliser 2016 November General Election.xlsx'
print "https://docs.google.com/spreadsheets/d/1VAcF0eJ06y_8T4o2gvIL4YcyQy8pxb1zYkgXF76Uu1s/edit#gid=2030096602"


print 'pour calculer correctement le nombre d"abstentionistes'
#raw_input()


