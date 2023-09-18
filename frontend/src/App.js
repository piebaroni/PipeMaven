import './App.css';
import React, { Component } from 'react'
import MySelectBox from './components/Selectbox';
import Pipeline from './components/Pipeline';
import APIService from './components/APIService';
import CSVDataTable from './components/CSVDataTable';
import "./global.css"

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFunction: '',
      file: null,
      csvData: []
    };
  }

  processData = (data) => {
    if (data !== this.state.currentFunction) {
      //DA MODIFICARE?
      this.setState({ currentFunction: data });
    }
    console.log('Data received in App:', data);
  };

  handleFileChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      this.setState({ file: file, fileExists: true }, () => {
        console.log(this.state.file); // Log the updated state here
        console.log(this.state.fileExists); // Log the updated state here
        this.readFileContents();
      });
    }
  };

  readFileContents = () => {
    if (this.state.file !== null) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvText = e.target.result;
        this.parseCSV(csvText);
      };
      reader.readAsText(this.state.file);
    }
  };

  parseCSV = (csvText) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    const parsedData = [];
    const numRowsToParse = Math.min(lines.length, 11);

    for (let i = 1; i < numRowsToParse; i++) {
      const currentLine = lines[i].split(',');

      if (currentLine.length === headers.length) {
        const row = {};
        for (let j = 0; j < headers.length; j++) {
          row[headers[j].trim()] = currentLine[j].trim();
        }
        parsedData.push(row);
      }
    }
    if (numRowsToParse >= 11) {
      const newRow = {};
      for (let i = 0; i < headers.length; i++) {
        newRow[headers[i].trim()] = '...'; // You can set the content here
      }
      parsedData.push(newRow);
    }

    this.setState({ csvData: parsedData }, () => {
      console.log(this.state.csvData); // Log the updated state here
    });
  };

  handleUploadClick = () => {
    const file = this.state.file;
    console.log(file)
    console.log(this.state.fileExists)
    APIService.SetDataset(file)
      .catch((error) => console.log('error', error));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>DATA PREPARATION TOOL</h1>
        </header>
        <MySelectBox sendDataToFunction={this.processData}></MySelectBox>
        <div className='showData'>
          <input type='file' id='input' accept='.csv' onChange={this.handleFileChange}></input>
          <label htmlFor='input' className='button-59'>Select Dataset</label>
          <button onClick={this.handleUploadClick} className='button-59'>Upload Dataset</button>
          <CSVDataTable data={this.state.csvData}></CSVDataTable>
        </div>
        <Pipeline nextFunction={this.state.currentFunction} updateFunction={this.processData}></Pipeline>
        <footer>
          <p>Author: Pietro Baroni  <br></br>
            <a href="https://github.com/piebaroni/dataPreparationTool.git">GitHub Repository</a></p>
        </footer>

      </div>
    );
  }
}

export default App;
