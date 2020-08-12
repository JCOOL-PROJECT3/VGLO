import React from 'react';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import Login from './Login';

function Header() {
    const headerStyle = {
        backgroundColor: "#383838",
        color: "white",
        fontSize: "50px",
        textAlign: "center",
        padding: "10px"
    }

    const stStyle={
        fontSize: "20px",
    }

    const linkStyle = {
        color: "white",
    }

    return (
        <div style={headerStyle}>Video Game Library Organizer<p style={stStyle}>Powered by <a target="_blank" style={linkStyle} href="http://rawg.io">RAWG.io</a></p></div>
    );
}

export default Header;