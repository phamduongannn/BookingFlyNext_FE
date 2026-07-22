import React, { useEffect, useState } from 'react';
import { userServ } from '../../services/userServ';
import moment from 'moment';
import { Avatar } from 'antd';
import { Helmet } from 'react-helmet';

const Profile = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    userServ
      .getUserById(userId)
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const getGenderLabel = (gender) => {
    if (gender === 1) return 'Male';
    if (gender === 0) return 'Female';
    return 'Other';
  };

  return (
    <div>
      <Helmet>
        <title>Flynext | Profile</title>
      </Helmet>
      <div className="flex items-center space-x-4 mb-6">
        <Avatar size={78}>{user?.full_name}</Avatar>
        <div>
          <h1 className="text-3xl font-bold">{user?.full_name}</h1>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <p>Gender: {getGenderLabel(user?.gender)}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p>
            Date of Birth: {moment(user?.date_of_birth).format('DD/MM/YYYY')}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <p>Nationality: {user?.nationality}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p>CCCD: {user?.cccd}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p>Phone Number: {user?.phone}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p>Address: {user?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
