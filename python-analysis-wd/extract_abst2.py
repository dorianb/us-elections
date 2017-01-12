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
            # print pd.DataFrame(pd.read_csv(filepath_or_buffer=f,skiprows=0,names=['candidates',0]))
            # raw_input()
            # state_df_res=pd.DataFrame(pd.read_csv(filepath_or_buffer=f,skiprows=1,names=['candidates','ballots_nb'],header=None))
            # print state_df_res
            
            # print list(state_df_res.columns.values)
            # print "list(state_df_res.columns.values)"
            # #print pd.DataFrame(pd.read_csv(filepath_or_buffer=f)).sort(columns=0)
            raw_input()
        #dict_struct_per_state[state_un]=pd.DataFrame(pd.read_csv(filepath_or_buffer=f))
        new_states.append(state_un)
        



        
        #dict_struct_per_state[state_un]=1
        # print dict_struct_per_state
        # print "dict_struct_per_state"
        print '******************** \n'
        raw_input()


        
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

print '%%%%%%%%%%%%%%%%%%%%%%%%%%%% \n pd.read_excel(io,header=1)'
io='2016 November General Election.xlsx'
#print pd.read_excel(io,header=1)
print "pd.read_excel(io)"
df_abst=pd.DataFrame(pd.read_excel(io,header=1))
#http://www.electproject.org/2016g

df_abst['states'] = df_abst.index
df_abst=df_abst.reset_index(drop=True)
shape_abst=df_abst.shape

# print df_abst[['states']]
# print list(df_abst['states'])
# print "df_abst[['states']]"
list_states_abst=list(df_abst['states'])
# raw_input()
import Levenshtein
non_abstentioners=[]
# print df_abst
# print "df_abst"
# raw_input()
for new_state in new_states:


    lev_rat=[Levenshtein.ratio(str(new_state),str(el)) for el in list_states_abst]
    #    print np.min([Levenshtein.ratio(file_xlsx_,new_states[a]) for a in range(len(new_states))])
    minmin=np.min(lev_rat)
    maxax=np.max(lev_rat)
    
    matching_names=[list_states_abst[a] for a in range(len(list_states_abst)) if lev_rat[a] ==maxax]
    
    matching_name=matching_names[0]

    print new_state
    if new_state=='Caroline_du_Sud':
        matching_name=matching_names[1]
        # print matching_name
        # raw_input()
        # if new_state=='Dakota_du_Nord':
        #     matching_name=matching_names[1]
    elif new_state=='Caroline_du_Nord':
        #print ' CAROLINE'
        matching_names=[list_states_abst[a] for a in range(len(list_states_abst)) if lev_rat[a] >maxax-0.1]
        #[xlsx_file_names_[a] for a in range(len(xlsx_file_names_)) if lev_rat[a] >maxax-0.1]
        #print matching_names
        # print "matching_names"
        
        matching_name=matching_names[3]
        #print matching_name
        #raw_input()
    elif new_state=='Dakota_du_Sud':
        matching_name=matching_names[1]
        #print matching_name
        #raw_input()
    elif new_state=='Dakota_du_Nord':
        matching_name=matching_names[0]
        #print matching_name
        #raw_input()
    elif new_state=='Virginie_Occidentale':
        matching_names=[list_states_abst[a] for a in range(len(list_states_abst)) if lev_rat[a] >maxax-0.1]
        matching_name=matching_names[1]
        #print matching_name
        #matching_name=matching_names[0]
        #print matching_name
        #raw_input()
        
    # else:
    # print 'matching_names\n *********** \n below '
    # print matching_name
    # print df_abst[['states']].iloc[0]
    # print str(df_abst[['states']].iloc[0])
    # print "df_abst['states'].iloc[0] \n\n"
    # print df_abst['states'].iloc[0]
    
    # print "df_abst[['states']].iloc[0]"
    # raw_input()
    #print [a for a in range(len(list_states_abst)) ]
    list_ind_2016_gen_el=[a for a in range(len(list_states_abst)) if df_abst['states'].iloc[a]==matching_name ]
    # print "[a for a in range(len(list_states_abst)) if list_states_abst[['states']].iloc[a]==matching_name ]"

    vep_tot=df_abst['VEP Total Ballots Counted'].iloc[list_ind_2016_gen_el[0]]
    vep_high=df_abst['VEP Highest Office'].iloc[list_ind_2016_gen_el[0]]
    # print np.isnan(vep_tot)
    # print "np.isnan(vep_tot)"
    if np.isnan(vep_tot):
        non_abstentioners.append(vep_high)
    else:
        non_abstentioners.append(vep_tot)
        #if vep_tot
    # print "df_abst['VEP Highest Office'].iloc[list_ind_2016_gen_el[0]]"
    
    #non_abstentioners.append(df_abst['states'].iloc[list_ind_2016_gen_el[0]])
    # raw_input()
    # if 0:
    #     print matching_name
    #     print new_state
    #     print "\n ----"
    # #matching name est le xlsx correspondant à new state
    
    # workbook = xlrd.open_workbook(matching_name+'.xlsx')
    # #print workbook
    # #print "workbook"
    # worksheet = workbook.sheet_by_index(0)

    # #cellule B3 ci dessous
    # #print worksheet.cell(2, 1).value
    # extracted_total_nb_people_able_to_vote.append(worksheet.cell(2, 1).value)
    #raw_input()
