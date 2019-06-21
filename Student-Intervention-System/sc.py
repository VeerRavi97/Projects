import numpy as np
import pandas as pd
import tkinter as tk
from time import time
from tkinter import *
import pyexcel as pe
import shutil
import os
from tkinter import filedialog
import  csv
from sklearn.metrics import f1_score
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC


root= Tk()
root.title('Student Intervention System')
btn_text = StringVar()
lv = StringVar()
inn = StringVar()
btn_text.set(" Browse  for the dataset ")
lv.set(" Choose Classifier ")
def browsefunc():
    filename = filedialog.askopenfilename()
    btn_text.set(filename)
    global student_data
    student_data= pd.read_csv(filename)

    inn.set(" ")



def train_classifier(clf, X_train, y_train):
    ''' Fits a classifier to the training data. '''

    # Start the clock, train the classifier, then stop the clock
    start = time()
    clf.fit(X_train, y_train)
    end = time()

    # Print the results
    print( "Trained model in {:.4f} seconds".format(end - start))


def predict_labels(clf, features, target):
    ''' Makes predictions using a fit classifier based on F1 score. '''

    # Start the clock, make predictions, then stop the clock
    start = time()
    y_pred = clf.predict(features)
    end = time()

    # Print and return results
    print( "Made predictions in {:.4f} seconds.".format(end - start))
    return f1_score(target.values, y_pred, pos_label='yes')


def train_predict(clf, X_train, y_train, X_test, y_test):
    ''' Train and predict using a classifer based on F1 score. '''

    # Indicate the classifier and the training set size
    print ("")
    print ("Training a {} using a training set size of {}. . .".format(clf.__class__.__name__, len(X_train)))

    # Train the classifier
    train_classifier(clf, X_train, y_train)

    # Print the results of prediction for both training and testing
    print ("F1 score for training set: {:.4f}.".format(predict_labels(clf, X_train, y_train)))
    print ("F1 score for test set: {:.4f}.".format(predict_labels(clf, X_test, y_test)))

    # TODO: Import the three supervised learning models from sklearn


    # TODO: Initialize the three models
clf_A = GaussianNB()
clf_B = LogisticRegression(random_state=42)
clf_C = SVC(random_state=42)

'''
def train(clf):




    print(student_data.head())

    # TODO: Calculate number of students
    n_students = student_data.shape[0]

    # TODO: Calculate number of features
    n_features = student_data.shape[1] - 1

    feature_cols = list(student_data.columns[:-1])

    # Extract target column 'passed'
    # As seen above, since "passed" is last in the list, we're extracting using [-1]
    target_col = student_data.columns[-1]

    # Show the list of columns
    # print ("Feature columns:\n{}".format(feature_cols))
    # print ("\nTarget column: {}".format(target_col))

    # Separate the data into feature data and target data (X_all and y_all, respectively)
    X_all = student_data[feature_cols]
    y_all = student_data[target_col]

    # Show the feature information by printing the first five rows
    # print ("\nFeature values:")
    # print (X_all.head())

   def preprocess_features(X):
        Preprocesses the student data and converts non-numeric binary variables into
        binary (0/1) variables. Converts categorical variables into dummy variables. 

         Initialize new output DataFrame
      output = pd.DataFrame(index=X.index)

        # Investigate each feature column for the data
        for col, col_data in X.iteritems():

            # If data type is non-numeric, replace all yes/no values with 1/0
            if col_data.dtype == object:
                col_data = col_data.replace(['yes', 'no'], [1, 0])

            # If data type is categorical, convert to dummy variables
            if col_data.dtype == object:
                # Example: 'school' => 'school_GP' and 'school_MS'
                col_data = pd.get_dummies(col_data, prefix=col)

            # Collect the revised columns
            return output

    X_all = preprocess_features(X_all)

    y_pred = clf.predict(X_all)
    print(y_pred)
    print("Finish")
    os.remove(r't2.csv')'''

clf=clf_A
def classifier(lv):
    if (lv == "Support Vector Classifier"):
        clf = clf_C
    elif lv == "LogisticRegression":
        clf = clf_B
    else:
        clf = clf_A

