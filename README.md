# PipeMaven

## Introduction
PipeMaven is a powerful tool for efficiently preparing and cleaning your data for analysis, modeling, or other data-related tasks without any coding.
It combines the flexibility of React for the front-end user interface with the robustness of Flask for the back-end data processing.

## Features
- User-friendly Interface: A responsive and intuitive web interface for users to interact with and upload their data.
- Data Upload: Easily upload your CSV dataset.
- Data Cleaning: Perform various data cleaning operations like removing duplicates, handling missing values, and more.
- Data Transformation: Apply data transformations like encoding categorical variables, scaling numerical features, and more.
- Data Export: Download the cleaned and transformed data.
- Pipeline Evaluation: Evaluate the data preparation pipeline with different metrics. 

## Getting Started
### Prerequisites
- Node.js and npm for the frontend development environment.
- Python and pip for the backend development environment.
- Git for version control.

### Installation
1.    Clone the repository:
      '''bash
      git clone https://github.com/piebaroni/PipeMaven.git
      cd PipeMaven
2.    Install frontend dependencies:
      '''bash
      cd frontend
      npm install
3.    Install backend dependencies:
      '''bash
      cd ../backend
      pip install -r requirements.txt
4.    Start the React development server:
      '''bash
      cd ../frontend
      npm start
5.    In a separate terminal, start the Flask backend:
      '''bash
      cd ../backend
      flask run 
6.    Open your browser and navigate to http://localhost:3000 to access PipeMaven. 
