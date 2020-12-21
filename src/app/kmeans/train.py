from __future__ import print_function 
from sklearn.cluster import KMeans
import numpy as np
import pickle
import xlrd

loc = ("./Customers_dataset_2.xlsx")

wb = xlrd.open_workbook(loc)
sheet = wb.sheet_by_index(0)
sheet.cell_value(0, 0)
data_set = list()
for i in range(1, sheet.nrows):
    X = sheet.cell_value(i, 1)
    Y = sheet.cell_value(i, 2)
    Z = sheet.cell_value(i, 3)
    item = [X, Y, Z]
    data_set.append(item)

kmeans = KMeans(n_clusters=3).fit(data_set)

def printDetailKmeans():
    print('Centers found by scikit-learn:')
    print(kmeans.cluster_centers_)
    print('label:')
    print(kmeans.labels_)

def classification ( cus ):
    print('test:')
    print(kmeans.predict(cus))

def saveModel():
    filename = 'finalized_model.sav'
    pickle.dump(kmeans, open(filename, 'wb'))

printDetailKmeans()
saveModel()