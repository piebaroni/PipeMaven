import React, { useState, Component } from 'react';
import PipelineFunction from './Function';


class MySelectBox extends Component {
  constructor(props) {
    super(props);
    this.pipeline = this.props.pipeline
    this.state = {
      lists: {
        "reduction": ["projection", "selection", "projection_selection"],

        "selection": ["ordered_value", "random", "duplicates", "time_series", "condition", "index"],

        "projection": ["column_type", "column_name"],

        "projection_column_name": ["get", "pop"],

        "projection_column_type": ["select_dtypes"],

        "selection_ordered_value": ["nlargest", "nsmallest"],

        "selection_random": ["sample"],

        "selection_duplicates": ["drop_duplicates"],

        "selection_time_series": ["at_time", "between_time", "first", "last"],

        "selection_condition": ["dropna", "query"],

        "selection_index": ["take", "tail", "head"],

        "projection_selection": ["drop", "filter", "truncate"]
      },
      selectedOption1: '',
      selectedOption2: '',
      selectedOption3: '',
      selectedOption4: '',
      selectedOption5: '',
      selectedFunction: '',
      secondSelectOptions: [],
      thirdSelectOptions: [],
      fourthSelectOptions: [],
      fifthSelectOptions: [],
      receivedData: ''
    };

    this.options_1 = ['reduction', 'transformation', 'augmentation', 'fusion'];
    this.functions = ['get', 'pop', 'select_dtypes', 'nlargest', 'nsmallest', 'sample', 'drop_duplicates', 'at_time',
      'between_time', 'first', 'last', 'dropna', 'query', 'take', 'tail', 'head', 'drop', 'filter', 'truncate'];

    this.onDataReceived = this.onDataReceived.bind(this)
    this.handleOption1Change = this.handleOption1Change.bind(this);
    this.handleOption2Change = this.handleOption2Change.bind(this);
    this.handleOption3Change = this.handleOption3Change.bind(this);
    this.handleOption4Change = this.handleOption4Change.bind(this);
    this.handleOption5Change = this.handleOption5Change.bind(this);
    this.reset = this.reset.bind(this)
  }
  
  onDataReceived = (data) => {
    this.props.sendDataToFunction(data);
  };

  handleOption1Change = (event) => {
    const { lists } = this.state
    const selectedValue = event.target.value;
    if (this.functions.includes(selectedValue)) {
      this.setState({ selectedFunction: selectedValue });
    } else {
      this.setState({ selectedOption1: selectedValue }, () => {
        this.setState({ secondSelectOptions: lists[this.state.selectedOption1] });
        console.log(this.state.secondSelectOptions)
        this.setState({ selectedOption2: '' });
        this.setState({ selectedOption3: '' });
        this.setState({ selectedOption4: '' });
        this.setState({ selectedOption5: '' });
        this.setState({ selectedFunction: '' });
        this.setState({ thirdSelectOptions: [] });
        this.setState({ fourthSelectOptions: [] });
        this.setState({ fifthSelectOptions: [] });
      });
    }
  };

  handleOption2Change = (event) => {
    const selectedValue = event.target.value;
    const { lists } = this.state
    if (this.functions.includes(selectedValue)) {
      this.setState({ selectedFunction: selectedValue });
    } else {
      this.setState({ selectedOption2: selectedValue }, () => {
        console.log(this.state.selectedOption2)
        this.setState({ thirdSelectOptions: lists[this.state.selectedOption2] });
        console.log(this.state.thirdSelectOptions)
        this.setState({ selectedOption3: '' });
        this.setState({ selectedOption4: '' });
        this.setState({ selectedOption5: '' });
        this.setState({ selectedFunction: '' });
        this.setState({ fourthSelectOptions: [] });
        this.setState({ fifthSelectOptions: [] });
      });
    }
  };

