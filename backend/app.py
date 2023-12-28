# Import the required libraries
from flask import Flask
from flask import request, send_file, after_this_request, jsonify
import os
from flask_cors import CORS
from pipelines import exec_pipeline2, eval_pipeline, scoring
import sys
import pandas as pd

existsInput = False
existsOutput = False
app = Flask(__name__)
CORS(app)

#Execute pipeline
@app.route("/exec", methods=["POST"])
def exec_pipeline():
    if not existsInput:
         return 'No file uploaded', 400
    global existsOutput
    text = request.json['pipeline']
    exec_pipeline2(text)
    existsOutput = True
    return  'Done', 201

#Execute and evaluate pipeline
@app.route("/evaluate", methods=["POST"])
def evaluate_pipeline():
    if not existsInput:
        return 'No file uploaded', 400
    global existsOutput
    text = request.json['pipeline']
    label = request.json['label']
    response = eval_pipeline(text, label)
    existsOutput = True
    return jsonify(response), 201

#Upload dataset
@app.route("/dataset", methods=["POST"])
def setDataset():
     global existsInput
     current_directory = os.path.dirname(os.path.abspath(__file__))
     destination_path = os.path.join(current_directory, "../data/input/")
     os.makedirs(destination_path, exist_ok=True)
     if "file" not in request.files:
          return "No file part", 400
     file = request.files["file"]
     if file.filename == "":
          return "No selected file", 400

     if file:
          file_path = os.path.join(destination_path, 'input.csv')
          file.save(file_path)
          existsInput = True
          
          df = pd.read_csv(file_path)
          results = scoring(df)

          return results, 201


#Download Dataset
@app.route("/get_dataset", methods=["GET"])
def get_dataset():
     if not existsOutput:
          return 'No file to download', 400
          
     current_directory = os.path.dirname(os.path.abspath(__file__))
     dataset_file_path = os.path.join(current_directory, '../data/output/output.csv')
     
     @after_this_request
     def add_no_cache(response):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
        print(response, sys.stderr)
        return response
     
     try:
        return send_file(dataset_file_path, as_attachment=True, mimetype='text/csv')
     except Exception as e:
        return str(e)