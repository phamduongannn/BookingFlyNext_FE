import React from 'react';
import './Partner.scss';

const Partner = () => {
  return (
    <section className="partner section-bg pb-8 mb-20">
      <div className="container-partner partner-main">
        <div className="partner-header">
          <div className="partner-title">
            <h4>
              Partners Along the <br />
              Large airline
            </h4>
            <div>
              <img src="/img/element-quote-more.png" alt="" />
            </div>
          </div>
          <label className="partner-description">
            Leading partners with major airlines: Exclusive offers <br /> just
            for you
          </label>
        </div>
        <div className="partner-content">
          <div
            className="partner-img"
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
          >
            <div>
              <img src="/img/logo-Vietnam-Airlines.png" alt="" />
            </div>
          </div>
          <div
            className="partner-img"
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
          >
            <div>
              <img src="/img/logo-vietjet-air.png" alt="" />
            </div>
          </div>
          <div
            className="partner-img"
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
          >
            <div>
              <img src="/img/logo-bamboo-airways.png" alt="" />
            </div>
          </div>
          <div
            className="partner-img"
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
          >
            <div>
              <img src="/img/logo-viettravel-airlines.png" alt="" />
            </div>
          </div>
          <div
            className="partner-img"
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
          >
            <div>
              <img src="/img/logo-pacific-airlines.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner;
