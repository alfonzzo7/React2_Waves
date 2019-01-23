import React from 'react';

import UserLayout from './../../hoc/UserLayout';
import MyButton from '../utils/buttom';
import HistoryBlock from './../utils/User/HistoryBlock';

const UserDashboard = ({user}) => {
    return (
        <UserLayout>
            <div>
                <div className="user_nfo_panel">
                    <h1>User information</h1>
                    <div>
                        <span>{user.userData.name}</span>
                        <span>{user.userData.lastname}</span>
                        <span>{user.userData.email}</span>
                    </div>
                    <MyButton
                        type = 'default'
                        title = 'Edit account info'
                        linkTo = '/user/profile'
                    />
                </div>

                {
                    user.userData.history ?
                        <div className="user_nfo_panel">
                            <h1>History purchases</h1>
                            <div className="user_product_block_wrapper">
                                <HistoryBlock
                                    products={user.userData.history}
                                />
                            </div>
                        </div>
                    : null
                }
            </div>
        </UserLayout>
    );
};

export default UserDashboard;