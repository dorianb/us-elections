# coding: utf-8
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import math
from geopy.distance import vincenty



df_state_to_initial_letters=pd.read_csv('percent-elections-dem.csv',skiprows=4,header=0)
df_state_to_initial_letters['Dpercentagesince1856']=df_state_to_initial_letters['Dpercentagesince1856'].str.replace('%','')
df_states_Dpercentagesince1856=pd.DataFrame(df_state_to_initial_letters[['states','Dpercentagesince1856']])

df_states_Dpercentagesince1856.to_json(path_or_buf='df_states_Dpercentagesince1856')
print 'df_state_to_initial_letters'
raw_input()
############################
# noms des etats et abbreviations
df_state_to_initial_letters=pd.read_csv('state_to_initial_letters.csv')
#how to use it below
print list(df_state_to_initial_letters['Abbreviation'])
print len( list(df_state_to_initial_letters['Abbreviation']))
print "len( list(df_state_to_initial_letters['Abbreviation']))"

#########################################################################################################################
#premier objectif faire des features qui sont chaque state --> % and number of votes, number of electors
def create_features_2004(df_2004,select_state=[1 for a in range(51)]):

    def yearly_key_table_to_generic_key_name(key):
        file_keys=[u'Electoral Vote Bush (R)', u'Electoral Vote Kerry (D)', \
                   u'Popular Vote Bush (R)', u'Popular Vote Kerry (D)',\
                   u'Popular Vote All Others', u'Popular Vote Total Vote']
        wanted_generic_key=['Electoral Vote Rep', u'Electoral Vote Dem', \
                   u'Popular Vote Rep', u'Popular Vote Dem',\
                   u'Popular Vote All Others', u'Popular Vote Total Vote']
        
        return wanted_generic_key[[ind for ind in range(len(file_keys)) if key== file_keys[ind]][0]]

    feature_names=[]
    feature_value=[]


    for a in range(df_2004.shape[0]):
        listkeys=list(df_2004.iloc[a].keys())
        for ind_list_keys in range(len(listkeys)):
            if ind_list_keys>0 and len(str(df_2004.iloc[a]['STATE']))==2:
                key=listkeys[ind_list_keys]
                if select_state[a]:
                    if not isinstance( df_2004.iloc[a][key], int ) and not isinstance( df_2004.iloc[a][key], float ):
                        feature_value.append(df_2004.iloc[a][key].__str__().replace('*','')) # if not np.isnan(df_2004.iloc[a][key].__str__().replace('*','')) else 0 ) 
                        #print "print df_2004.iloc[a][key]"
                    else:
                        feature_value.append(df_2004.iloc[a][key] if not np.isnan(df_2004.iloc[a][key]) else 0 )
                else:
                    feature_value.append(0)
                feature_names.append( str(df_2004.iloc[a]['STATE'])+ '--'+str(yearly_key_table_to_generic_key_name(key)))
    y=-1 # REPUBLICAN wins    
    return feature_names,feature_value,y
############################################################################### 2004 processing definition above to create the very basis of features
xl = pd.ExcelFile("2004pres.xls")
df_2004 = xl.parse("Table 2. Pres Elec & Pop Vote",skiprows=2,header=0)
#select_states_at_random=np.random.randint(2,size=51)
select_states_at_random=np.random.randint(1,2,size=51)
feature_names,feature_value,y=create_features_2004(df_2004,select_state=select_states_at_random)

dict_feat={}
# print len(feature_names)
# print "len(feature_names)"

for a in range(len(feature_names)):
    dict_feat[feature_names[a]]=[feature_value[a]]
# print dict_feat
# print "dict_feat"
df_X_features=pd.DataFrame.from_dict(dict_feat, orient='columns')
y_list=[y]
# print "pd.DataFrame.from_dict(dict_feat)"

###########################################################################
#we add a new row below


