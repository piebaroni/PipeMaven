import { Component } from 'react';
import APIService from './APIService';

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
        this.setState({ pipeline: [] });
    };

    componentDidUpdate(prevProps) {
        if (this.props.nextFunction !== prevProps.nextFunction) {
            this.setState((prevState) => ({
                pipeline: [...prevState.pipeline, this.props.nextFunction],
            }));
        }
    }

    evaluatePipeline = () => {
        const { pipeline } = this.state;
        APIService.EvaluatePipeline({ pipeline })
            .catch((error) => console.log('error', error));
    };

    execPipeline = () => {
        const { pipeline } = this.state;
        APIService.ExecPipeline({ pipeline })
            .catch((error) => console.log('error', error));
    };

    handleEvaluate = (event) => {
        event.preventDefault();
        this.evaluatePipeline();
    };

    handleExec = (event) => {
        event.preventDefault();
        this.execPipeline();
    };

    render() {
        return (
            <div>
                <h1>PIPELINE: </h1>
                <p>{this.state.pipeline.join(', ')}</p>
                <button onClick={this.deletePipeline}>Delete Pipeline</button>
                <button onClick={this.handleEvaluate}>Evaluate Pipeline</button>
                <button onClick={this.handleExec}>Execute Pipeline</button>
            </div>
        );
    }
}
export default Pipeline;