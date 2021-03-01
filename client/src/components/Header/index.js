import React from 'react';

function Header(props) {
    return (
        <div>
            <nav className="navbar fixed-top navbar-light bg-light">
                <a className="navbar-brand" href="#">
                <img src="https://picsum.photos/200" width="30" height="30" className="d-inline-block align-top" alt="" />
                </a>
                <h1 className="text-center mr-2">{props.title}</h1>
            </nav>
        </div>
    )
}

export default Header;