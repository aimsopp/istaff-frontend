import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: ''
        };
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        //console.log(this.state)
        axios.post("/api/users/emps", this.state)
            .then(response => {
                //console.log(response);
            })
    }

    render() {
        const { password, email } = this.state
        return (
            <div className="App">
                <h1>Password Reset</h1>
                
                    <form onSubmit={this.handleSubmit}>
                        <div class="row">
                        <input class="form-control col-lg-2 col-md-3 col-sm-4" type="text" name="email" placeholder="Email" value={email} onChange={this.handleChange} required /><br/>
                        <input class="form-control col-lg-2 col-md-3 col-sm-4" type="password" name="password" placeholder="New Password" value={password} onChange={this.handleChange} required />
                        <br />
                        <button class="btn btn-primary col-lg-2 col-md-3 col-sm-4" type="submit"> Submit </button>
                        </div>
                        <Link to='/'>Back to Login</Link>
                    </form>
                
            </div>
        );
    }
}