import pickle
import sys, json

filename = 'src/app/kmeans/finalized_model.sav'
kmeans = pickle.load(open(filename, 'rb'))
customers = json.loads(sys.argv[1])

def classification (cus):
    print(kmeans.predict(cus))

classification(customers)