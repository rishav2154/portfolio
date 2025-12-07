import React from 'react';
import Spline from '@splinetool/react-spline';

const SplineWallpaper: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Spline
        scene="https://prod.spline.design/3Tdg-Lw9ne7SMr5n/scene.splinecode"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        }}
      />
    </div>
  );
};

export default SplineWallpaper;
