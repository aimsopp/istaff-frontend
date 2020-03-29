import React, { Component } from 'react';
import axios from 'axios';

export default class CreateAccount extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            middleName: '',
            dob: '',
            hireDate: '',
            userId: '',
            password: '',
            email: '',
            idcomp: localStorage.getItem('idcomp'),
            manager: '0',
            jwt: localStorage.getItem('jwt')
        }
    }
    //THIS ASSIGNS TRUE OR FALSE FOR THE MANAGER CHECKBOX
    handleCheck = e => {
        if (this.state.manager === '0') {
            this.setState({ manager: '1' })
        } else {
            this.setState({ manager: '0' })
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault();
        //console.log(this.state);
        axios.post('/api/users/signup', this.state)
            .then(response => {
                //console.log(response)
                this.setState({
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    dob: '',
                    hireDate: '',
                    userId: '',
                    password: '',
                    email: '',
                    idcomp: localStorage.getItem('idcomp'),
                    manager: '0',
                    jwt: localStorage.getItem('jwt')
                })

                //document.getElementById('list').innerHTML = <EmployeeList />;
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { firstName, lastName, middleName, dob, hireDate, userId, password, email, idcomp } = this.state
        return (
            
            <div className="App">
                
                {/* <h3>Create Employee Account</h3> */}
                <div className="input-group input-group-md mb-8 col-12">
                    <form className="form" onSubmit={this.submitHandler} method="user">
                        <div className="row">
                            <div className="col-4">
                                <label>First Name</label><input className="form-control" type='text' name='firstName' value={firstName} onChange={this.changeHandler} placeholder='First Name' />
                            </div>
                            <div className="col-4">
                               <label>Last Name</label><input className="form-control" type='text' name='lastName' value={lastName} onChange={this.changeHandler} placeholder='Last Name' />
                            </div>
                            <div className="col-4">
                                <label>Middle Name</label><input className="form-control" type='text' name='middleName' value={middleName} onChange={this.changeHandler} placeholder='Middle Name' />
                            </div>
                        </div>
                        <div className="row">
                            <div classname="col-4">
                                <label>DOB</label><input className="form-control" aria-label="Date of Birth" type='date' name='dob' value={dob} onChange={this.changeHandler} placeholder='Date of Birth' />
                            </div>
                            <div className="col-4">
                                <label>Hire Date</label><input className="form-control" type='date' name='hireDate' value={hireDate} onChange={this.changeHandler} placeholder='Hire Date' />
                            </div>
                            <div className="col-4">
                                <label>UserId</label><input className="form-control" type='text' name='userId' value={userId} onChange={this.changeHandler} placeholder='UserID' />
                            </div>
                        </div>
                        <div className="row">
                            <div class="col-6">
                                <label>Password</label><input className="form-control" type='password' name='password' value={password} onChange={this.changeHandler} placeholder='Password' />
                            </div>
                            <div class="col-6">
                                <label>Email</label><input className="form-control" type='email' name='email' value={email} onChange={this.changeHandler} placeholder='Email' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <label>CompanyID</label><input className="form-control" id="idcomp" type='number' name='idcomp' value={idcomp} onChange={this.changeHandler} readOnly />
                            </div>
                            <div className="col-2">
                                <label>Manager:</label><input className="form-control" type='checkbox' name='manager' onChange={this.handleCheck} />
                            </div>
                            <div className="col-12">
                                <button className="form-control btn btn-primary" type='submit'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
                
            </div>
        );
    }
}