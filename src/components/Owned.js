import React, { Component } from 'react'

const ownedStyle = {
    backgroundColor: 'black',
    color: 'white',
}

const headerStyle = {
    backgroundColor: '#383838',
    color: 'white',
    padding: '5px',
}

const imgStyle = {
    display: 'block',
    height: '200px',
    width: 'auto',
    padding: '10px',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: '2px',
}

export class Owned extends Component {
    render() {
        return (
            <div style={ownedStyle}>
                <div style={headerStyle}>{this.props.title}</div>
                <div padding='5px'><img style={imgStyle} src={this.props.image}></img></div>
            </div>
        )
    }
}

export default Owned