df_votant_nb_suf_states['VEP_non_abstentioners']=non_abstentioners
# print df_votant_nb_suf_states
# print "df_votant_nb_suf_states"
# #print "df_abst.shape"
# raw_input()
# for i in range(shape_abst[0]):
#     print df_abst.iloc[i]
#     print "df_abst.iloc[i]"
#     raw_input()


    
# print df_abst
# print "df_abst"

# #print df_abst[['VEP Total Ballots Counted']]
# print "df_abst"
# raw_input()
###############################################################################



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
matching_us_state_names=[]
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
    if new_state=='Virginie_Occidentale':
        # print '\n \n CAROLINE'
        matching_names=[xlsx_file_names_[a] for a in range(len(xlsx_file_names_)) if lev_rat[a] >maxax-0.1]
        #print matching_names
        # print "matching_names"
        
        matching_name=matching_names[0]
        #print matching_name
        #raw_input()
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
    matching_us_state_names.append(matching_name)
    #print matching_name
    #raw_input()
#print extracted_total_nb_people_able_to_vote
#print "extracted_total_nb_people_able_to_vote"

# df_votant_nb_suf_states=pd.DataFrame(pd.read_csv(filepath_or_buffer='df_votant_nb_suf_states.csv'))

df_votant_nb_suf_states['extracted_total_nb_people_able_to_vote'] = pd.Series(extracted_total_nb_people_able_to_vote) #np.random.randn(sLength), index=df1.index)
df_votant_nb_suf_states['matching_us_state_names']=pd.Series(matching_us_state_names)


df_votant_nb_suf_states['non_abstention_ratio'] = df_votant_nb_suf_states.apply(lambda row: row['votants']/row['extracted_total_nb_people_able_to_vote'],axis=1)
df_votant_nb_suf_states['non_abstention_ratio_no_blanc'] = df_votant_nb_suf_states.apply(lambda row: row['nombre_de_suffrages_exprimes']/row['extracted_total_nb_people_able_to_vote'],axis=1)
#'VEP_non_abstentioners'
# print df_votant_nb_suf_states[['non_abstention_ratio','states']]
# print df_votant_nb_suf_states[['non_abstention_ratio_no_blanc','states']]
# 'VEP_non_abstentioners'
# ['non_abstention_ratio','states']]

def print_all(x):
    
    pd.set_option('display.height', 1000)
    pd.set_option('display.max_rows', 500)
    pd.set_option('display.max_columns', 500)
    pd.set_option('display.width', 1000)
    print (x)
    pd.reset_option('display.height')
    pd.reset_option('display.max_rows')
    pd.reset_option('display.max_columns')
    pd.reset_option('display.width')
    return
#print df_votant_nb_suf_states[['non_abstention_ratio','non_abstention_ratio_no_blanc','VEP_non_abstentioners','states']]
print_all(df_votant_nb_suf_states[['non_abstention_ratio','non_abstention_ratio_no_blanc','VEP_non_abstentioners','states','matching_us_state_names']])
print "df_votant_nb_suf_states[['non_abstention_ratio','non_abstention_ratio_no_blanc','VEP_non_abstentioners','states']]"
raw_input()
                               
print '****** \n ******* \n resultats archi faux il faut utiliser 2016 November General Election.xlsx'
print "https://docs.google.com/spreadsheets/d/1VAcF0eJ06y_8T4o2gvIL4YcyQy8pxb1zYkgXF76Uu1s/edit#gid=2030096602"



