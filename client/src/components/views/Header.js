import React from 'react';

export default () => {
  return (
    <div className="header">
      <div className="container text-center">
        <div className="logo">
          <a href="/">
            <img src="/img/logo.png" alt="React Store" />
          </a>
        </div>
        <div className="header-text">
          <h1>
            <span>Super</span> <span>Shopping</span>
          </h1>
          <p>
            Enjoy the fast shopping cart experience with React, Redux & Node.js.
          </p>
        </div>
      </div>
    </div>
  );
};
