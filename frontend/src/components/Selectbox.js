import React, { Component } from 'react';
import PipelineFunction from './Function';


class MySelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taxonomy_lists: {
        "reduction": ["projection", "selection", "projection_selection"],

        "selection": ["ordered_value", "random", "duplicates", "time_series", "condition", "index", "aggregate"],

        "projection": ["column_type", "column_name"],

        "projection_column_name": ["get", "pop"],

        "projection_column_type": ["select_dtypes"],

        "selection_ordered_value": ["nlargest", "nsmallest"],

        "selection_random": ["sample"],

        "selection_duplicates": ["drop_duplicates"],

        "selection_time_series": ["at_time", "between_time", "first", "last"],

        "selection_condition": ["query"],

        "selection_index": ["tail", "head"],

        "projection_selection": ["take", "drop", "filter", "truncate", "dropna"],

        "fusion": ["append", "join_"],

        "append": [],

        "join_": ["join", "merge"],

        "augmentation": ["horizontal", "vertical", "list_expansion"],

        "vertical": ["assign", "asfreq"],

        "horizontal": ["insert", "one_hot"],

        "list_expansion": ["explode"],

        "transformation": ["data_processing", "combine", "modify", "time_series", "sort", "null_values"],

        "data_processing": ["math_operators", "change_elements", "threshold", "cumulative", "boolean_output", "map_"],

        "data_processing_change_elements": ["pct_change", "diff"],

        "data_processing_math_operators": ["addition", "subtraction", "divide", "multiply", "matrix_moltiplication", "module", "power", "round", "normalize"],

        "data_processing_math_operators_addition": ["add", "radd"],

        "data_processing_math_operators_subtraction": ["sub", "rsub"],

        "data_processing_math_operators_divide": ["div", "truediv", "floordiv", "rdiv", "rtruediv", "rfloordiv"],

        "data_processing_math_operators_multiply": ["mul", "rmul"],

        "data_processing_math_operators_matrix_moltiplication": ["dot"],

        "data_processing_math_operators_module": ["mod", "rmod", "abs"],

        "data_processing_math_operators_power": ["pow", "rpow"],

        "data_processing_math_operators_round": ["round"],

        "data_processing_map_": ["where", "mask", "apply", "map", "pipe", "transform"],

        "data_processing_threshold": ["clip"],

        "data_processing_cumulative": ["cummax", "cummin", "cumprod", "cumsum"],

        "data_processing_boolean_output": ["check_null", "relational"],

        "data_processing_boolean_output_relational": ["less_then", "greater_then", "greater_or_equal", "less_or_equal", "equal", "not_equal"],

        "data_processing_boolean_output_relational_less_then": ["lt"],

        "data_processing_boolean_output_relational_greater_then": ["gt"],

        "data_processing_boolean_output_relational_greater_or_equal": ["ge"],

        "data_processing_boolean_output_relational_less_or_equal": ["le"],

        "data_processing_boolean_output_relational_equal": ["eq"],

        "data_processing_boolean_output_relational_not_equal": ["ne"],

        "data_processing_boolean_output_check_null": ["isna", "isnull", "notna", "notnull"],

        "combine": ["combine", "combine_first"],

        "modify": ["reindex", "reindex_like", "rename", "rename_axis", "reset_index", "set_axis", "set_index"],

        "time_series": ["shift", "to_timestamp", "tz_convert", "tz_localize"],

        "sort": ["sort_values", "sort_index", "random"],

