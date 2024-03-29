import pandas as pd
import os
import time
import sys
import statistics
import re
import numpy as np
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

def one_hot(df, operation):
    matches = re.findall(r'\((.*?)\)', operation)
    for elem in matches:
        columns = re.split(r'\s*,\s*', elem)
        for i, col in enumerate(columns):
            dummies = pd.get_dummies(df[col])
            df_dummies = dummies.add_prefix(col + '_')
            df = df.join(df_dummies)
            df = df.drop([col], axis=1)
    return df

def identify_outliers(column):
    Q1 = column.quantile(0.25)
    Q3 = column.quantile(0.75)
    IQR = Q3 - Q1

    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR

    outliers = (column < lower_bound) | (column > upper_bound)
    return outliers

# Return dataset statistics
def get_statistics():
    current_directory = os.path.dirname(os.path.abspath(__file__))
    input_file_path = os.path.join(current_directory, "../data/input/input.csv")
    df = pd.read_csv(input_file_path, low_memory = False)
    rows = df.shape[0]
    columns = df.shape[1]
    result_dict = {}
    for column in df.columns:
        if pd.api.types.is_numeric_dtype(df[column]):
            # Mean
            mean_value = df[column].mean()
            # Median
            median_value = df[column].median()
            # Mode
            mode_value = statistics.mode(df[column]) if len(set(df[column])) < len(df[column]) else None
            # Standard Deviation
            std_dev_value = df[column].std()
            # Range
            range_value = df[column].max() - df[column].min()
            result_dict[column + ": "] = {
                "mean,": str(mean_value) + ", ",
                "median,": str(median_value) + ", ",
                "mode,": str(mode_value) + ", ",
                "std_dev,": str(std_dev_value) + ", ",
                "range": str(range_value)
                }
    result_df = pd.DataFrame(result_dict).T
    results = "Number of columns: " + str(columns) + "\nNumber of rows: " + str(rows) + "\nDataset Statistics: " + str(result_df)
    return results

# Return suggested preparators
def get_preparators():
    current_directory = os.path.dirname(os.path.abspath(__file__))
    input_file_path = os.path.join(current_directory, "../data/input/input.csv")
    df = pd.read_csv(input_file_path, low_memory = False)
    rows = df.shape[0]
    n_columns = df.shape[1]
    delete = []
    fill = []
    outliers = []
    types = []
    distinct = []
    for column in df.columns:
        types.append(column + ': ' + str(df[column].dtype))
        dist = df[column].nunique()
        if dist < 10:
            distinct.append(column + ': ' + dist)
        SDC = df[column].isnull().sum()/df.shape[0]
        if SDC != 0.0:
            formatted_SDC = "{:.2f}".format(SDC*100)
            if SDC >= 0.25:
                delete.append(column + ': ' + formatted_SDC + '%')
            else:
                fill.append(column + ': ' + formatted_SDC + '%')
        if pd.api.types.is_numeric_dtype(df[column]):
            out = identify_outliers(df[column]).sum()/df.shape[0]
            formatted_out = "{:.2f}".format(out*100)
            outliers.append(column + ': ' + formatted_out + '%')


    return "Delete column: " + str(delete) + "\nFill column: " + str(fill) + "\nOutliers: " + str(outliers) + "\n One Hot Encoding: " + str(distinct) + "\n Column types: " + str(types)

def scoring(df):
    delete_or_fill = []
    outliers = []
    # delete or fill
    for column in df.columns:
        SDC = df[column].isnull().sum()/df.shape[0]
        if SDC != 0.0:
            formatted_SDC = "{:.2f}".format(SDC*100)
            delete_or_fill.append(column + ': ' + formatted_SDC + '%')
    
    # filter outliers
    columns = df.select_dtypes(include = [int, float]).columns
    for column in columns:
        out = identify_outliers(df[column]).sum()/df.shape[0]
        formatted_out = "{:.2f}".format(out*100)
        outliers.append(column + ': ' + formatted_out + '%')

    return ('Delete or fill missing values: ' + str(delete_or_fill) + '\nFilter Outliers: ' + str(outliers))


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
        elif operation.startswith('one_hot'):
            if df_modified is None:
                df_modified = one_hot(df, operation)
            else:
                df_modified = one_hot(df_modified, operation)
        elif operation.strip().startswith('(') :
            new_operation = operation.strip()[1:-1]
            exec(new_operation)
        else:
            if df_modified is None:
                df_modified = eval('df.' + operation)
            else:
                df_modified = eval('df_modified.' + operation)
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