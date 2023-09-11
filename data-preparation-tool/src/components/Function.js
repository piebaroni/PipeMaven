import { Component } from 'react';

class Function extends Component {

    constructor(props) {
        super(props);
        this.name = this.props.name;
        this.parameter = [];
        this.addFunction = this.addFunction.bind(this);
    }

    addFunction = (event) => {
        console.log('ADD TO PIPELINE')
        this.props.onDataReceived(this.name);
      };

    render() {
      return (
        <div>
            <h1>{this.props.name}!</h1>
            <button onClick={this.addFunction}>Add function to pipeline</button>
        </div>)
    }
  }

  export default Function;