  handleOption3Change = (event) => {
    const selectedValue = event.target.value;
    const { lists } = this.state
    if (this.functions.includes(selectedValue)) {
      this.setState({ selectedFunction: selectedValue });
    } else {
      this.setState({ selectedOption3: selectedValue }, () => {
        console.log(this.state.selectedOption3)
        this.setState({ fourthSelectOptions: lists[this.state.selectedOption2 + '_' + this.state.selectedOption3] });
        console.log(this.state.fourthSelectOptions)
        this.setState({ selectedOption4: '' });
        this.setState({ selectedOption5: '' });
        this.setState({ selectedFunction: '' });
        this.setState({ fifthSelectOptions: [] });
      });
    }
  };

  handleOption4Change = (event) => {
    const selectedValue = event.target.value;
    const { lists } = this.state
    if (this.functions.includes(selectedValue)) {
      this.setState({ selectedFunction: selectedValue });
    } else {
      this.setState({ selectedOption3: selectedValue }, () => {
        console.log(this.state.selectedOption4)
        this.setState({ fifthSelectOptions: lists[this.state.selectedOption2 + '_' + this.state.selectedOption3 + '_' + this.state.selectedOption4] });
        console.log(this.state.fifthSelectOptions)
        this.setState({ selectedFunction: '' });
      });
    }
  };

  handleOption5Change = (event) => {
    const selectedValue = event.target.value;
    if (this.functions.includes(selectedValue)) {
      this.setState({ selectedFunction: selectedValue });
    } else {
      this.setState({ selectedOption5: selectedValue });
      this.setState({ selectedFunction: selectedValue });
    }
  };

  reset = (event) => {
    console.log('RESET')
    this.setState({ selectedFunction: '' });
    this.setState({ selectedOption1: '' });
    this.setState({ selectedOption2: '' });
    this.setState({ selectedOption3: '' });
    this.setState({ selectedOption4: '' });
    this.setState({ selectedOption5: '' });
    this.setState({secondSelectOptions: []})
    this.setState({thirdSelectOptions: []})
    this.setState({forthSelectOptions: []})
    this.setState({fifthSelectOptions: []})
  }


  render() {
    return (
      <div>
        <button onClick={this.reset}>RESET</button>

        <label>Select the first option:</label>
        <select value={this.state.selectedOption1} onChange={this.handleOption1Change}>
          <option value="">-- Select an option --</option>
          {this.options_1.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        {this.state.selectedOption1 && (
          <div>
            <label>Select the second option:</label>
            <select value={this.state.selectedOption2} onChange={this.handleOption2Change}>
              <option value="">-- Select an option --</option>
              {this.state.secondSelectOptions && this.state.secondSelectOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {this.state.selectedOption2 && (
          <div>
            <label>Select the second option:</label>
            <select value={this.state.selectedOption3} onChange={this.handleOption3Change}>
              <option value="">-- Select an option --</option>
              {this.state.thirdSelectOptions && this.state.thirdSelectOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {this.state.selectedOption3 && (
          <div>
            <label>Select the second option:</label>
            <select value={this.state.selectedOption4} onChange={this.handleOption4Change}>
              <option value="">-- Select an option --</option>
              {this.state.fourthSelectOptions && this.state.fourthSelectOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {this.state.selectedOption4 && (
          <div>
            <label>Select the second option:</label>
            <select value={this.state.selectedOption5} onChange={this.handleOption5Change}>
              <option value="">-- Select an option --</option>
              {this.state.fifthSelectOptions && this.state.fifthSelectOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {this.state.selectedFunction && (
          <div>
            <PipelineFunction name={this.state.selectedFunction} onDataReceived={this.onDataReceived}/>
          </div>
        )

        }


        <p>Selected first option: {this.state.selectedOption1}</p>
        <p>Selected second option: {this.state.selectedOption2}</p>
        <p>Selected third option: {this.state.selectedOption3}</p>
        <p>Selected fourth option: {this.state.selectedOption4}</p>
        <p>Selected fifth option: {this.state.selectedOption5}</p>
        <p>Selected function: {this.state.selectedFunction}</p>

      </div>
    );
  }
}

export default MySelectBox;
