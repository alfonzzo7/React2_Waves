import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormField from './../../utils/Form/FormField';
import { populateFields, isFormValid, generateData, update } from './../../utils/Form/FormActions';
import { getSiteData, updateSiteData } from './../../../redux/actions/site_actions';

class UpdateSiteNfo extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            address: {
                element: 'input',
                value: '',
                config: {
                    label: 'Address',
                    name: 'address_input',
                    type: 'text',
                    placeholder: 'Enter the site address',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            hours: {
                element: 'input',
                value: '',
                config: {
                    label: 'Working hours',
                    name: 'hours_input',
                    type: 'text',
                    placeholder: 'Enter the site working hours',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            phone: {
                element: 'input',
                value: '',
                config: {
                    label: 'Phone',
                    name: 'phone_input',
                    type: 'text',
                    placeholder: 'Enter the site phone',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    label: 'Email',
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter the site email',
                },
                validation: {
                    required: true,
                    email: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            }
        }
    }

    componentDidMount() {
        this.props.dispatch(getSiteData()).then(() => {
            const siteData = this.props.site.siteData[0];
            const formData = populateFields(this.state.formData, siteData);
    
            this.setState({
                formData
            });
        });
    }
    

    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'siteInfo');
        this.setState({
            formError: false,
            formData: newFormData,
        });
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'siteInfo');
        let formIsValid = isFormValid(this.state.formData, 'siteInfo');

        if (formIsValid) {
            this.props.dispatch(updateSiteData(dataToSubmit)).then(() => {
                this.setState({
                    formError: false,
                    formSuccess: true,
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            formSuccess: false
                        });
                    }, 3000);
                });
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
                    <h1>Site info</h1>
                    <FormField
                        id={'address'}
                        formData={this.state.formData.address}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'hours'}
                        formData={this.state.formData.hours}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'phone'}
                        formData={this.state.formData.phone}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'email'}
                        formData={this.state.formData.email}
                        change={(element) => this.updateForm(element)}
                    />

                    <div>
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
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.site
    }
}

export default connect(mapStateToProps)(UpdateSiteNfo);