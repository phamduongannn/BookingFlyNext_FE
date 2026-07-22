import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import './Feedback.scss';
import { Rate } from 'antd';

const Feedback = () => {
  return (
    <section className="feedback mb-14">
      <div className="sectionBg">
        <img src="/img/bg-fb.png" alt="" />
      </div>
      <div className="container">
        <div className="feeback-title justify-center text-center mt-10 pb-10">
          <div className="title-content">
            <p className="sub-title">
              <span>Flynext</span> Testimonial
            </p>
            <h2
              className="title text-[30px]"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-offset="300"
            >
              Our Customer Feedback
            </h2>
          </div>
        </div>
        <div className="feeback-slider justify-center">
          <div className="fb-slder-1">
            <div
              className="overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-offset="300"
            >
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
              >
                <SwiperSlide className="mb-20">
                  <div className="testimonials pt-[10px] text-center">
                    <div className="testimonials_img rounded-full">
                      <img src="/img/img-ava.png" alt="" />
                    </div>
                    <div className="text-[18px] font-semibold text-[#dcbb87] mt-[30px]">
                      Excellent Service!
                    </div>
                    <div className="testimonials-content text-[20px] font-medium mt-5 text-[#101828]">
                      I had an amazing experience with this company. The service
                      was top-notch, and the staff was incredibly friendly. I
                      highly recommend them!
                    </div>
                    <div className="mt-5">
                      <div className="testimonials-name text-[16px] leading-4 font-bold py-5">
                        John Smith
                      </div>
                      <Rate
                        style={{ color: '#dcbb87' }}
                        value={5}
                        disabled={true}
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="mb-20">
                  <div className="testimonials pt-[10px] text-center">
                    <div className="testimonials_img rounded-full">
                      <img src="img/img-ava.png" alt="" />
                    </div>
                    <div className="text-[18px] font-semibold text-[#dcbb87] mt-[30px]">
                      Good Service!
                    </div>
                    <div className="testimonials-content text-[20px] font-medium mt-5 text-[#101828]">
                      I had an amazing experience with this company. The service
                      was top-notch, and the staff was incredibly friendly. I
                      highly recommend them!
                    </div>
                    <div className="mt-5">
                      <div className="testimonials-name text-[16px] leading-4 font-bold py-5">
                        Jonny Dang
                      </div>
                      <Rate
                        style={{ color: '#dcbb87' }}
                        value={4}
                        disabled={true}
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="mb-20">
                  <div className="testimonials pt-[10px] text-center">
                    <div className="testimonials_img rounded-full">
                      <img src="/img/img-ava.png" alt="" />
                    </div>
                    <div className="text-[18px] font-semibold text-[#dcbb87] mt-[30px]">
                      Awesome Service!
                    </div>
                    <div className="testimonials-content text-[20px] font-medium mt-5 text-[#101828]">
                      I had an amazing experience with this company. The service
                      was top-notch, and the staff was incredibly friendly. I
                      highly recommend them!
                    </div>
                    <div className="mt-5">
                      <div className="testimonials-name text-[16px] leading-4 font-bold py-5">
                        David Williams
                      </div>
                      <Rate
                        style={{ color: '#dcbb87' }}
                        value={3}
                        disabled={true}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
