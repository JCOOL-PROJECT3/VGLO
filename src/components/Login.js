import React, { Component } from 'react';
import SearchBar from './SearchBar';

const formStyle = {
    textAlign: 'center',
    backgroundColor: 'grey',
    color: 'white',
    padding: '5px',
    borderStyle: 'solid',
    borderColor: '#383838',
    borderWidth: '3px',
}

const lblStyle = {
    padding: '5px',

}

const btnStyle = {
    marginLeft: '5px',
}

const errorStyle = {
    color: 'orange',
    fontStyle: 'italic',
    marginLeft: '5px',
}

const vlStyle = {
    position: 'absolute',
    right: '10px',
}

const selectStyle = {
    width: '150px',
    height: '20px',

}

class Login extends Component {

    constructor(props) {
        super(props);
        this.searchElement = React.createRef();
    }

    state = {

        user: '',
        pass: '',
        loggedIn: false,
        error: '',
        authUser: '',
        platforms: null,
        currentLibrary: '',
        collectionData: [],
        mode: false,
        registerMode: false,
        regVerifyField: '',

    }

    userChange = (e) => {
        this.setState({ user: e.target.value });
    }

    passChange = (e) => {
        this.setState({ pass: e.target.value });
    }

    selectPlatform = (e) => {
        this.setState({mode: true});
        this.searchElement.current.changeMode(false);
        this.setState({currentLibrary: e.target.value});

        let queryData = {
            user: this.state.authUser,
            platform: this.state.currentLibrary
        }

        fetch('api/view', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(queryData),
        })
            .then(response => response.json())
            .then(data => {
                this.setState({collectionData: []});
                let empty = [];
                let filtered = data.filter(e => {
                    return e.platform === this.state.currentLibrary;
                });

                filtered.map(e => {
                    empty.push(e);
                    
                });

                this.setState({collectionData: empty});
                
                
            })
            .catch((error) => {
                console.error(error);
            });
    }

    updateMode = (mode) => {
        this.setState({mode: mode});
    }

    btnRegister = (e) => {
        this.setState({registerMode: true});
    }

    verifyChange = (e) => {
        this.setState({regVerifyField: e.target.value});
    }

    regUser = (e) => {
        e.preventDefault();
        if (this.state.pass != this.state.regVerifyField) {
            this.setState({error: 'Passwords do not match'});
            return;
        }

        let data = {
            user: this.state.user,
            pass: this.state.pass,
        }

        fetch('auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    this.setState({registerMode: false});
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    cancelReg = (e) => {
        this.setState({registerMode: false});
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
                this.setState({ error: data.error });
                if (data.status === 'OK') {
                    this.setState({ loggedIn: true, authUser: this.state.user, platforms: data.platforms, currentLibrary: data.platforms[0] });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    render() {
        if (this.state.registerMode) {
            return (
                <div>
                <form style={formStyle}>
                    <label style={lblStyle}>Username</label>
                    <input onChange={this.userChange} type="text"></input>
                    <label style={lblStyle}>Password</label>
                    <input onChange={this.passChange} type="password"></input>
                    <label style={lblStyle}>Re-enter Password</label>
                    <input onChange={this.verifyChange} type="password"></input>
                    <button onClick={this.regUser} style={btnStyle}>Submit</button>
                    <button onClick={this.cancelReg} style={btnStyle}>Cancel</button>
                    <label style={errorStyle}>{this.state.error}</label>
                </form>
                <SearchBar ref={this.searchElement} updateMode={this.updateMode} viewCollectionMode={this.state.mode} collection={this.state.collectionData} />
                </div>
            )
        }

        if (!this.state.loggedIn) {
            return (
                <div>
                <form style={formStyle}>
                    <label style={lblStyle}>Username</label>
                    <input onChange={this.userChange} type="text"></input>
                    <label style={lblStyle}>Password</label>
                    <input onChange={this.passChange} type="password"></input>
                    <button onClick={this.btnLogin} style={btnStyle}>Login</button>
                    <button onClick={this.btnRegister} style={btnStyle}>Register</button>
                    <label style={errorStyle}>{this.state.error}</label>
                </form>
                <SearchBar ref={this.searchElement} updateMode={this.updateMode} viewCollectionMode={this.state.mode} collection={this.state.collectionData} />
                </div>

            );
        } else {
            
            return (
                <div>
                <form style={formStyle}><label>Welcome back,  {this.state.user}!</label><span style={vlStyle}><label style={lblStyle}>View Games</label><select onClick={this.selectPlatform} style={selectStyle}>
                    {this.state.platforms.map(item => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>
                </span>
                </form>
                <SearchBar ref={this.searchElement} updateMode={this.updateMode} viewCollectionMode={this.state.mode} collection={this.state.collectionData} authUser = {this.state.authUser} />
                </div>
                
            )
        }
    }
}

export default Login;