def add_new_row_2004_to_X_and_y(df_X_features,y_list, select_states_at_random,df_2004):

    feature_names,feature_value,y=create_features_2004(df_2004,select_state=select_states_at_random)

    ########### transient below
    transient_dict_feat={}
    new_list_columns=feature_names
    ancient_list_columns=list(df_X_features.columns)
    non_matching_col_el=[new_list_columns[ind_c] for ind_c in range(len(new_list_columns)) if new_list_columns[ind_c]!=ancient_list_columns[ind_c]]
    for a in range(len(feature_names)):
        transient_dict_feat[feature_names[a]]=[feature_value[a]]
    transient_df_X_features=pd.DataFrame.from_dict(transient_dict_feat, orient='columns')
    y_list.append(y)
    df_X_features=df_X_features.append(transient_df_X_features)
    return df_X_features,y_list


select_states_at_random=np.random.randint(2,size=51)
select_states_at_random=np.random.randint(1,2,size=51)
df_X_features,y_list=add_new_row_2004_to_X_and_y(df_X_features,y_list, select_states_at_random,df_2004)
number_of_line_for_each_year=50
for a in range(number_of_line_for_each_year-1):
    print 'a='+a.__str__()
    np.random.seed(seed=a+2004)
    select_states_at_random=np.random.randint(2,size=51)
    df_X_features,y_list=add_new_row_2004_to_X_and_y(df_X_features,y_list, select_states_at_random,df_2004)


######################################################################################################################" # end of 2004 above
######################################################################################################################" # start of 2012 below



def create_features_2012(df_2012,select_state=[1 for a in range(51)]):
    df_2012['STATE'] = df_2012.index
    def yearly_key_table_to_generic_key_name(key):
        # on mach les clés du tableau du fichier trouvé avec les clefs générique qu'on veut pour lapprentissage global
        file_keys=[(u'ELECTORAL VOTE', u'Obama (D)'), (u'ELECTORAL VOTE', u'Romney (R)'), (u'POPULAR VOTE', u'Obama (D)'),\
                   (u'POPULAR VOTE', u'Romney (R)'), (u'POPULAR VOTE', u'All Others'), (u'POPULAR VOTE', u'Total Vote')]

        wanted_generic_key=[ u'Electoral Vote Dem',u'Electoral Vote Rep', \
                    u'Popular Vote Dem', u'Popular Vote Rep',\
                   u'Popular Vote All Others', u'Popular Vote Total Vote']
        
        if len([ind for ind in range(len(file_keys)) if key== file_keys[ind]])<1:
            print key
            print "key"
            print 'in 2012'
            print "there is a pb"
            raw_input()
        return wanted_generic_key[[ind for ind in range(len(file_keys)) if key== file_keys[ind]][0]]

    feature_names=[]
    feature_value=[]
    for a in range(df_2012.shape[0]):
        listkeys=list(df_2012.iloc[a].keys())
        for ind_list_keys in range(len(listkeys)):
            if  len(str(df_2012.iloc[a]['STATE'].name))==2:
                
                key=listkeys[ind_list_keys]
                if  key!=('STATE',''):
                    if select_state[a]: 

                        if not isinstance( df_2012.iloc[a][key], int ) and not isinstance( df_2012.iloc[a][key], float ):

                            feature_value.append(df_2012.iloc[a][key].__str__().replace('*','')) # if not np.isnan(df_2012.iloc[a][key].__str__().replace('*','')) else 0 ) 

                        else:
                            feature_value.append(df_2012.iloc[a][key] if not np.isnan(df_2012.iloc[a][key]) else 0 )
                    else:
                        feature_value.append(0)
                    feature_names.append( str(df_2012.iloc[a]['STATE'].name)+ '--'+str(yearly_key_table_to_generic_key_name(key)))
    y=1 # DEMOCRATS wins    
    return feature_names,feature_value,y
#############################################################################################################

xl = pd.ExcelFile("2012pres.xls")
df_2012 = xl.parse("Table 2. Electoral &  Pop Vote",skiprows=3,header=[0,1],index_col=None)

select_states_at_random=np.random.randint(2,size=51)
feature_names,feature_value,y=create_features_2012(df_2012)

######################################################################################################################" # end of 2012 above

