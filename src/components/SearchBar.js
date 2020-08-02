import React from 'react';
import Title from './Title';
import View from './View';

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



class SearchBar extends React.Component {

    state = {
        myValue: '',
        dataArray: [],
    }

    btnClick = (e) => {
        e.preventDefault();

        const data = { searchFor: this.state.myValue };

        fetch('api/search', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ dataArray: data.results });
                data.results.forEach(e => {
                    console.log(e.name);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    handleChange = (e) => this.setState({
        myValue: e.target.value,
    });

    render() {

        return (
            <div>
            <form autoComplete="off" style={formStyle}>
                <label>
                    Search For Title:
        <input value={this.state.myValue} onChange={this.handleChange} style={editStyle} type="text" name="title" />
                </label>
                <input onClick={this.btnClick} style={btnStyle} type="submit" value="Search" />
            </form>
            <View gamesObj={this.state.dataArray} />
            </div>
        );
    }


}

export default SearchBar;