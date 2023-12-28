import { Component } from 'react';
import APIService from './APIService';

class Pipeline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pipeline: [],
            label: '',
            response: ''
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

    evaluatePipeline = async () => {
        const { pipeline } = this.state;
        const label = this.state.label;
        const responseData = await APIService.EvaluatePipeline({ pipeline, label })
            .catch((error) => console.log('error', error));
        if (responseData) {
            console.log("Response data:", responseData);
            this.setState({response: responseData})
        }
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

    handleLabelChange = (event) => {
        this.setState({label: event.target.value})
    };

    addLineBreak = (str) =>
    str.split('\n').map((subStr) => {
      return (
        <>
          {subStr}
          <br />
        </>
      );
    });

    render() {
        return (
            <div>
                <h2>PIPELINE: </h2>
                <p>{this.state.pipeline.join(', ')}</p>
                <button onClick={this.deletePipeline} className="button-59">Delete Pipeline</button>
                <button onClick={this.handleExec} className="button-59">Execute Pipeline</button>
                <button onClick={this.handleEvaluate} className="button-59">Execute & Evaluate</button>
                <div>
                    <p>Set Label name for evaluation</p>
                    <input type='text' value={this.state.label} onChange={this.handleLabelChange} className='label'/>
                </div>
                {this.state.response && (<div><h2>Results:</h2>
                <p>{this.addLineBreak(this.state.response)}</p></div>
                )}
            </div>
        );
    }
}
export default Pipeline;