###########################################################################
#we add a new row below


def add_new_row_2012_to_X_and_y(df_X_features,y_list, select_states_at_random,df_2012):

    feature_names,feature_value,y=create_features_2012(df_2012,select_state=select_states_at_random)

    ########### transient below
    transient_dict_feat={}
    new_list_columns=feature_names
    ancient_list_columns=list(df_X_features.columns)
    non_matching_col_el=[new_list_columns[ind_c] for ind_c in range(len(new_list_columns)) if new_list_columns[ind_c]!=ancient_list_columns[ind_c]]
    for a in range(len(feature_names)):
        transient_dict_feat[feature_names[a]]=[feature_value[a]]
    transient_df_X_features=pd.DataFrame.from_dict(transient_dict_feat, orient='columns')
    y_list.append(y)
    df_X_features=df_X_features.append(transient_df_X_features)
    return df_X_features,y_list


select_states_at_random=np.random.randint(2,size=51)
select_states_at_random=np.random.randint(1,2,size=51)
df_X_features,y_list=add_new_row_2012_to_X_and_y(df_X_features,y_list, select_states_at_random,df_2012)

for a in range(50):
    print 'a='+a.__str__()
    np.random.seed(seed=a)
    select_states_at_random=np.random.randint(1,2,size=51)
    df_X_features,y_list=add_new_row_2012_to_X_and_y(df_X_features,y_list, select_states_at_random,df_2012)
    

print df_X_features.size
print df_X_features.shape
print y_list
print len(y_list)
print 'df_X_features'
raw_input()

######################################################################################################################" # end of 2012 above



######################################################################################################################" # start of 2008 below



xl = pd.ExcelFile("2008pres.xls")
# print xl.sheet_names
# print "xl.sheet_names"
df_2008 = xl.parse("2008 PRES GENERAL RESULTS",skiprows=0,header=[0])
# #print df.head()['Popular Vote Total Vote']
# print df_2008.head(10)

# print pd.read_html('Federal Elections 96_ 1996 Electoral and Popular Vote Summary.html')
# print pd.read_html('Federal Elections 96_ 1996 Electoral and Popular Vote Summary.html')

xl = pd.ExcelFile("ptables2000.xls")
# # print xl.sheet_names
# # print "xl.sheet_names"
df_2000 = xl.parse("Sheet2",skiprows=2,header=[0])
# print df_2000.head()
# # print df_2008.head(10)



raw_input()

from bs4 import BeautifulSoup
print BeautifulSoup(open('Federal Elections 96_ 1996 Electoral and Popular Vote Summary.html','r').read())
print "BeautifulSoup(open('Federal Elections 96_ 1996 Electoral and Popular Vote Summary.html','r').read())"
raw_input()
table = BeautifulSoup(open('Federal Elections 96_ 1996 Electoral and Popular Vote Summary.html','r').read()).find('table')
df = pd.read_html(table) 
print df


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
winners=[]


