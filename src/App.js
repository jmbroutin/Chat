import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class App extends Component {
  
    state={
      username: ''
    }
    handleChange(event) {
      this.setState({username: event.target.value})
    console.log(this.state.username)}

    nextPath(path) {
      this.props.history.push(path);
    }
  
    render() {
      return (
        <div className="App">
       <header className="App-header">
         <h1>Welcome to the chat</h1>
         <p>Please enter your name</p>
           <input type="text" name="login" value={this.state.username} 
            onChange={this.handleChange.bind(this)}/>
           <button type="button" className="btn btn-primary" onClick={() =>{
              this.nextPath('/chat/' + this.state.username );
               }}>Enter</button>
       </header>
    </div>

      );
    }
  }
  
  export default withRouter(App);
