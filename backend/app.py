# Import the required libraries
from flask import Flask
from flask import request, send_file, after_this_request
import os
from flask_cors import CORS
from pipelines import exec_pipeline2, eval_pipeline
import sys

fileExists = False
app = Flask(__name__)
CORS(app)

@app.route("/exec", methods=["POST"])
def exec_pipeline():
    if not fileExists:
         return 'No file uploaded', 400
    text = request.json['pipeline']
    exec_pipeline2(text)
    return  'Done', 201


@app.route("/evaluate", methods=["POST"])
def evaluate_pipeline():
    if not fileExists:
        return 'No file uploaded', 400
    text = request.json['pipeline']
    eval_pipeline(text)
    return 'Done', 201

@app.route("/dataset", methods=["POST"])
def setDataset():
     global fileExists
     current_directory = os.path.dirname(os.path.abspath(__file__))
     destination_path = os.path.join(current_directory, "../data/input/")
     os.makedirs(destination_path, exist_ok=True)
     if "file" not in request.files:
          return "No file part", 400
     file = request.files["file"]
     if file.filename == "":
          return "No selected file", 400

     if file:
          file.save(os.path.join(destination_path, 'input.csv'))
          fileExists = True
          return "File uploaded successfully", 201

     return 'CSV file saved successfully', 201

@app.route("/get_dataset", methods=["GET"])
def get_dataset():
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