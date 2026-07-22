import React from 'react';
import './Banner.scss';

const Banner = () => {
  return (
    <section className="banner-section">
      <div
        className="banner-element "
        data-aos="fade-left"
        data-aos-duration="1200"
      >
        <img src="/img/element-lg.png" alt="element" />
      </div>
      <div className="banner-element-two">
        <img src="/img/element-sm.png" alt="" />
      </div>
      <div className="banner-element-three">
        <img src="/img/element-md.png" alt="" />
      </div>
      <div className="banner-element-four">
        <img src="/img/element-xs.png" alt="" />
      </div>
      <div className="banner-social-area">
        <ul className="banner-social">
          <li>
            <a href="https://www.facebook.com/vietjetvietnam">
              <i className="fa-brands fa-facebook-f"></i>
              
            </a>
          </li>
          <li>
            <a href="https://x.com/VietnamAirlines?mx=2" className="active">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@BambooAirwaysOfficial">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/mixivivu/">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="contaier-fluid">
        <div className="flex flex-wrap justify-center items-center -mb-[30px] -mr-[15px] -ml-[15px]">
          <div className="banner-left mb-[30px] relative">
            <div
              className="banner-content "
              data-aos="fade-right"
              data-aos-duration="1800"
            >
              <span className="sub-title">
                <span>Fly</span>next
              </span>
              <h1 className="title">
                Simple Booking. <br /> Easy Savings
              </h1>
              <p>
                Flynext is your premier destination for booking affordable and
                convenient flights. With us, you can easily explore the world
                with great flights, without worrying about the cost. Start your
                journey with Flynext today and experience the convenience and
                safety every time you fly with us!
              </p>
              <div className="banner-btn">
                <a href="#" className="btn-base">
                  <i className="fa-solid fa-chevron-right mr-2"></i> Make Your
                  Trip
                </a>
                <a href="#" className="btn-base active">
                  Contact Us
                  <i className="fa-solid fa-arrow-right-long ml-2"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="banner-right mb-[30px] relative">
            <div className="banner-thumb">
              <img src="/img/element-flight.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
