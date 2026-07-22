import React from 'react';
import Lottie from 'lottie-react';
import LoadingAnimationFlyNext from '../../assets/animation/Animation-Loading-FlyNext.json';

const LoadingAnimation = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center fixed top-0 left-0 z-[9999999] bg-[#19232d] ">
      <Lottie
        style={{ width: '300px' }}
        animationData={LoadingAnimationFlyNext}
        loop={true}
      />
    </div>
  );
};

export default LoadingAnimation;
