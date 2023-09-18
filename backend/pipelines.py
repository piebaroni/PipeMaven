import pandas as pd
import os

# def exec_operation(operation, df4):
#    df4 = eval('df4.' + operation)
#    print(df4.head())
#    return df4

def exec_pipeline2(operations):
    current_directory = os.path.dirname(os.path.abspath(__file__))
    input_file_path = os.path.join(current_directory, "../data/input/input.csv")
    output_file_path = os.path.join(current_directory, "../data/output/output.csv")
    df = pd.read_csv(input_file_path)
    for operation in operations:
        df = eval('df.' + operation)
    df.to_csv(output_file_path)