        "null_values": ["interpolate", "fillna"]
      },
      selectedOption1: '',
      selectedOption2: '',
      selectedOption3: '',
      selectedOption4: '',
      selectedOption5: '',
      selectedOption6: '',
      selectedFunction: '',
      secondSelectOptions: [],
      thirdSelectOptions: [],
      fourthSelectOptions: [],
      fifthSelectOptions: [],
      sixthSelectOptions: [],
    };

    this.options_1 = ['reduction', 'transformation', 'augmentation', 'fusion'];
    this.functions = ['get', 'pop', 'select_dtypes', 'nlargest', 'nsmallest', 'sample', 'drop_duplicates', 'at_time',
      'between_time', 'first', 'last', 'dropna', 'query', 'take', 'tail', 'head', 'drop', 'filter', 'truncate', "join",
      "merge", "assign", "asfreq", "insert", "add", "radd", "sub", "rsub", "div", "truediv", "floordiv", "rdiv", "rtruediv",
      "rfloordiv", "mul", "rmul", "dot", "mod", "rmod", "abs", "pow", "rpow", "round", "where", "mask", "apply", "map",
      "pipe", "transform", "clip", "cummax", "cummin", "cumprod", "cumsum", "lt", "gt", "ge", "le", "eq", "ne", "isna",
      "isnull", "notna", "notnull", "combine", "combine_first", "reindex", "reindex_like", "rename", "rename_axis",
      "reset_index", "set_axis", "set_index", "shift", "to_timestamp", "tz_convert", "tz_localize", "sort_values", "sort_index",
      "interpolate", "fillna", "pct_change", "diff", "normalize", "one_hot", "aggregate", "explode"
    ];

    this.onDataReceived = this.onDataReceived.bind(this)
    this.handleOption1Change = this.handleOption1Change.bind(this);
    this.handleOption2Change = this.handleOption2Change.bind(this);
    this.handleOption3Change = this.handleOption3Change.bind(this);
    this.handleOption4Change = this.handleOption4Change.bind(this);
    this.handleOption5Change = this.handleOption5Change.bind(this);
    this.handleOption6Change = this.handleOption6Change.bind(this);
  }

  onDataReceived = (data) => {
    this.props.sendDataToFunction(data);
  };

  handleOption1Change = (event) => {
    const { taxonomy_lists } = this.state
    const selectedValue = event.target.value;
    if (this.functions.includes(selectedValue)) {
      this.setState({ selectedFunction: selectedValue });
    } else {
      this.setState({ selectedOption1: selectedValue }, () => {
        this.setState({ secondSelectOptions: taxonomy_lists[this.state.selectedOption1] }, () => {
          console.log(this.state.secondSelectOptions);
        });
        this.setState({ selectedOption2: '' });
        this.setState({ selectedOption3: '' });
        this.setState({ selectedOption4: '' });
        this.setState({ selectedOption5: '' });
        this.setState({ selectedFunction: '' });
        this.setState({ selectedOption6: '' })
        this.setState({ thirdSelectOptions: [] });
        this.setState({ fourthSelectOptions: [] });
        this.setState({ fifthSelectOptions: [] });
        this.setState({ sixthSelectOptions: [] })
      });
    }
  };

  handleOption2Change = (event) => {
    const selectedValue = event.target.value;
    const { taxonomy_lists } = this.state
    if (this.functions.includes(selectedValue)) {
      this.setState({ selectedFunction: selectedValue });
    } else {
      this.setState({ selectedOption2: selectedValue }, () => {
        console.log(this.state.selectedOption2)
        this.setState({ thirdSelectOptions: taxonomy_lists[this.state.selectedOption2] }, () => {
          console.log(this.state.thirdSelectOptions);
        });
        this.setState({ selectedOption3: '' });
        this.setState({ selectedOption4: '' });
        this.setState({ selectedOption5: '' });
        this.setState({ selectedFunction: '' });
        this.setState({ selectedOption6: '' })
        this.setState({ fourthSelectOptions: [] });
        this.setState({ fifthSelectOptions: [] });
        this.setState({ sixthSelectOptions: [] })
      });
    }
  };

  handleOption3Change = (event) => {
    const selectedValue = event.target.value;
    const { taxonomy_lists } = this.state
    if (this.functions.includes(selectedValue)) {
      this.setState({ selectedFunction: selectedValue });
    } else {
      this.setState({ selectedOption3: selectedValue }, () => {
        console.log(this.state.selectedOption3)
        this.setState({ fourthSelectOptions: taxonomy_lists[this.state.selectedOption2 + '_' + this.state.selectedOption3] }, () => {
          console.log(this.state.selectedOption2 + '_' + this.state.selectedOption3);
        });
        this.setState({ selectedOption4: '' });
        this.setState({ selectedOption5: '' });
        this.setState({ selectedFunction: '' });
        this.setState({ selectedOption6: '' })
        this.setState({ fifthSelectOptions: [] });
        this.setState({ sixthSelectOptions: [] })
      });
    }
  };

  handleOption4Change = (event) => {
    const selectedValue = event.target.value;
    const { taxonomy_lists } = this.state
    if (this.functions.includes(selectedValue)) {
      this.setState({ selectedFunction: selectedValue });
    } else {
      this.setState({ selectedOption4: selectedValue }, () => {
        console.log(this.state.selectedOption3)
        console.log(this.state.selectedOption4)
        this.setState({ fifthSelectOptions: taxonomy_lists[this.state.selectedOption2 + '_' + this.state.selectedOption3 + '_' + this.state.selectedOption4]}, () => {
          console.log(this.state.selectedOption2 + '_' + this.state.selectedOption3 + '_' + this.state.selectedOption4)
        });
        this.setState({ selectedOption6: '' })
        this.setState({ selectedFunction: '' });
        this.setState({ sixthSelectOptions: [] })
      });
    }
  };

  handleOption5Change = (event) => {
    const selectedValue = event.target.value;
    const { taxonomy_lists } = this.state
    if (this.functions.includes(selectedValue)) {
      this.setState({ selectedFunction: selectedValue });
    } else {
      this.setState({ selectedOption5: selectedValue }, () => {
        console.log(this.state.selectedOption5)
        this.setState({ sixthSelectOptions: taxonomy_lists[this.state.selectedOption2 + '_' + this.state.selectedOption3 + '_' + this.state.selectedOption4 + '_' + this.state.selectedOption5] });
        this.setState({ selectedFunction: '' });
      });
    }
  };

  handleOption6Change = (event) => {
    const selectedValue = event.target.value;
    if (this.functions.includes(selectedValue)) {
      this.setState({ selectedFunction: selectedValue });
    } else {
      this.setState({ selectedOption6: selectedValue });
      this.setState({ selectedFunction: selectedValue });
    }
  };

  render() {
    return (
      <div>
        <div className='flex-parent-element'>
          <div className='flex-child-element magenta'>
            <label>Select the first option:  </label>
            <select value={this.state.selectedOption1} onChange={this.handleOption1Change}>
              <option value="">-- Select an option --</option>
              {this.options_1.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {this.state.selectedOption1 && (
            <div className='flex-child-element green'>
              <label>Select the second option:  </label>
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
            <div className='flex-child-element green'>
              <label>Select the third option:  </label>
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
            <div className='flex-child-element green'>
              <label>Select the fourth option:  </label>
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
            <div className='flex-child-element green'>
              <label>Select the fifth option:  </label>
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

          {this.state.selectedOption5 && (
            <div className='flex-child-element green'>
              <label>Select the sixth option:  </label>
              <select value={this.state.selectedOption6} onChange={this.handleOption6Change}>
                <option value="">-- Select an option --</option>
                {this.state.sixthSelectOptions && this.state.sixthSelectOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        {this.state.selectedFunction && (
            <PipelineFunction name={this.state.selectedFunction} onDataReceived={this.onDataReceived} />
        )

        }

      </div>
    );
  }
}

export default MySelectBox;
