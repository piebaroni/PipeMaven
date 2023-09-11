# Import the required libraries
from flask import Flask
from flask import request
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route("/exec", methods=["POST"])
def exec_pipeline():
    current_directory = os.path.dirname(os.path.abspath(__file__))
    input_file_path = os.path.join(current_directory, "../data/output/exec_pipeline.txt")
    text = request.json['pipeline']
    with open(input_file_path, 'w') as file:
         file.write(str(text))
    return  'Done', 201


@app.route("/evaluate", methods=["POST"])
def evaluate_pipeline():
    current_directory = os.path.dirname(os.path.abspath(__file__))
    input_file_path = os.path.join(current_directory, "../data/output/evaluate_pipeline.txt")
    text = request.json['pipeline']
    with open(input_file_path, 'w') as file:
         file.write(text)
    return 'Done', 201