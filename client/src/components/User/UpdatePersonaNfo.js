import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormField from './../utils/Form/FormField';
import { update, generateData, isFormValid, populateFields } from '../utils/Form/FormActions';
import { updateUserData } from './../../redux/actions/user_actions';
import { clearPayload } from '../../redux/actions/products_actions';
import { CLEAR_UPDATE_USER_DATA } from '../../redux/actions/types';

class UpdatePersonaNfo extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter your lastname',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email',
                },
                validation: {
                    required: true,
                    email: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            }
        }
    }

    componentDidMount() {
        const formData = populateFields(this.state.formData, this.props.user.userData);

        this.setState({
            formData
        });
    }
    

    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'updateUser');
        this.setState({
            formError: false,
            formData: newFormData,
        });
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'updateUser');
        let formIsValid = isFormValid(this.state.formData, 'updateUser');

        if (formIsValid) {
            this.props.dispatch(updateUserData(dataToSubmit)).then(() => {
                if (this.props.user.updateUser.success) {
                    this.setState({
                        formError: false,
                        formSuccess: true,
                    });
                    setTimeout(() => {
                        this.setState({
                            formSuccess: false
                        }, () => this.props.dispatch(clearPayload(CLEAR_UPDATE_USER_DATA)));
                    }, 3000);
                } else {
                    this.setState({
                        formError: true
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
            <div>
                <form onSubmit={(event) => this.submitForm(event)}>
                    <h2>Personal information</h2>
                    <div className="form_block_two">
                        <div className="block">
                            <FormField
                                id={'name'}
                                formData={this.state.formData.name}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                        <div className="block">
                            <FormField
                                id={'lastname'}
                                formData={this.state.formData.lastname}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                    </div>
                    <div>
                        <FormField
                            id={'email'}
                            formData={this.state.formData.email}
                            change={(element) => this.updateForm(element)}
                        />
                    </div>
                    {
                        this.state.formSuccess ?
                            <div className="form_success">
                                Success
                            </div>
                        : null
                    }
                    {
                        this.state.formError ?
                            <div className="error_label">
                                Please check your data
                            </div>
                        : null
                    }
                    <button onClick={(event) => this.submitForm(event)}>
                        Update
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UpdatePersonaNfo);