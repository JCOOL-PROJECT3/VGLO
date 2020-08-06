import React, { Component } from 'react';

const formStyle = {
    textAlign: 'center',
    backgroundColor: 'grey',
    color: 'white',
    padding: '5px',
}

const lblStyle = {
    padding: '5px',

}

const btnStyle = {
    marginLeft: '5px',
}

class Login extends Component {
    state = {

        user: '',
        pass: '',
        loggedIn: false

    }

    userChange = (e) => {
        this.setState({ user: e.target.value });
    }

    passChange = (e) => {
        this.setState({ pass: e.target.value });
    }

    btnLogin = (e) => {
        e.preventDefault();
        
        const data = { 
            username: this.state.user,
            password: this.state.pass
         };

        fetch('auth/login', {
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
    render() {
        if (!this.state.loggedIn) {
        return (
            <form style={formStyle}>
                <label style={lblStyle}>Username</label>
                <input onChange={this.userChange} type="text"></input>
                <label style={lblStyle}>Password</label>
                <input onChange={this.passChange} type="password"></input>
                <button onClick={this.btnLogin} style={btnStyle}>Login</button>
                <button style={btnStyle}>Register</button>
            </form>

        );
        } else {
            return (
                <div>User Logged In</div>
            )
        }
    }
}

export default Login;