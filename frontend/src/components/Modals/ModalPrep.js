import React, { Component } from "react";
import "./Modal.css";
import APIService from "../APIService";

class ModalPrep extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prep: "",
            modal: false
        }
    }

    toggleModal = async () => {
        const responseData = await APIService.GetPrep()
            .catch((error) => console.log('error', error));
        if (responseData) {
            console.log("Response data:", responseData);
            this.setState({ prep: responseData })
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
                    Show Suggested Preparators
                </button>

                {modal && (
                    <div className="modal">
                        <div onClick={this.toggleModal} className="overlay"></div>
                        <div className="modal-content">
                            <h2>Suggested Preparators</h2>
                            <p>
                                {this.addLineBreak(this.state.prep)}
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

export default ModalPrep;