import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormField from './../../utils/Form/FormField';
import { update, generateData, isFormValid, resetFields } from '../../utils/Form/FormActions';
import { clearPayload, getWoods, addWood } from './../../../redux/actions/products_actions';
import { CLEAR_WOOD } from './../../../redux/actions/types';

class ManageWoods extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Wood name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter the name of the wood',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
        }
    }

    componentDidMount() {
        this.props.dispatch(getWoods());
    }
    

    showCategoryItems = () => (
        this.props.products.woods ?
        this.props.products.woods.map((item, i) => (
            <div className="category_item" key={i}>
                {item.name}
            </div>
        ))
        : null
    )

    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'woods');
        this.setState({
            formError: false,
            formData: newFormData,
        });
    }

    resetFieldHandler = () => {
        const formData = resetFields(this.state.formData);
        this.setState({
            formError: false,
            formSuccess: true,
            formData
        });
        setTimeout(() => {
            this.setState({
                formSuccess: false
            }, () => this.props.dispatch(clearPayload(CLEAR_WOOD)));
        }, 3000);
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'woods');
        let formIsValid = isFormValid(this.state.formData, 'woods');

        if (formIsValid) {
            this.props.dispatch(addWood(dataToSubmit, this.props.products.woods)).then(() => {
                if (this.props.products.addWood) {
                    this.resetFieldHandler();
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
            <div className='admin_category_wrapper'>
                <h1>Woods</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.showCategoryItems()}
                        </div>
                    </div>
                    <div className="right">
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <FormField
                                id={'name'}
                                formData={this.state.formData.name}
                                change={(element) => this.updateForm(element)}
                            />

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
                                Add wood
                            </button>
                        </form>     
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ManageWoods);