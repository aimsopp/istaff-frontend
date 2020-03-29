import React, { Component } from 'react';
import axios from "axios";
import UpdateAccount from "./UpdateAccount";
import CreateSchedule from "./CreateSchedule";
import $ from 'jquery';

export default class EmployeeList extends Component {
    constructor(props) {
        super(props);

        //console.log('Employee List is active');

        this.state = {
            jwt: localStorage.getItem('jwt'),
            users: []
        };

        this.handleDelete = this.handleDelete.bind(this);
        //this.handleCheck = this.handleCheck.bind(this);
    }
    
    componentDidMount() {
        let data = { ...this.state, idcomp: localStorage.getItem('idcomp') }
        axios.post('/api/users', data)
            .then(res => {
                //console.log(res.data)
                const users = res.data.map(obj => ({
                    idemp: obj.idemp,
                    firstName: obj.firstName,
                    lastName: obj.lastName,
                    middleName: obj.middleName,
                    dob: obj.dob,
                    hireDate: obj.hireDate,
                    userId: obj.userId,
                    email: obj.email,
                    password: obj.password,
                    manager: obj.manager,
                    active: obj.active,
                    week_start: obj.week_start,
                    mon_start: obj.mon_start,
                    mon_end: obj.mon_end,
                    tue_start: obj.tue_start,
                    tue_end: obj.tue_end,
                    wen_start: obj.wen_start,
                    wen_end: obj.wen_end,
                    thu_start: obj.thu_start,
                    thu_end: obj.thu_end,
                    fri_start: obj.fri_start,
                    fri_end: obj.fri_end,
                    sat_start: obj.sat_start,
                    sat_end: obj.sat_end,
                    sun_start: obj.sun_start,
                    sun_end: obj.sun_end,
                }));
                this.setState({ users });
                // console.log(userdata);
                // const activedata = res.data.map(obj => ({active:'0'}));
                // this.setState({active:activedata})
                // console.log(activedata)
            });
    }

    handleDelete = (idemp) => {
        axios.delete(`/api/users/` + idemp)
            .then(res => {
                //console.log(res)
                //console.log('it works')
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    activateUser = (idemp) => {
        //console.log('Am I working?')
        //console.log(this.state.users);
        axios.post('/api/users/' + idemp, this.state)
            .then(res => {
                //console.log(res)
                this.setState({
                    active: '1'
                })
            })
    }
    submitHandler = (idemp) => {
        // e.preventDefault();
        //console.log(this.state);
        axios.post('/api/users/' + idemp, this.state.users)
            .then(response => {
                //console.log(response)

            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        $(document).ready(function () {
            $('a.dropdown-toggle').on("click", function (e) {
                $(this).closest('li').toggleClass('open');
                e.stopPropagation();
                e.preventDefault();
            });
        });
        return (
            <div>
                {/* <h1>Employee List</h1> */}
                <ul>
                    {this.state.users.map((user, index) => {
                        return (
                            <div key={index}>
                                <h3>{user.firstName} {user.lastName}</h3>
                                <div class="row">
                                    <div class="dropdown col-12">
                                        <button class="btn btn-success dropdown-toggle col-lg-2 col-md-3 col-sm-4" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Update Account
                                        </button>
                                        <div class="dropdown-menu dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <UpdateAccount idemp={user.idemp} firstName={user.firstName} lastName={user.lastName} middleName={user.middleName}
                                                dob={user.dob} hireDate={user.hireDate} userId={user.userId} email={user.email} manager={user.manager} password={user.password} active={user.active}
                                            />
                                        </div>
                                    </div><br /> <br />
                                    <div class="dropdown col-12">
                                        <button class="btn btn-secondary dropdown-toggle col-lg-2 col-md-3 col-sm-4" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Create Schedule
                                        </button>
                                        <div class="dropdown-menu dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <CreateSchedule idemp={user.idemp} />
                                        </div>
                                    </div>
                                </div><br />
                            </div>
                        )
                    })}
                </ul>
            </div>
        );
    }
}