def cla():

    # Read student data
    # TODO: Calculate number of students
    n_students = student_data.shape[0]

    # TODO: Calculate number of features
    n_features = student_data.shape[1] - 1

    # TODO: Calculate passing students
    # Data filtering using .loc[rows, columns]
    passed = student_data.loc[student_data.passed == 'yes', 'passed']
    n_passed = passed.shape[0]

    # TODO: Calculate failing students
    failed = student_data.loc[student_data.passed == 'no', 'passed']
    n_failed = failed.shape[0]

    # TODO: Calculate graduation rate
    total = float(n_passed + n_failed)
    grad_rate = float(n_passed * 100 / total)


    # Print the results
    ##print ("Total number of students: {}".format(n_students))
    # print ("Number of features: {}".format(n_features))
    # print ("Number of students who passed: {}".format(n_passed))
    # print ("Number of students who failed: {}".format(n_failed))
    # print ("Graduation rate of the class: {:.2f}%".format(grad_rate))

    # Extract feature columns
    # As seen above, we're getting all the columns except "passed" here but we're converting it to a list
    feature_cols = list(student_data.columns[:-1])

    # Extract target column 'passed'
    # As seen above, since "passed" is last in the list, we're extracting using [-1]
    target_col = student_data.columns[-1]

    # Show the list of columns
    # print ("Feature columns:\n{}".format(feature_cols))
    # print ("\nTarget column: {}".format(target_col))

    # Separate the data into feature data and target data (X_all and y_all, respectively)
    X_all = student_data[feature_cols]
    y_all = student_data[target_col]

    # Show the feature information by printing the first five rows
    # print ("\nFeature values:")
    # print (X_all.head())

    def preprocess_features(X):
        ''' Preprocesses the student data and converts non-numeric binary variables into
            binary (0/1) variables. Converts categorical variables into dummy variables. '''

        # Initialize new output DataFrame
        output = pd.DataFrame(index=X.index)

        # Investigate each feature column for the data
        for col, col_data in X.iteritems():

            # If data type is non-numeric, replace all yes/no values with 1/0
            if col_data.dtype == object:
                col_data = col_data.replace(['yes', 'no'], [1, 0])

            # If data type is categorical, convert to dummy variables
            if col_data.dtype == object:
                # Example: 'school' => 'school_GP' and 'school_MS'
                col_data = pd.get_dummies(col_data, prefix=col)

            # Collect the revised columns
            output = output.join(col_data)

        return output

    #X_all = preprocess_features(X_all)
    print("Processed feature columns ({} total features):\n{}".format(len(X_all.columns), list(X_all.columns)))
    X_train, X_test, y_train, y_test = train_test_split(X_all, y_all, stratify=y_all, test_size=100, random_state=42)

    # Show the results of the split
    print("Training set has {} samples.".format(X_train.shape[0]))
    print("Testing set has {} samples.".format(X_test.shape[0]))
    train_predict(clf, X_train, y_train, X_test, y_test)
    print("Successfully trained")
    #print(X_train)


def predictt():
    inp = inn.get()
    my_list = inp.split(",")
    print(inp)
    shutil.copyfile(r'tessta.csv', r't2.csv')
    #inp = inp[1:-1]
    with open(r't2.csv','a') as csvf:
        temp=csv.writer(csvf)
        temp.writerow(my_list)
    '''sheet = pe.load("tessta.csv")
    del sheet.row[1]
    sheet.save_as("tessta.csv")'''
    data = pd.read_csv("t2.csv")
    '''sheet = pe.load("tessta.csv")
    del sheet.row[2]
    sheet.save_as("tessta.csv")
    data = pd.read_csv("tessta.csv")'''
    print("jkhkjkjk")

    print(data.head())

    # TODO: Calculate number of students
    n_students = data.shape[0]

    # TODO: Calculate number of features
    n_features = data.shape[1] - 1

    feature_cols = list(data.columns[:])

    # Extract target column 'passed'
    # As seen above, since "passed" is last in the list, we're extracting using [-1]
    target_col = data.columns[-1]

    # Show the list of columns
    # print ("Feature columns:\n{}".format(feature_cols))
    # print ("\nTarget column: {}".format(target_col))

    # Separate the data into feature data and target data (X_all and y_all, respectively)
    X_all = data[feature_cols]
    y_all = data[target_col]

    # Show the feature information by printing the first five rows
    # print ("\nFeature values:")
    # print (X_all.head())

    def preprocess_features(X):
        ''' Preprocesses the student data and converts non-numeric binary variables into
            binary (0/1) variables. Converts categorical variables into dummy variables. '''

        # Initialize new output DataFrame
        output = pd.DataFrame(index=X.index)

        # Investigate each feature column for the data
        for col, col_data in X.iteritems():

            # If data type is non-numeric, replace all yes/no values with 1/0
            if col_data.dtype == object:
                col_data = col_data.replace(['yes', 'no'], [1, 0])

            # If data type is categorical, convert to dummy variables
            if col_data.dtype == object:
                # Example: 'school' => 'school_GP' and 'school_MS'
                col_data = pd.get_dummies(col_data, prefix=col)

            # Collect the revised columns
            output = output.join(col_data)

        return output

    #X_all = preprocess_features(X_all)
    print("X_all ")
    print("Processed feature columns ({} total features):\n{}".format(len(X_all.columns), list(X_all.columns)))
    y_pred = StringVar()
    res.delete(1.0, END)
    print(X_all)
    y_pred = clf.predict(X_all)
    print(y_pred)
    res.insert(0.0,y_pred)
    del y_pred
    print("Finish")
    os.remove(r't2.csv')




    #y_pred = clf_A.predict("GP,M,16,U,LE3,T,4,3,services,other,reputation,mother,1,2,0,no,yes,yes,yes,yes,yes,yes,no,5,4,2,1,2,5,10")
    #print(y_pred)
    print("done")

def rst():
    btn_text.set("Browse  for the dataset")
    lv.set("Choose Classifier")
    inn.set(" ")
    res.delete(1.0,END)


browsebutton = Button(root, textvariable=btn_text, command=browsefunc)
browsebutton.pack(side=TOP,fill=X)

choose = OptionMenu(root, lv, "GaussianNB", "LogisticRegression", "Support Vector Classifier",command=classifier)
choose.pack(fill=X)

tbutton = Button(root, text="Click to start training the model",command=cla)
tbutton.pack(side=TOP,fill=X)
label=Label(root,text="Enter the student data to test separated by commas")
text=Entry(root,textvariable=inn)
label.pack()
text.pack(fill=X)
start = Button(root, text="Start",command=predictt)

start.pack(side=TOP,fill=X)
res=Text(root,height="4")
res.pack(fill=X)
rest = Button(root, text="Reset",command=rst)
rest.pack()





#frame.pack(side=LEFT);
#rframe.pack(side=RIGHT);



root.mainloop()