trump_elect_feat_per_state=[]
clinton_elect_feat_per_state=[]


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
            # print pd.read_csv(filepath_or_buffer=f)
            # print "pd.read_csv(filepath_or_buffer=f)"
            # print type(pd.read_csv(filepath_or_buffer=f))
            pd_obj=pd.read_csv(filepath_or_buffer=f,header=0)
            # print pd_obj
            # print "pd_obj"
            # raw_input()
            winners.append(str(pd_obj.sort_values(by=['0'], ascending=[False]).iloc[0]['candidate']))
            print pd_obj[pd_obj['candidate']=='Clinton']['0']
            print 'int'
            print int(pd_obj[pd_obj['candidate']=='Clinton']['0'])
            print 'int'
            print "int(pd_obj[pd_obj['candidate']=='Clinton']['0'])"
            clinton_elect_feat_per_state.append(int(pd_obj[pd_obj['candidate']=='Clinton']['0']))
            trump_elect_feat_per_state.append(int(pd_obj[pd_obj['candidate']=='Trump']['0']))
            


            print "pd_obj[pd_obj['candidate']=='Clinton']"
            print pd_obj[pd_obj['candidate']=='Trump']['0']
            print "pd_obj[pd_obj['candidate']=='Trump']"
            
            print "pd_obj"
            raw_input()
            # print "type pd.read_csv(filepath_or_buffer=f)"
            # print "bidule"
            
            # print pd.DataFrame(pd.read_csv(filepath_or_buffer=f,skiprows=0,names=['candidates',0]))
            # raw_input()
            # state_df_res=pd.DataFrame(pd.read_csv(filepath_or_buffer=f,skiprows=1,names=['candidates','ballots_nb'],header=None))
            # print state_df_res
            
            # print list(state_df_res.columns.values)
            # print "list(state_df_res.columns.values)"
            # #print pd.DataFrame(pd.read_csv(filepath_or_buffer=f)).sort(columns=0)
            #raw_input()
        #dict_struct_per_state[state_un]=pd.DataFrame(pd.read_csv(filepath_or_buffer=f))
        new_states.append(state_un)
        



        
        #dict_struct_per_state[state_un]=1
        # print dict_struct_per_state
        # print "dict_struct_per_state"
        # print '******************** \n'
        # raw_input()


        
# dict_votant_nb_suf_states={'votants':votants,'nombre_de_suffrages_exprimes':nombre_de_suffrages_exprimes,'states':states}

# df_votant_nb_suf_states=pd.DataFrame.from_dict(dict_votant_nb_suf_states)
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
state_electors=[]
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
df_votant_nb_suf_states['winners']=pd.Series(winners)
df_votant_nb_suf_states['states_ini']=pd.Series(new_states)

df_votant_nb_suf_states['clinton_elect_feat_per_state']=pd.Series(clinton_elect_feat_per_state)
df_votant_nb_suf_states['trump_elect_feat_per_state']=pd.Series(trump_elect_feat_per_state)

# clinton_elect_feat_per_state.append(int(pd_obj[pd_obj['candidate']=='Clinton']['0']))
#             trump_elect_feat_per_state.append(int(pd_obj[pd_obj['candidate']=='Trump']['0']))
            

print 'we compute first the nb of electors won by each candidate'
    
print "[el.split('\t+') for el in strings_electors]"
# print df_votant_nb_suf_states
# print "df_votant_nb_suf_states"

print_all( df_votant_nb_suf_states[['true_us_state_names','state_electors','winners','states_ini']].sort(columns=['true_us_state_names']))
print "df_votant_nb_suf_states[['true_us_state_names','state_electors','winners','states_ini']]"
print df_votant_nb_suf_states.shape[0]
clinton_electors_nb=0
trump_electors_nb=0
for a in range(df_votant_nb_suf_states.shape[0]):
    # print df_votant_nb_suf_states[['winners']].iloc[a]
    # print '\n str below\n '
    # print str(df_votant_nb_suf_states[['winners']].iloc[a][0])
    # print '\n str above\n '
    # print "df_votant_nb_suf_states[['winners']].iloc[a]"
    # raw_input()
    # print str(df_votant_nb_suf_states[['true_us_state_names']].iloc[a][0])
    # print "str(df_votant_nb_suf_states[['true_us_state_names']].iloc[a][0])"
    if str(df_votant_nb_suf_states[['true_us_state_names']].iloc[a][0])=='Maine':
        clinton_electors_nb-=1
        trump_electors_nb+=1
        #    raw_input()
    if str(df_votant_nb_suf_states[['winners']].iloc[a][0])=='Clinton':
        clinton_electors_nb+= int(df_votant_nb_suf_states[['state_electors']].iloc[a][0])
        #df_votant_nb_suf_states[['state_electors']].iloc[a]
    else:
        #df_votant_nb_suf_states[['winners']].iloc[a]=='Clinton':
        trump_electors_nb+=int(df_votant_nb_suf_states[['state_electors']].iloc[a][0])
print clinton_electors_nb
print "clinton_electors_nb"
print trump_electors_nb
print "trump_electors_nb"

