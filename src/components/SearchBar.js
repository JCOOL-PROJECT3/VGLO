import React, { Component } from 'react';
import Title from './Title';
import Login from './Login';
import {Container, Row, Col} from 'react-bootstrap';
import Owned from './Owned';

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



class SearchBar extends Component {

   

    state = {
        myValue: '',
        dataArray: [],
        mode: false,
    }

    btnClick = (e) => {
        e.preventDefault();
        this.setState({ mode: true });
        this.props.updateMode(false);

        const data = { searchFor: this.state.myValue };


        fetch('api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ dataArray: data.results });
                console.log(data.results);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    handleChange = (e) => this.setState({
        myValue: e.target.value,
    });

    changeMode = (mode) => {
        this.setState({mode: mode});
    }

    renderSearch = () => {
        
        if (this.state.dataArray.length > 0) {
                return this.state.dataArray.map((data) =>
                    <Title authUser={this.props.authUser} image={data.background_image} name={data.name} platforms={data.platforms} />
                )
            }
        }

    renderCollection = () => {
        
        return this.props.collection.map((data) =>
            <Owned title={data.title} image={data.image} />
        )

    }

    renderView = () => {
        console.log(`'search: ${this.state.mode} collection: ${this.props.viewCollectionMode}`);
}

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
                {this.props.viewCollectionMode ? this.renderCollection() : this.renderSearch()}
                
                
            </div>
        );



    }


}

export default SearchBar;