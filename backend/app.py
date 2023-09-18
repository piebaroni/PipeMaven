# Import the required libraries
from flask import Flask
from flask import request
import os
from flask_cors import CORS
from pipelines import exec_pipeline2
import sys

fileExists = False
app = Flask(__name__)
CORS(app)

@app.route("/exec", methods=["POST"])
def exec_pipeline():
    if not fileExists:
         return 'No file uploaded', 400
    text = request.json['pipeline']
    print(text, sys.stderr)
    exec_pipeline2(text)
    return  'Done', 201


@app.route("/evaluate", methods=["POST"])
def evaluate_pipeline():
    #current_directory = os.path.dirname(os.path.abspath(__file__))
    #input_file_path = os.path.join(current_directory, "../data/output/evaluate_pipeline.txt")
    text = request.json['pipeline']
    #with open(input_file_path, 'w') as file:
    #     file.write(str(text))
    return 'Done', 201

@app.route("/dataset", methods=["POST"])
def setDataset():
     global fileExists
     current_directory = os.path.dirname(os.path.abspath(__file__))
     destination_path = os.path.join(current_directory, "../data/input/")
     os.makedirs(destination_path, exist_ok=True)

     # Check if a file is included in the request
     if "file" not in request.files:
          return "No file part", 400

     file = request.files["file"]

     # Check if the file has a valid name and extension (e.g., .csv)
     if file.filename == "":
          return "No selected file", 400

     if file:
          # Save the file to the destination folder
          file.save(os.path.join(destination_path, 'input.csv'))
          fileExists = True
          return "File uploaded successfully", 201

     return 'CSV file saved successfully', 201