import { Component } from 'react';
import infojson from './data/info.json'

class Function extends Component {

  constructor(props) {
    super(props);
    this.info = infojson
    this.name = this.props.name;
    this.state = {
      parameters: '',
    };
    this.addFunction = this.addFunction.bind(this);
    this.handleParameterChange = this.handleParameterChange.bind(this);
  }

  addFunction = (event) => {
    console.log('ADD TO PIPELINE')
    const operation = this.name + '(' + this.state.parameters + ')'
    this.props.onDataReceived(operation);
  };

  handleParameterChange = (event) => {
    this.setState({parameters: event.target.value})
  }

  render() {
    return (
      <div>
        <h3>{this.name}!</h3>
        <p>{this.info[this.name]}</p>
        <div>
          <input  type='text' value={this.state.parameters} onChange={this.handleParameterChange}/>
        </div>
        <div className='showData'>
          <button onClick={this.addFunction} className='button-59'>Add function to pipeline</button>
        </div>
      </div>)
  }
}

export default Function;