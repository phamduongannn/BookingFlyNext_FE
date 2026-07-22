import React from 'react';
import './Blog.scss';

const Blog = () => {
  return (
    <section className="blog pb-[80px] pt-[60px]">
      <div className="container lg:max-w-[1140px]">
        <div className="flex flex-wrap justify-center">
          <div
            className="text-center"
            data-aos="flip-up"
            data-aos-duration="1200"
            data-aos-delay="300"
          >
            <div className="blog-header">
              <span className="sub-title">
                <span>Flynext</span> Blog
              </span>
              <h2 className="section-title">Latest News From Us</h2>
            </div>
          </div>
        </div>
        <div className="blog-content pt-10 sm:pt-5">
          <a href="#0" className="blog-card">
            <div className="blog-card-img">
              <img src="/img/phu-quoc.jpg" alt="" />
            </div>
            <div className="blog-card-content">
              <h4 className="text-white">Phu Quoc - A precious pearl</h4>
            </div>
          </a>
          <a href="#0" className="blog-card">
            <div className="blog-card-img">
              <img src="/img/Hanoi-.jpg" alt="" />
            </div>
            <div className="blog-card-content">
              <h4 className="text-white">
                Hanoi - Capital of a thousand years of civilization
              </h4>
            </div>
          </a>
          <a href="#0" className="blog-card">
            <div className="blog-card-img">
              <img src="/img/cauvang-.jpg" alt="" />
            </div>
            <div className="blog-card-content">
              <h4 className="text-white">
                Da Nang – The most livable coastal city
              </h4>
            </div>
          </a>
          <a href="#0" className="blog-card">
            <div className="blog-card-img">
              <img src="/img/Dalat_canhdep_986x906.jpg" alt="" />
            </div>
            <div className="blog-card-content">
              <h4 className="text-white">Da Lat - A miniature Paris</h4>
            </div>
          </a>
          <a href="#0" className="blog-card">
            <div className="blog-card-img">
              <img src="/img/nha-trang.jpg" alt="" />
            </div>
            <div className="blog-card-content">
              <h4 className="text-white">Nha Trang - Tram forest, Yen beach</h4>
            </div>
          </a>
          <a href="#0" className="blog-card">
            <div className="blog-card-img">
              <img src="/img/hue.jpg" alt="" />
            </div>
            <div className="blog-card-content">
              <h4 className="text-white">Hue - The poetic ancient capital</h4>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
