

export const validate = (element, formData = []) => {
    let error = [true, ''];

    if (element.validation.email) {
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'Must be a valid email' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.confirm) {
        const valid = element.value.trim() === formData[element.validation.confirm].value;
        const message = `${!valid ? 'Passwords do not match' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    return error;
}

export const update = (element, formData, formName) => {
    const newFormData = {...formData};
    
    const newElement = {...newFormData[element.id]};

    newElement.value = element.event.target.value;

    if (element.blur) {
        let validData = validate(newElement, formData);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormData[element.id] = newElement;

    return newFormData;
}

export const generateData = (formData, formName) => {
    let dataToSubmit = {};

    for (let key in formData) {
        if (!formData[key].remove) {
            dataToSubmit[key] = formData[key].value;
        }
    }

    return dataToSubmit;
}

export const isFormValid = (formData, formName) => {
    let formValid = true;

    for (let key in formData) {
        formValid = formData[key].valid && formValid;
    }

    return formValid;
}

export const populateOptionsFields = (formData, arrayData, field) => {
    const array = [];
    const newFormData = {...formData};

    arrayData.forEach(item => {
        array.push({
            key: item._id,
            value: item.name
        });
    });

    newFormData[field].config.options = array;

    return newFormData;
}

export const resetFields = (formData) => {
    let newFormData = {...formData};

    for (let key in newFormData) {
        newFormData[key].value = key === 'images' ? [] : '';
        newFormData[key].valid = newFormData[key].validation.required ? false : true;
        newFormData[key].touched = false;
        newFormData[key].validationMessage = '';
    }

    return newFormData;
}