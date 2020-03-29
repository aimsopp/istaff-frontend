import React, { Component } from 'react';
import axios from 'axios';

export default class CreateSchedule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idschedules: '',
            idemp: this.props.idemp,
            week_start: '',
            mon_start: null,
            mon_end: null,
            tue_start: null,
            tue_end: null,
            wen_start: null,
            wen_end: null,
            thu_start: null,
            thu_end: null,
            fri_start: null,
            fri_end: null,
            sat_start: null,
            sat_end: null,
            sun_start: null,
            sun_end: null,
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
        axios.post('/api/users/schedule', this.state)
            .then(response => {
                //console.log(response)
                this.setState({
                    idschedules: '',
                    idemp: this.props.idemp,
                    week_start: '',
                    mon_start: '',
                    mon_end: '',
                    tue_start: '',
                    wen_start: '',
                    wen_end: '',
                    thu_start: '',
                    thu_end: '',
                    fri_start: '',
                    fri_end: '',
                    sat_start: '',
                    sat_end: '',
                    sun_start: '',
                    sun_end: ''
                })

                //document.getElementById('list').innerHTML = <EmployeeList />;
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { week_start, mon_start, mon_end, tue_start, tue_end, wen_start, wen_end, thu_start, thu_end, fri_start, fri_end, sat_start, sat_end, sun_start, sun_end } = this.state
        return (

            <div className="App">

                {/* <h3>Create Employee Account</h3> */}
                <div className="input-group input-group-md mb-8 col-12">
                    <form className="form-control" onSubmit={this.submitHandler} method="user" className="right">
                        <div className="row">
                            <div className="col-12">
                                <label>Week Start</label><input className="form-control" type='date' name='week_start' value={week_start} onChange={this.changeHandler} placeholder='Week Start' />
                            </div>
                        </div>
                        <div className="row">
                            <div class="col-6">
                                <label>Monday Start</label><input className="form-control" type='time' name='mon_start' value={mon_start} onChange={this.changeHandler} placeholder='Monday Start' />
                            </div>
                            <div className="col-6">
                                <label>Monday End</label><input className="form-control" type='time' name='mon_end' value={mon_end} onChange={this.changeHandler} placeholder='Monday End' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>Tuesday Start</label><input className="form-control"  type='time' name='tue_start' value={tue_start} onChange={this.changeHandler} placeholder='Tuesday Start' />
                            </div>
                            <div className="col-6">
                                <label>Tuesday End</label><input className="form-control" type='time' name='tue_end' value={tue_end} onChange={this.changeHandler} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>Wednesday Start</label><input className="form-control" type='time' name='wen_start' value={wen_start} onChange={this.changeHandler} placeholder='UserID' />
                            </div>
                            <div className="col-6">
                                <label>Wednesday End</label><input className="form-control" type='time' name='wen_end' value={wen_end} onChange={this.changeHandler} placeholder='Password' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>Thursday Start</label><input className="form-control" type='time' name='thu_start' value={thu_start} onChange={this.changeHandler} placeholder='Email' />
                            </div>
                            <div className="col-6">
                                <label>Thursday End</label><input className="form-control"  type='time' name='thu_end' value={thu_end} onChange={this.changeHandler} placeholder='Thursday End' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>Friday Start</label><input className="form-control"  type='time' name='fri_start' value={fri_start} onChange={this.changeHandler} placeholder='Date of Birth' />
                            </div>
                            <div className="col-6">
                                <label>Friday End</label><input className="form-control" type='time' name='fri_end' value={fri_end} onChange={this.changeHandler} placeholder='Hire Date' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>Satruarday Start </label><input className="form-control" type='time' name='sat_start' value={sat_start} onChange={this.changeHandler} placeholder='UserID' />
                            </div>
                            <div className="col-6">
                                <label>Satruarday End</label><input className="form-control" type='time' name='sat_end' value={sat_end} onChange={this.changeHandler} placeholder='Password' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>Sunday Start</label><input className="form-control" type='time' name='sun_start' value={sun_start} onChange={this.changeHandler} placeholder='Email' />
                            </div>
                            <div className="col-6">
                                <label>Sunday End</label><input className="form-control" type='time' name='sun_end' value={sun_end} onChange={this.changeHandler} />
                            </div>
                        </div><br/>
                        <div className="row">
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