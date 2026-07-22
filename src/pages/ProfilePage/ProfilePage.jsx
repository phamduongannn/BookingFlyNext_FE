import React, { useEffect, useState } from 'react';
import BookedFlights from '../../layout/BookedFlights/BookedFlights';
import Footer from '../../layout/Footer/Footer';
import Header from '../../layout/Header/Header';
import Profile from '../../layout/Profile/Profile';
import { jwtDecode } from 'jwt-decode';

const ProfilePage = () => {
  const [activePage, setActivePage] = useState('profile');
  const token = localStorage.getItem('LOGIN_USER');
  const decoded = jwtDecode(token);
  const userId = decoded?.user_id;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <div className="flex justify-center py-5 rounded-l-2xl">
        <div className="flex w-full max-w-7xl  h-screen">
          <div className="w-1/3 bg-[#19232D] h-screen p-4 text-white rounded-l-2xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Menu</h2>
            <ul className="cursor-pointer space-y-4">
              <li
                className={`flex items-center p-3 rounded-lg transition ${
                  activePage === 'profile' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
                onClick={() => setActivePage('profile')}
              >
                <i className="fa-solid fa-user mr-2"></i>Profile
              </li>
              <li
                className={`flex items-center p-3 rounded-lg transition ${
                  activePage === 'bookedFlights'
                    ? 'bg-gray-700'
                    : 'hover:bg-gray-700'
                }`}
                onClick={() => setActivePage('bookedFlights')}
              >
                <i className="fa-solid fa-ticket mr-2"></i>
                Flight Tickets Booked
              </li>
            </ul>
          </div>
          <div className="w-4/5 p-8 bg-gray-50 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md">
              {activePage === 'profile' && <Profile userId={userId} />}
              {activePage === 'bookedFlights' && (
                <BookedFlights userId={userId} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
