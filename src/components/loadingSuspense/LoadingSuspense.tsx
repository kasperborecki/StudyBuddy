import React, { FC, Suspense } from 'react';
import './loadingSuspense.css';

type LoadingSuspenseProps = {
  children: JSX.Element;
  isOpen?: boolean;
};

const LoadingSuspense: FC<LoadingSuspenseProps> = ({ children }) => (
  <Suspense
    fallback={
      <div className='loader-container'>
        <div className='loader' />
      </div>
    }
  >
    {children}
  </Suspense>
);

export default LoadingSuspense;
