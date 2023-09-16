import { Component } from 'react';

class Function extends Component {

  constructor(props) {
    super(props);
    this.name = this.props.name;
    this.state = {
      parameter: 'a', // Initialize an empty string
    };
    this.addFunction = this.addFunction.bind(this);
  }

  addFunction = (event) => {
    console.log('ADD TO PIPELINE')
    this.props.onDataReceived(this.name);
  };

  handleParameterChange = (event) => {
    this.setState({parameter: event.target.value})
  }

  render() {
    return (
      <div>
        <h3>{this.props.name}!</h3>
        <div>
          <input  type='text' value={this.state.parameter} onChange={this.handleParameterChange}/>
        </div>
        <div className='showData'>
          <button onClick={this.addFunction} className='button-59'>Add function to pipeline</button>
        </div>
      </div>)
  }
}

export default Function;