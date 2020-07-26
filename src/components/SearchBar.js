import React from 'react';

function SearchBar () {

    const formStyle = {
        backgroundColor: "grey",
        color: "white",
        fontSize: "30px",
        padding: "10px",
        textAlign: "center",
    }

    const btnStyle = {
        height: "50px",
        width: "150px",
        backgroundColor: "black",
        color: "white",
        fontSize: "30px",
    }

    const editStyle = {
        height: "40px",
        marginLeft: "10px",
        marginRight: "10px",
        width: "500px",
        fontSize: "30px",
    }

    function btnClick (e) {
        e.preventDefault();
    }

    return (
        <form style={formStyle}>
  <label>
    Search For Title:
    <input style={editStyle} type="text" name="title" />
  </label>
  <input onClick={btnClick} style={btnStyle} type="submit" value="Search" />
</form>
    );
}

export default SearchBar;