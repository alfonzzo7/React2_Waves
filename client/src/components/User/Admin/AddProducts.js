import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserLayout from './../../../hoc/UserLayout';
import FormField from './../../utils/Form/FormField';
import { update, generateData, isFormValid, populateOptionsFields, resetFields } from '../../utils/Form/FormActions';
import { getBrands, getWoods, addProducts, clearProducts } from './../../../redux/actions/products_actions';
import { fretsSelect } from '../../utils/Form/fixed_categories';
import FileUpload from './../../utils/Form/FileUpload';

class AddProducts extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            images: {
                value: [],
                validation: {
                    required: false,
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showLabel: false,
            },
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter the name of the product',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            description: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Product description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter the description of the product',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            price: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product price',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Enter the price of the product',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
                divider: 'form_devider',
            },
            brand: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product brand',
                    name: 'brand_input',
                    type: 'text',
                    placeholder: 'Select the brand of the product',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            shipping: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product shipping',
                    name: 'shipping_input',
                    type: 'text',
                    placeholder: 'Select the shipping of the product',
                    options: [
                        {key:true,value:'Yes'},
                        {key:false,value:'No'},
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            available: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product available in stock',
                    name: 'available_input',
                    type: 'text',
                    placeholder: 'Select if the product is available',
                    options: [
                        {key:true,value:'Yes'},
                        {key:false,value:'No'},
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
                divider: 'form_devider',
            },
            wood: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product wood',
                    name: 'wood_input',
                    type: 'text',
                    placeholder: 'Select the wood of the product',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            frets: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product frets',
                    name: 'frets_input',
                    type: 'text',
                    placeholder: 'Select the frets of the product',
                    options: fretsSelect
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
                divider: 'form_devider',
            },
            publish: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product publish in website',
                    name: 'publish_input',
                    type: 'text',
                    placeholder: 'Select if the product is publish',
                    options: [
                        {key:true,value:'Public'},
                        {key:false,value:'Hidden'},
                    ]
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
        const formData = this.state.formData;

        this.props.dispatch(getBrands()).then(() => {
            const newFormData = populateOptionsFields(formData, this.props.products.brands, 'brand');
            this.updateFields(newFormData);
        });

        this.props.dispatch(getWoods()).then(() => {
            const newFormData = populateOptionsFields(formData, this.props.products.woods, 'wood');
            this.updateFields(newFormData);
        });
    }

    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'products');
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
            }, () => this.props.dispatch(clearProducts()));
        }, 3000);
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'products');
        let formIsValid = isFormValid(this.state.formData, 'products');

        if (formIsValid) {
            this.props.dispatch(addProducts(dataToSubmit)).then(() => {
                if (this.props.products.addProduct.success) {
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

    updateFields = (formData) => {
        this.setState({
            formData
        });
    }

    imagesHandler = (images) => {
        const formData = {...this.state.formData};
        formData['images'].value = images;

        this.setState({
            formData
        });
    }

    renderForm = (formData) => {
        let keys = [];
        Object.keys(formData).forEach((key) => {
            keys.push(key);
        });
        return this.renderFields(formData, keys);
    }

    renderFields = (formData, keys) => (
        <div>
            {
                keys.map(key => (
                    <div key={`${key}parent`}>
                        {
                            key === 'images' ?
                                <FileUpload
                                    imagesHandler={(images) => this.imagesHandler(images)}
                                    reset={this.state.formSuccess}
                                />
                            :
                                <FormField
                                    key={key}
                                    id={key}
                                    formData={formData[key]}
                                    change={(element) => this.updateForm(element)}
                                />
                        }
                        {
                            formData[key].divider ? 
                                <div key={`${key}_divider`} className={formData[key].divider}></div>
                            : null
                        }
                    </div>
                ))
            }
        </div>
    )

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>Add product</h1>

                    <form onSubmit={(event) => this.submitForm(event)}>
                        {this.renderForm(this.state.formData)}

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
                            Add product
                        </button>
                    </form>
                </div>
            </UserLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        products: state.products
    }
}

export default connect(mapStateToProps)(AddProducts);