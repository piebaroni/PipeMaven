import './App.css';
import React, {Component} from 'react'
import MySelectBox from './components/Selectbox';
import Pipeline from './components/Pipeline';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFunction: 'a'
    };
  }

  processData = (data) => {
    if (data !== this.state.currentFunction) {
      this.setState({ currentFunction: data });
    }
    console.log('Data received in App:', data);
  };


  render() {return (
    <div className="App">
      <header className="App-header">
        <h1>data-preparation-tool</h1>
      </header>
      <MySelectBox sendDataToFunction={this.processData}></MySelectBox>
      <Pipeline nextFunction={this.state.currentFunction}
          updateFunction={this.processData}></Pipeline>
    </div>
  );}
}

export default App;
