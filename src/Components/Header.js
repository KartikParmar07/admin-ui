import React from "react";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="https://seeklogo.com/images/R/react-logo-7B3CE81517-seeklogo.com.png"
              alt=""
              width="35"
              height="30"
              className="d-inline-block align-text-top"
            />
            <div>ReactApp</div>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
