import React from 'react';
import "../Styles/header.css"

const Header = ({name, content}) => {
  return (
    <div className={name}>
      <p>{content}</p>
    </div>
  );
};

export default Header;