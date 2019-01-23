import React from 'react';
import UserLayout from './../../hoc/UserLayout';
import UpdatePersonaNfo from './UpdatePersonaNfo';

const UpdateProfile = () => {
    return (
        <UserLayout>
            <h1>Profile</h1>
            <UpdatePersonaNfo/>
        </UserLayout>
    );
};

export default UpdateProfile;