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
    state = { 
        selectValue: this.props.platforms[0].platform.name,
     }

    selectChange = (e) => {

        this.setState({selectValue: e.target.value});
        
        
    }

    // add game to collection

    btnClick = (e) => {
        e.preventDefault();

        let data = {
            username: this.props.authUser,
            title: this.props.name,
            platform: this.state.selectValue,
            image: this.props.image,
            
        }

        fetch('api/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        
    }
    render() {
        return (

            <div style={titleStyle}>
                <div style={headerStyle}>{this.props.name}<label style={labelStyle}>Platform:</label>
                <select onChange={this.selectChange} style={selectStyle}>
      {this.props.platforms.map(item => (
        <option
          key={item.platform.name}
          value={item.platform.name}
        >
            {item.platform.name}
        </option>
      ))}
    </select>
                <button onClick={this.btnClick}>Add to Collection</button></div>
                <img style={imgStyle} src={this.props.image}></img>
            </div>
            
        );
    }
}

export default Title;