import React, { Component } from 'react';
import axios from 'axios';

import { update, generateData, isFormValid } from '../../utils/Form/FormActions';
import FormField from './../../utils/Form/FormField';
import { USER_SERVER } from './../../utils/misc';

class ForgotPassword extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formData: {
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
            },
        }
    }

    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'forgot_password');
        this.setState({
            formError: false,
            formData: newFormData,
        });
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'forgot_password');
        let formIsValid = isFormValid(this.state.formData, 'forgot_password');

        if (formIsValid) {
            axios.post(`${USER_SERVER}/forgot_password`, dataToSubmit).then(response => {
                if (response.data.success) {
                    this.setState({
                        formSuccess: true,
                        formError: false
                    }, () => {
                        setTimeout(() => {
                            this.setState({formSuccess: false});
                        }, 2000);
                    });   
                } else {
                    this.setState({formError: true});
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
               <h1>Forgot password</h1>
               <form onSubmit={(event) => this.submitForm(event)}>
                    <FormField
                        id={'email'}
                        formData={this.state.formData.email}
                        change={(element) => this.updateForm(element)}
                    /> 

                    {
                        this.state.formSuccess ?
                        <div className="form_success">
                            Success, check your email.
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
                        Send email to reset password
                    </button>                    
               </form>
            </div>
        );
    }
}

export default ForgotPassword;