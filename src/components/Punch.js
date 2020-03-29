import React, { Component } from 'react';
import axios from 'axios';

export default class Punch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            punch: localStorage.getItem('punch'),
            idemp: localStorage.getItem('idemp'),
            jwt: localStorage.getItem('jwt')
            
        }


    }
    //THIS ASSIGNS TRUE OR FALSE FOR THE MANAGER CHECKBOX
    handleCheck = e => {
        if (this.state.punch === false) {
            this.setState({ punch: true })
            localStorage.setItem('punch', this.state.punch)
        } else {
            this.setState({ punch: false })
            localStorage.setItem('punch', this.state.punch)
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        if (this.state.punch === false) {
            e.preventDefault();
            let data = { ...this.state, clock_in: new Date(), idtime_punch: localStorage.getItem('idtime_punch')}
            axios.post('/api/users/punch', data)
                .then(response => {
                    document.getElementById('punch').innerHTML = 'Clock Out'; //Change to JSX create Element?
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            e.preventDefault();
            let data = { ...this.state, clock_out: new Date(), idtime_punch: localStorage.getItem('idtime_punch')}
            axios.post('/api/users/punch', data)
                .then(response => {
                    localStorage.setItem('idtime_punch', response.data.idtime_punch);
                    //FRONTEND CONSOLE LOG
                    //console.log('FRONTEND CONSOLE LOG')
                    //console.log(data)
                    //BACKEND RESPONSE
                    //console.log(response)
                    document.getElementById('punch').innerHTML = 'Clock In';
                })
                .catch(error => {
                    console.log(error)
                })
        }



    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.submitHandler} method="user" className="right">
                    <button class="btn btn-primary col-4" id="punch" type='submit' onClick={this.handleCheck} >Clock In</button>
                </form>
            </div>
        );
    }
}

//export default CreateAccount;