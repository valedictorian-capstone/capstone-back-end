import pickle
import sys

filename = 'src/app/kmeans/finalized_model.sav'
kmeans = pickle.load(open(filename, 'rb'))

def classification (cus):
    print(kmeans.predict(cus))

classification(sys.argv[1])