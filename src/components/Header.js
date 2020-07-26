import React from 'react';

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

    return (
        <div style={headerStyle}>Video Game Library Organizer<p style={stStyle}>Powered by RAWG.io</p></div>
    );
}

export default Header;