import React, { Component } from "react";
import "./Modal.css";
import APIService from "../APIService";

class ModalStats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stats: "",
            modal: false
        }
    }

    toggleModal = async () => {
        const responseData = await APIService.GetStats()
            .catch((error) => console.log('error', error));
        if (responseData) {
            console.log("Response data:", responseData);
            this.setState({ stats: responseData })
            this.setState((prevState) => ({
                modal: !prevState.modal
              }));
        }
    };

    componentDidUpdate() {
        const { modal } = this.state;
        if (modal) {
            document.body.classList.add('active-modal');
        } else {
            document.body.classList.remove('active-modal');
        }
    }

    addLineBreak = (str) =>
    str.split('\n').map((subStr) => {
      return (
        <>
          {subStr}
          <br />
          <br />
        </>
      );
    });

    render() {
        const { modal } = this.state;

        return (
            <>
                <button onClick={this.toggleModal} className="btn-modal">
                    Show Dataset Statistics
                </button>

                {modal && (
                    <div className="modal">
                        <div onClick={this.toggleModal} className="overlay"></div>
                        <div className="modal-content">
                            <h2>Dataset Statistics</h2>
                            <p>
                                {this.addLineBreak(this.state.stats)}
                            </p>
                            <button className="close-modal" onClick={this.toggleModal}>
                                CLOSE
                            </button>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default ModalStats;