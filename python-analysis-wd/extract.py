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




#"http://www2.census.gov/programs-surveys/demo/tables/voting/Alabama.xlsx"
dict_cand_reg={}
#for file_name in file_names:
for a_ind in range(len(file_names)):
    if a_ind<3000:
        #    if a_ind<3:
        file_name=file_names[a_ind]

        print file_name
        print "file_name \n"
        reg_df=pd.read_table(file_name, sep=';',skiprows=0,index_col=False,names=['timestamps','state','candidate'],header=None)
        # print reg_df

        # print "reg_df"
        # print reg_df.count()
        shape_up=reg_df.shape
        #nombre_de_suffrages_exprimes.append(shape_up[0])
        votants.append(shape_up[0])

        # print "reg_df.shape"
        #    reg_df.groupby()

        #print reg_df[['candidate']].groupby(['candidate']).count()
        grouped=reg_df[['candidate']].groupby(['candidate'])
        print "  grouped.size() below"
        print grouped.size()
        print "grouped.size()"
        dataframe_gr_size=pd.DataFrame(grouped.size())
        dataframe_gr_size.to_csv(path_or_buf='useful_infos.csv')

        # if a_ind==0:
        #     with open('useful_infos.csv', 'w') as f:
        #         dataframe_gr_size.to_csv(f)
        #         #pd.concat([df1, df2], axis=1)].to_csv(f)
        # else:
        #     with open('useful_infos.csv', 'a') as f:
        #         #pd.concat([df3, df4], axis=1)].to_csv(f, header=False)
        #         dataframe_gr_size.to_csv(f, mode='a', header=False)
        # print grouped.size()['Clinton']
        # print "grouped.size()['Clinton']"


        # print 'Blanc' in grouped.size().index
        # print "'Blanc' in grouped.size().index"
        if 'Blanc' in grouped.size().index:
            #print "\n ****** il faut decompter les blanc des votes exprimés"
            #print shape_up[0]-grouped.size()['Blanc']
            nombre_de_suffrages_exprimes.append(shape_up[0]-grouped.size()['Blanc'])

        else:
            nombre_de_suffrages_exprimes.append(shape_up[0])
            #        print shape_up[0]

            #raw_input()
        # print 'Clinton' in grouped.size().index
        # print "'Blanc' in grouped.size().index"


        # raw_input()
        # for name, group in grouped:
        #     print(name)
        #print(group)
        #print np.count(group)
        # raw_input()
        # print "df[['candidate']].groupby(['candidate']).agg(['count'])"


        # print "reg_df.groupby(['candidate'], as_index=False).count()"
        np_unique_cand=np.unique(reg_df[['candidate']])
        np_unique_tme=np.unique(reg_df[['timestamps']])
        # print np_unique_tme
        # print "np_unique_tme"
        if len(np_unique_tme)>1:
            print 'len(np_unique_tme)>1 ---> multi timing!!!'
            print 'there is  big pb!'
            raw_input()
        #raw_input()


        # print np_unique_cand
        # print "np_unique_cand"
        # raw_input()
        np_unique_state=np.unique(reg_df[['state']])
        if len(np_unique_state)>1:
            print 'len(np_unique_state)>1 ---> multi state!!  !!!'
            print 'there is  big pb!'
            raw_input()


        dict_cand_reg[np_unique_state[0]]=grouped.size()
        states.append(np_unique_state[0])


        # if a_ind==0:
        with open(np_unique_state[0]+'_summarize.csv', 'w') as f:
            dataframe_gr_size.to_csv(f)
        #         #pd.concat([df1, df2], axis=1)].to_csv(f)
   
        # print np_unique_state
        # print "np_unique_state"
        # raw_input()
        # print "np.unique(reg_df[['candidate']]) \n"
        # print np_unique_cand
        # print "np_unique_cand \n"
        # print file_name
        # print "file_name\n"
        # print ancient==np_unique_cand
        # print "ancient==np_unique_cand\n"
        # raw_input()
        # ancient=np_unique_cand
        # print ancient==ancient
        # print "ancient==ancient"
        # raw_input()
        #np.unique(reg_df[['candidate']])
        print '******************** \n'
dict_votant_nb_suf_states={'votants':votants,'nombre_de_suffrages_exprimes':nombre_de_suffrages_exprimes,'states':states}

df_votant_nb_suf_states=pd.DataFrame.from_dict(dict_votant_nb_suf_states)
df_votant_nb_suf_states.to_csv('df_votant_nb_suf_states.csv')

print len(votants)
print "len(votants)"

print len(nombre_de_suffrages_exprimes)
print "len(nombre_de_suffrages_exprimes)"

print len(states)
print "len(states)"

#dict_votant_nb_suf_states[


    
print len(file_names)
print "file_names"
raw_input()
min_df=pd.read_table('2016-11-08-20-00_Minnesota.txt', sep=';')

print min_df
print "min_df"
raw_input()