print 'pour calculer correctement le nombre d"abstentionistes'
#raw_input()



col_electors=['State',	'Number of Electoral Votes']
strings_electors=[\
'Alabama	9',\
'Alaska	3',\
'Arizona	11',\
'Arkansas	6',\
'California	55',\
'Colorado	9',\
'Connecticut	7',\
'Delaware	3',\
'District of Columbia	3',\
'Florida	29',\
'Georgia	16',\
'Hawaii	4',\
'Idaho	4',\
'Illinois	20',\
'Indiana	11',\
'Iowa	6',\
'Kansas	6',\
'Kentucky	8',\
'Louisiana	8',\
'Maine	4',\
'Maryland	10',\
'Massachusetts	11',\
'Michigan	16',\
'Minnesota	10',\
'Mississippi	6',\
'Missouri	10',\
'Montana	3',\
'Nebraska	5',\
'Nevada	6',\
'New Hampshire	4',\
'New Jersey	14',\
'New Mexico	5',\
'New York	29',\
'North Carolina	15',\
'North Dakota	3',\
'Ohio	18',\
'Oklahoma	7',\
'Oregon	7',\
'Pennsylvania	20',\
'Rhode Island	4',\
'South Carolina	9',\
'South Dakota	3',\
'Tennessee	11',\
'Texas	38',\
'Utah	6',\
'Vermont	3',\
'Virginia	13',\
'Washington	12',\
'West Virginia	5',\
'Wisconsin	10',\
'Wyoming	3']

print [el.split('\t') for el in strings_electors]
states_electors=[el.split('\t')[0] for el in strings_electors]
nb_electors=[el.split('\t')[1] for el in strings_electors]
print states_electors
print nb_electors

new_states_us_names=list(df_votant_nb_suf_states['matching_us_state_names'])
# print new_states_us_names
# print "new_states_us_names"
# print df_votant_nb_suf_states[['matching_us_state_names']]
# print "df_votant_nb_suf_states[['matching_us_state_names']]"
# print list(df_votant_nb_suf_states['matching_us_state_names'])
# print "df_votant_nb_suf_states[['matching_us_state_names']]"

# raw_input()
true_us_state_names=[]
for new_state in new_states_us_names:
    #file_xlsx_=file_xlsx.replace('.xlsx','')

    lev_rat=[Levenshtein.ratio(new_state,el) for el in states_electors]
    #    print np.min([Levenshtein.ratio(file_xlsx_,new_states[a]) for a in range(len(new_states))])
    minmin=np.min(lev_rat)
    maxax=np.max(lev_rat)
    
    matching_names=[states_electors[a] for a in range(len(states_electors)) if lev_rat[a] ==maxax]
    matching_nbs=[nb_electors[a] for a in range(len(states_electors)) if lev_rat[a] ==maxax]
    # print matching_names
    matching_name=matching_names[0]
    true_us_state_names.append(matching_name)
    state_electors.append(matching_nbs[0])
    # print matching_name
    # print new_state
    # print '(big) ELECTORs'
    # raw_input()
    # if new_state=='Dakota_du_Nord':
    #     matching_name=matching_names[1]
    # if new_state=='Caroline_du_Nord':
    #     # print '\n \n CAROLINE'
    #     matching_names=[xlsx_file_names_[a] for a in range(len(xlsx_file_names_)) if lev_rat[a] >maxax-0.1]
    #     # print matching_names
    #     # print "matching_names"
        
    #     matching_name=matching_names[1]
    
    #     # raw_input()
    # if 0:
    #     print matching_name
    #     print new_state
    #     print "\n ----"
    # #matching name est le xlsx correspondant à new state
    
    # workbook = xlrd.open_workbook(matching_name+'.xlsx')
    # #print workbook
    # #print "workbook"
    # worksheet = workbook.sheet_by_index(0)

    # #cellule B3 ci dessous
    # #print worksheet.cell(2, 1).value
    # extracted_total_nb_people_able_to_vote.append(worksheet.cell(2, 1).value)


df_votant_nb_suf_states['true_us_state_names']=pd.Series(true_us_state_names)
df_votant_nb_suf_states['state_electors']=pd.Series(state_electors)

print 'we compute first the nb of electors won by each candidate'
    
print "[el.split('\t+') for el in strings_electors]"




