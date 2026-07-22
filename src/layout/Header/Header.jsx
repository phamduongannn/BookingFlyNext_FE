import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { path } from '../../common/path';
import { userServ } from '../../services/userServ';
import './Header.scss';

const Header = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('LOGIN_USER');
    if (loggedInUser) {
      setIsLoggedIn(true);
      const token = jwtDecode(loggedInUser);
      userServ.getUserById(token.user_id).then((res) => {
        const { role } = res.data.data;
        setUserRole(role);
      });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handelLogout = () => {
    localStorage.removeItem('LOGIN_USER');
    navigate(path.homepage);
    window.location.reload();
  };

  return (
    <header className="header z-[999] top-0 left-0 w-full sticky">
      <nav className="nav-bar bg-transparent border-gray-200 lg:p-0 flex items-center flex-1 justify-between">
        <div className="header-logo">
          <a href={path.homepage} className="flex items-center">
            <img
              src="/img/logo-FlyNext.png"
              className="mr-3 h-6 sm:h-[54px] animate__animated animate__fadeInLeft"
              alt=""
            />
          </a>
        </div>
        <div className="header-menu-content flex flex-wrap justify-between items-center max-w-screen-xl">
          <div className="search-bar lg:flex lg:order-2 hidden lg:mr-10 lg:ml-10 mx-auto text-white">
            <a href="#0" onClick={toggleSearch}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </a>
            <div
              className={`header-top-search-area ${
                isSearchActive ? 'active' : ''
              }`}
            >
              <form className="header-search-form">
                <input
                  type="text"
                  id="header_search"
                  placeholder="Search Product..."
                />
                <button type="button" className="header-search-btn">
                  <i className="fas fa-search" />
                </button>
              </form>
            </div>
          </div>
          {isLoggedIn ? (
            <div className="nav-user lg:flex lg:items-center lg:justify-center lg:order-3 hidden cursor-pointer">
              <a href="#0">
                <i className="fa-solid fa-user"></i>
              </a>
              <ul className="user-sub-menu">
                <li>
                  <Link to={path.profile}>Profile</Link>
                </li>
                {userRole === 'ADMIN' && (
                  <li>
                    <Link to={path.admin.base}>Manager</Link>
                  </li>
                )}
                <li>
                  <a href="#" onClick={handelLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="nav-user lg:flex lg:items-center lg:justify-center lg:order-3 hidden cursor-pointer">
              <a href="#0">
                <i className="fa-solid fa-user"></i>
              </a>
              <ul className="user-sub-menu">
                <li>
                  <a href={path.login}>Login</a>
                </li>
                <li>
                  <a href={path.signup}>SignUp</a>
                </li>
                <li>
                  <a href="#0">Support center</a>
                </li>
              </ul>
            </div>
          )}
          <div className="header-action hidden items-center lg:order-2 lg:flex lg:mr-8">
            <a
              href={path.bookTicket}
              className="btn-base flex items-center gap-1"
            >
              <svg
                fill="#000000"
                width="22px"
                height="24px"
                viewBox="-2.5 0 19 19"
                xmlns="http://www.w3.org/2000/svg"
                className="cf-icon-svg"
              >
                <path d="M12.382 5.304 10.096 7.59l.006.02L11.838 14a.908.908 0 0 1-.211.794l-.573.573a.339.339 0 0 1-.566-.08l-2.348-4.25-.745-.746-1.97 1.97a3.311 3.311 0 0 1-.75.504l.44 1.447a.875.875 0 0 1-.199.79l-.175.176a.477.477 0 0 1-.672 0l-1.04-1.039-.018-.02-.788-.786-.02-.02-1.038-1.039a.477.477 0 0 1 0-.672l.176-.176a.875.875 0 0 1 .79-.197l1.447.438a3.322 3.322 0 0 1 .504-.75l1.97-1.97-.746-.744-4.25-2.348a.339.339 0 0 1-.08-.566l.573-.573a.909.909 0 0 1 .794-.211l6.39 1.736.02.006 2.286-2.286c.37-.372 1.621-1.02 1.993-.65.37.372-.279 1.622-.65 1.993z" />
              </svg>
              Book Now
            </a>
          </div>
          <button
            type="button"
            className="inline-flex items-center p-2 ml-1 text-xl text-white rounded-lg lg:hidden"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <div
            className="header-menu hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="main-menu flex flex-col mt-4 font-bold lg:flex-row lg:space-x-8 lg:mt-0">
              <li className="menu_has_children">
                <NavLink
                  to={path.homepage}
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 "
                >
                  Home
                </NavLink>
              </li>
              <li className="menu_has_children">
                <NavLink
                  to={path.about}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  About Us
                </NavLink>
              </li>
              <li className="menu_has_children">
                <NavLink
                  to={path.pages}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100  lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 "
                >
                  Pages
                </NavLink>
                <ul className="sub-menu">
                  <li>
                    <a href="#">Home One</a>
                  </li>
                  <li>
                    <a href="#">Home Two</a>
                  </li>
                  <li>
                    <a href="#">Home Dark</a>
                  </li>
                </ul>
              </li>
              <li className="menu_has_children">
                <NavLink
                  to={path.blog}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100  lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 "
                >
                  Blog
                </NavLink>
              </li>
              <li className="menu_has_children">
                <NavLink
                  to={path.test}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100  lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  FaQ
                </NavLink>
              </li>
              <li className="menu_has_children">
                <NavLink
                  to={path.test}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100  lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};


export default Header;
