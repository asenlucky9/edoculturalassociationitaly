import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../animations/loading.json';
import welcomeAnimation from '../animations/welcome.json';
import culturalAnimation from '../animations/cultural.json';
import successAnimation from '../animations/success.json';

export const LoadingAnimation = () => (
  <div className="lottie-container loading">
    <Lottie
      animationData={loadingAnimation}
      loop={true}
      autoplay={true}
      style={{ width: 200, height: 200 }}
    />
  </div>
);

export const WelcomeAnimation = () => (
  <div className="lottie-container welcome">
    <Lottie
      animationData={welcomeAnimation}
      loop={true}
      autoplay={true}
      style={{ width: 400, height: 400 }}
    />
  </div>
);

export const CulturalAnimation = () => (
  <div className="lottie-container cultural">
    <Lottie
      animationData={culturalAnimation}
      loop={true}
      autoplay={true}
      style={{ width: 300, height: 300 }}
    />
  </div>
);

export const SuccessAnimation = () => (
  <div className="lottie-container success">
    <Lottie
      animationData={successAnimation}
      loop={false}
      autoplay={true}
      style={{ width: 150, height: 150 }}
    />
  </div>
); 