# from flask import request
# from app import create_app
# import os

# # Create an application instance
# app = create_app()

# @app.route("/exec", methods=["POST"])
# def exec_pipeline():
#     current_directory = os.path.dirname(os.path.abspath(__file__))
#     input_file_path = os.path.join(current_directory, "../data/output/exec_pipeline.txt")
#     text = request.json['pipeline']
#     with open(input_file_path, 'w') as file:
#          file.write(text)
#     return 'Done', 201


# @app.route("/evaluate", methods=["POST"])
# def evaluate_pipeline():
#     current_directory = os.path.dirname(os.path.abspath(__file__))
#     input_file_path = os.path.join(current_directory, "../data/output/evaluate_pipeline.txt")
#     text = request.json['pipeline']
#     with open(input_file_path, 'w') as file:
#          file.write(text)
#     return 'Done', 201

# if __name__ == "__main__":
# 	app.run(host='localhost', debug=True)
	
    