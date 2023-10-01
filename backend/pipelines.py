import pandas as pd
import os
import time
import sys
import re
from scipy.stats import entropy

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
def eval_pipeline(operations):
    current_directory = os.path.dirname(os.path.abspath(__file__))
    input_file_path = os.path.join(current_directory, "../data/input/input.csv")
    output_file_path = os.path.join(current_directory, "../data/output/output.csv")
    df_modified = None
    df = pd.read_csv(input_file_path)
    #Completeness
    completeness_start = df.count()/df.shape[0]
    #Average Shannon's Entropy
    i = 0
    total = 0
    for column in df.columns:
        counts = df[column].value_counts()
        prob = counts/len(df)
        entropy_value = entropy(prob, base = 2)
        total += entropy_value
        i += 1
    shannon_start = total/i

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
    
    #Average Shannon's Entropy
    i = 0
    total = 0
    for column in df_modified.columns:
        counts = df_modified[column].value_counts()
        prob = counts/len(df)
        entropy_value = entropy(prob, base = 2)
        total += entropy_value
        i += 1
    shannon_end = total/i

    #Changes
    if df.shape != df_modified.shape:
        row_diff = df_modified.shape[0] - df.shape[0]
        cols_diff = df_modified.shape[1] - df.shape[1]
        differences = row_diff * df.shape[1] + cols_diff * df.shape[0]
    else:
        differences = (df != df_modified).sum().sum()

    print('Pipeline Execution Time: ' + str(total_time) + 'ns,\nCompleteness Before Pipeline: ' 
          + str(completeness_start.mean(numeric_only=True) * 100) + '%,\nCompleteness After Pipeline: ' 
          + str(completeness_end.mean(numeric_only=True) * 100)
          + "%,\nAverage Shannon's Entropy Before Pipeline: " + str(shannon_start) 
          + ",\nAverage Shannon's Entropy After Pipeline: " + str(shannon_end)
          + ',\n# Cells Modified: ' + str(differences), sys.stderr)
    
    #Save Dataset
    df_modified.to_csv(output_file_path, index = False)