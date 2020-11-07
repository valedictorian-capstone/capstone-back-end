from __future__ import print_function 
from sklearn.cluster import KMeans
import numpy as np
import pickle

means = [[50, 50, 100], [10, 90, 50], [10, 10, 10]]
cov = [[2, 0, 0], [0, 2, 0], [0, 0, 2]]
N = 100
TX = np.random.multivariate_normal(means[0], cov, N)
LN = np.random.multivariate_normal(means[1], cov, N)
MH = np.random.multivariate_normal(means[2], cov, N)
X = np.concatenate((TX, LN, MH), axis = 0)

kmeans = KMeans(n_clusters=3).fit(X)

def printDetailKmeans():
    print('Centers found by scikit-learn:')
    print(kmeans.cluster_centers_)
    print('label:')
    print(kmeans.labels_)

def classification ( cus ):
    print('test:')
    print(kmeans.predict(cus))

def saveModel():
    filename = 'src/app/kmeans/finalized_model.sav'
    pickle.dump(kmeans, open(filename, 'wb'))

printDetailKmeans()
saveModel()