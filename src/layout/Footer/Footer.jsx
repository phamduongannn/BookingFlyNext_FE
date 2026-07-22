import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer footer-section-bg pt-[100px]">
      <div
        className="footer-element"
        data-aos="fade-left"
        data-aos-duration="1200"
      >
        <img src="/img/element-lg.png" alt="" />
      </div>
      <div className="container lg:max-w-[1140px]">
        <div className="footer-top-area mb-10">
          <div className="flex -mb-[30px] items-center">
            <div className="relative mb-[30px] footer-main">
              <div className="footer-widget">
                <div className="footer-logo mb-[15px]">
                  <a href="#0" className="site-logo site-title">
                    <img src="/img/logo-FlyNext.png" alt="" />
                  </a>
                </div>
                <p className="text-white mb-0">
                  Welcome to Flynext, where each journey is not just an
                  adventure but a flight to new, exciting worlds. Join us in
                  exploring fantastic destinations and creating unforgettable
                  memories along your way! Fly to your next adventure with
                  Flynext!
                </p>
              </div>
            </div>
            <div className="relative mb-[30px] footer-main flex justify-end px-10">
              <div className="footer-widget">
                <h4 className="widget-title">VIETNAM</h4>
                <ul className="footer-list">
                  <li>
                    <a href="#0">828 Su Van Hanh Street</a>
                  </li>
                  <li>
                    <a href="#0">Ho Chi Minh City</a>
                  </li>
                  <li>
                    <a href="#0">+84 28 3863 2052</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom-area">
          <div className="flex flex-wrap -mr-[15px] -ml-[15px]">
            <div className="relative mb-[30px] footer-bottom-main">
              <div className="footer-widget">
                <h4 className="title">About Us</h4>
                <ul className="footer-list">
                  <li>
                    <a href="#0">About</a>
                  </li>
                  <li>
                    <a href="#0">Blog</a>
                  </li>
                  <li>
                    <a href="#0">Contacts</a>
                  </li>
                  <li>
                    <a href="#0">Pages</a>
                  </li>
                  <li>
                    <a href="#0">FAQs</a>
                  </li>
                  <li>
                    <a href="#0">Careers</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative mb-[30px] footer-bottom-main">
              <div className="footer-widget">
                <h4 className="title">Service</h4>
                <ul className="footer-list">
                  <li>
                    <a href="#0">Convenience Options</a>
                  </li>
                  <li>
                    <a href="#0">Privilege Pass</a>
                  </li>
                  <li>
                    <a href="#0">On-time Guarantee</a>
                  </li>
                  <li>
                    <a href="#0">Flynext Account</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative mb-[30px] footer-bottom-main">
              <div className="footer-widget">
                <h4 className="title">Support</h4>
                <ul className="footer-list">
                  <li>
                    <a href="#0">Help center</a>
                  </li>
                  <li>
                    <a href="#0">Live chat</a>
                  </li>
                  <li>
                    <a href="#0">How it works</a>
                  </li>
                  <li>
                    <a href="#0">Legal</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative mb-[30px] footer-bottom-main">
              <div className="footer-widget">
                <h4 className="title">Newsletter</h4>
                <p>
                  Flynext was founded in 2024 by a group of safety-focused
                  professionals erators.
                </p>
                <form className="subscribe-form">
                  <label className="subscribe-icon">
                    <i className="fa-regular fa-envelope"></i>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Email..."
                  />
                  <button className="btn-base" type="submit">
                    Subscribe Us
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
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="social-area">
            <ul className="footer-social">
              <li>
                <a href="#0">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li>
                <a href="#0" className="active">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="fab fa-youtube" />
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="fab fa-instagram" />
                </a>
              </li>
            </ul>
          </div>
          <p>© 2024 Fly Next Airlines. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
