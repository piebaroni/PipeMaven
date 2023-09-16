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
        console.log(pipeline)
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
                <h2>PIPELINE: </h2>
                <p>{this.state.pipeline.join(', ')}</p>
                <button onClick={this.deletePipeline} className="button-59">Delete Pipeline</button>
                <button onClick={this.handleExec} className="button-59">Execute Pipeline</button>
                <button onClick={this.handleEvaluate} className="button-59">Execute & Evaluate</button>
            </div>
        );
    }
}
export default Pipeline;