import pandas as pd
import os
import time
import sys
import re
from scipy.stats import entropy
from evaluation import get_entropy, check_changes, check_accuracy

#Normalize column
def normalize(df, operation):
    matches = re.findall(r'\((.*?)\)', operation)
    for elem in matches:
        columns = re.split(r'\s*,\s*', elem)
        for column in columns:
            df[column] = (df[column] - df[column].mean()) / df[column].std()
    return df


#Execute pipeline
def exec_pipeline2(operations):
    current_directory = os.path.dirname(os.path.abspath(__file__))
    input_file_path = os.path.join(current_directory, "../data/input/input.csv")
    output_file_path = os.path.join(current_directory, "../data/output/output.csv")
    df = pd.read_csv(input_file_path)
    for operation in operations:
        df = eval('df.' + operation)
    df.to_csv(output_file_path)

#Execute and evaluate pipeline
def eval_pipeline(operations, label):
    current_directory = os.path.dirname(os.path.abspath(__file__))
    input_file_path = os.path.join(current_directory, "../data/input/input.csv")
    output_file_path = os.path.join(current_directory, "../data/output/output.csv")
    df_modified = None
    df = pd.read_csv(input_file_path)
    #Completeness
    completeness_start = df.count()/df.shape[0]

    #Accuracy
    accuracy_start = check_accuracy(df, label)

    #Average Shannon's Entropy
    shannon_start = get_entropy(df)

    #Execute Pipeline + Calculate time
    start_time = time.time_ns()
    for operation in operations:
        if operation.startswith('normalize'):
            if df_modified is None:
                df_modified = normalize(df, operation)
            else:
                df_modified = normalize(df_modified, operation)
        else:
            df_modified = eval('df.' + operation)
    end_time = time.time_ns()
    total_time = end_time - start_time

    #Completeness
    completeness_end = df_modified.count()/df_modified.shape[0]

    #Accuracy
    accuracy_end = check_accuracy(df_modified, label)
    
    #Average Shannon's Entropy
    shannon_end = get_entropy(df_modified)

    #Changes
    differences = check_changes(df, df_modified)

    response = (
    'Pipeline Execution Time: ' + str(total_time) + 'ns,\n' +
    'Completeness Before Pipeline: ' + str(completeness_start.mean(numeric_only=True) * 100) + '%,\n' +
    'Completeness After Pipeline: ' + str(completeness_end.mean(numeric_only=True) * 100) + '%,\n' +
    "Average Shannon's Entropy Before Pipeline: " + str(shannon_start) + ',\n' +
    "Average Shannon's Entropy After Pipeline: " + str(shannon_end) + ',\n' +
    'Accuracy on a ML Algorithm Before Pipeline: ' + str(accuracy_start) + ',\n' +
    'Accuracy on a ML Algorithm After Pipeline: ' + str(accuracy_end) + ',\n' +
    '# Cells Modified: ' + str(differences)
)
    
    #Save Dataset
    df_modified.to_csv(output_file_path, index = False)
    
    return response