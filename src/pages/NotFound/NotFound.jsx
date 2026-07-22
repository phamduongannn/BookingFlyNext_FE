import React from 'react';
import Lottie from 'lottie-react';
import NotFoundAnimation from './../../assets/animation/Animation-404.json';
import { useNavigate } from 'react-router-dom';
import { path } from '../../common/path';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col fixed top-0 left-0 z-[99] bg-[#ffffff] ">
      <Lottie
        style={{ width: '600px' }}
        animationData={NotFoundAnimation}
        loop={true}
        className="cursor-pointer"
        title="Back to Homepage"
        onClick={() => {
          navigate(path.homepage);
        }}
      />
      <h1
        className="font-bold text-[80px] text-[#dcbb87] z-[999] mb-20 animate-bounce hover:text-[#a08355] cursor-pointer"
        style={{ fontFamily: 'Playfair Display, sans-serif' }}
        title="Back to Homepage"
        onClick={() => {
          navigate(path.homepage);
        }}
      >
        Page Not Found
      </h1>
    </div>
  );
};

export default NotFound;
