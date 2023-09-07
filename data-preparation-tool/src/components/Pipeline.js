import { Component } from 'react';

class Pipeline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pipeline: [],
        }
        this.deletePipeline = this.deletePipeline.bind(this)
    }

    deletePipeline = (event) => {
        console.log('DELETE PIPELINE')
        this.setState({pipeline: []});
      };

    componentDidUpdate(prevProps) {
        // Check if dynamicValue has changed
        if (this.props.nextFunction !== prevProps.nextFunction) {
            // Append the new value to the array in state
            this.setState((prevState) => ({
                pipeline: [...prevState.pipeline, this.props.nextFunction],
            }));
        }
    }
    render() {
        return (
            <div>
                <h1>PIPELINE: </h1>
                <p>{this.state.pipeline.join(', ')}</p>
                <button onClick={this.deletePipeline}>Delete Pipeline</button>
            </div>
        );
    }
}
export default Pipeline;