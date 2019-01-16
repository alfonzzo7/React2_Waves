import React from 'react';

const FormField = ({formData, change, id}) => {
    const showError = () => {
        let errorMessage = '';

        if (formData.validation && !formData.valid) {
            errorMessage = (
                <div className="error_label">
                    {formData.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }

    const renderLabel = () => (
        formData.showLabel ? 
            <div className="label_inputs">
                {formData.config.label}
            </div>
        : null
    )

    const renderSelectOptions = (options) => (
        options ?
            options.map(item => (
                <option key={item.key} value={item.key}>{item.value}</option>
            ))
        : null
    )
    
    const renderTemplate = () => {
        let formTemplate = '';

        switch (formData.element) {
            case 'input':
                formTemplate = (
                    <div className="formBlock">
                        {renderLabel()}
                        <input
                            {...formData.config}
                            value={formData.value}
                            onBlur={(event) => change({event, id, blur:true})}
                            onChange={(event) => change({event, id})}
                        />
                        {showError()}
                    </div>
                )
            break;

            case 'select':
                formTemplate = (
                    <div className="formBlock">
                        {renderLabel()}
                        <select
                            value={formData.value}
                            onBlur={(event) => change({event, id, blur:true})}
                            onChange={(event) => change({event, id})}
                        >
                            <option value=''>{formData.config.placeholder}</option>
                            {renderSelectOptions(formData.config.options)}
                        </select>
                        {showError()}
                    </div>
                )
            break;

            case 'textarea':
                formTemplate = (
                    <div className="formBlock">
                        {renderLabel()}
                        <textarea
                            {...formData.config}
                            value={formData.value}
                            onBlur={(event) => change({event, id, blur:true})}
                            onChange={(event) => change({event, id})}
                        />
                        {showError()}
                    </div>
                )
            break;
        
            default:
                formTemplate = '';
        }

        return formTemplate;
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default FormField;