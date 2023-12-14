import json
import sys
import pickle

grades = json.loads(sys.argv[1])

two_D_grades = []
two_D_grades.append(grades)

third_model = pickle.load(open('D:\\stuff\\MlCEP\\ml\\firstmodel.pkl', 'rb'))

predict = third_model.predict(two_D_grades)
print(round(predict[0],2))
