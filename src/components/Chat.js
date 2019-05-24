import React from "react";
import {withRouter} from 'react-router-dom';
import io from "socket.io-client";

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: this.props.match.params.userName,
            message: '',
            messages: [],
            users: ''
        };

        this.socket = io('localhost:8080');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        this.socket.on('NewConnect', function (login,numbUsers){
            console.log(login);
            console.log(numbUsers + ' utilisateurs connectés');
            addnumbusers(numbUsers);
        });

        this.socket.on('Disconnect', function (logout,numbUsers){
            console.log(logout);
            console.log(numbUsers + ' utilisateurs connectés');
            addnumbusers(numbUsers);
        });

        const addnumbusers = numbUsers => {
            this.setState({users: numbUsers});
        }

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            this.setState({message: ''});
        }}

        nextPath(path) {
            this.props.history.push(path);
          }

    render(){
        let userName = this.props.match.params.userName;
        
        console.log(userName);
        return (
            <div className="container">
                <div className="header">
                <h1>Welcome {userName}</h1>
                </div>
                
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <p> {this.state.users} users connected</p>
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr/>
                                <div className="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                                <input type="text" placeholder="Your message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Chat);
