import React, { Component } from 'react';
import { Dialog } from '@material-ui/core';

class DialogBox extends Component {
    state = {
        open: false
    }

    static getDerivedStateFromProps(props, state) {
        return state = {
            open: props.open
        }
    }

    render() {
        return (
            <Dialog open={this.state.open}>
                <div className="dialog_alert">
                    <div>{this.props.title}</div>
                    <div>{this.props.msg}</div>
                </div>
            </Dialog>
        );
    }
}

export default DialogBox;