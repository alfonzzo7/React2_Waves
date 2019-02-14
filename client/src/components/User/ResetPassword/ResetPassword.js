import React, { Component } from 'react';
import axios from 'axios';
import { Dialog } from '@material-ui/core';

import { update, generateData, isFormValid } from '../../utils/Form/FormActions';
import FormField from './../../utils/Form/FormField';
import { USER_SERVER } from './../../utils/misc';

class ResetPassword extends Component {
    state = {
        resetToken: '',
        formError: false,
        formErrorMessage: '',
        formSuccess: false,
        formData: {
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'confirmPassword_input',
                    type: 'password',
                    placeholder: 'Confirm your password',
                },
                validation: {
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage: '',
                remove: true,
            }
        }
    }

    componentDidMount() {
        const resetToken = this.props.match.params.token;
        this.setState({resetToken});
    }

    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'reset_password');
        this.setState({
            formError: false,
            formData: newFormData,
        });
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'reset_password');
        let formIsValid = isFormValid(this.state.formData, 'reset_password');

        if (formIsValid) {
            axios.post(`${USER_SERVER}/reset_password`, {...dataToSubmit, resetToken: this.state.resetToken}).then(response => {
                if (response.data.success) {
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    setTimeout(() => {
                        this.props.history.push('/register_login');
                    }, 3000);
                } else {
                    this.setState({
                        formError: true,
                        formErrorMessage: response.data.message
                    });
                }
            });
        } else {
            this.setState({
                formError: true
            });
        }
    }

    render() {
        return (
            <div className='container'>
                <form onSubmit={(event) => this.submitForm(event)}>
                    <h2>Reset password</h2>
                    <div className="form_block_two">
                        <div className="block">
                            <FormField
                                id={'password'}
                                formData={this.state.formData.password}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                        <div className="block">
                            <FormField
                                id={'confirmPassword'}
                                formData={this.state.formData.confirmPassword}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                    </div>
                    <div>
                        {
                            this.state.formError ?
                            <div className="error_label">
                                {this.state.formErrorMessage}
                            </div>
                            : null
                        }
                        <button onClick={(event) => this.submitForm(event)}>
                            Reset password
                        </button>
                    </div>
                </form>

                <Dialog open={this.state.formSuccess}>
                    <div className="dialog_alert">
                        <div>Your password have been changed!!!</div>
                        <div>You will be redirected to the LOGIN in a couple of seconds...</div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default ResetPassword;