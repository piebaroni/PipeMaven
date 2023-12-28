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
      csvData: [],
      response: ''
    };
  }

  processData = (data) => {
    if (data !== this.state.currentFunction) {
      this.setState({ currentFunction: data });
    }
    console.log('Data received in App:', data);
  };

  handleFileChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      this.setState({ file: file}, () => {
        console.log(this.state.file);
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
    this.setState({ csvData: parsedData }, () => {
      console.log(this.state.csvData);
    });
  };

  handleUploadClick = async () => {
    const file = this.state.file;
    console.log(file)
    const responseData = await APIService.SetDataset(file)
      .catch((error) => console.log('error', error));
    if (responseData) {
      console.log("Response data:", responseData);
      this.setState({response: responseData})
    }
  };

  handleDownloadClick = async () => {
    try {
      const file = await APIService.GetDataset();
      const blob = new Blob([file.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'output.csv';
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  addLineBreak = (str) =>
    str.split('\n').map((subStr) => {
      return (
        <>
          {subStr}
          <br />
          <br />
        </>
      );
    });

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>PipeMaven</h1>
        </header>
        <MySelectBox sendDataToFunction={this.processData}></MySelectBox>
        <div className='showData'>
          <input type='file' id='input' accept='.csv' onChange={this.handleFileChange}></input>
          <label htmlFor='input' className='button-59'>Select Dataset</label>
          <button onClick={this.handleUploadClick} className='button-59'>Upload Dataset</button>
          <CSVDataTable data={this.state.csvData}></CSVDataTable>
          {this.state.response && (<div>
            <h3>Suggested preparators:</h3>
            <p>{this.addLineBreak(this.state.response)}</p></div>)}
          <button onClick={this.handleDownloadClick} className='button-59'>Download Output</button>
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
