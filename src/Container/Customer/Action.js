import * as types from './ActionTypes';

export const updateCustomerRedux = (data) => {
    const { data1 } = data;
    console.log('dat6a', data)
    return (dispatch, getState) => {
        return dispatch({ type: types.UPDATE_CUSTOMER, payload: data1 });
    }
}

export const addNewCustomer = (data) => {
    const { name, email, phone, customer_id, gender } = data;
    return (dispatch, getState) => {
        const { customerDetails } = getState().customer;
        const lastData = customerDetails[customerDetails.length - 1];
        const newData = [
            ...customerDetails,
            {
                'id': lastData.id + 1,
                'name': name || '',
                'email': email || '',
                'phone': phone || '',
                'customer_id': customer_id || '',
                'gender': gender || '',
            }
        ]
        return dispatch({ type: types.CREATE_NEW_CUSTOMER, payload: newData });
    }
}


export const deleteCustomer = (data) => {
    const { id } = data;
    return (dispatch, getState) => {
        const { customerDetails } = getState().customer;
        const newData = customerDetails.filter((data) => data.id !== id);
        return dispatch({ type: types.DELETE_CUSTOMER, payload: newData });
    }
}

export const editCustomer = (data) => {
    const { id, name, email, phone, customer_id, gender } = data;
    return (dispatch, getState) => {
        const { customerDetails } = getState().customer;
        const newData = customerDetails.filter(data => {
            if (data.id === id) {
                if (name) data.name = name;
                if (email) data.email = email;
                if (phone) data.phone = phone;
                if (customer_id) data.customer_id = customer_id;
                if (gender) data.gender = gender;
            }
            return data;
        })
        return dispatch({ type: types.EDIT_CUSTOMER, payload: newData });
    }
}
