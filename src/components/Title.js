import React from 'react';

const imgStyle = {
    display: 'block',
    height: '200px',
    width: 'auto',
    padding: '10px',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: '2px',
}

const titleStyle = {
    backgroundColor: 'black',
    color: 'white',
    margin: '10px',
    padding: '10px',
    fontSize: '20px',
}

const headerStyle = {
    backgroundColor: '#383838',
    padding: '5px',
    margin: '5px',
    display: 'flex',
    justifyContent: 'space-between',
}

const selectStyle = {
    width: '200px',
    height: '25px',
    position: 'absolute',
    right: '175px',
}

const labelStyle = {
    position: 'absolute',
    width: '100px',
    height: '25px',
    right: '375px'
}

class Title extends React.Component {
    state = {  }

    btnClick = (e) => {
        e.preventDefault();
        this.props.platforms.forEach((e) => {console.log(e.platform.name)});
    }
    render() {
        return (

            <div style={titleStyle}>
                <div style={headerStyle}>{this.props.name}<label style={labelStyle}>Platform:</label><select style={selectStyle}></select><button onClick={this.btnClick}>Add to Collection</button></div>
                <img style={imgStyle} src={this.props.image}></img>
            </div>
            
        );
    }
}

export default Title;