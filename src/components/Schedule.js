import React, { Component } from 'react';
import axios from "axios";

export default class Schedule extends Component {
    constructor(props) {
        super(props);

        console.log('Schedule List is Active');

        this.state = {
            jwt: localStorage.getItem('jwt'),
            //week_start: '',
            idschedules: [],
            //idemp: localStorage.getItem('idemp')
        };
    }

    componentDidMount(idemp) {
        let data = { ...this.state, idemp: localStorage.getItem('idemp') }
        //console.log(data)
        axios.post('/api/users/schedules', data)
            .then(res => {
                var moment = require('moment');
                res.data.idschedules.forEach(function (obj) {
                    if (obj.week_start !== null) {
                        obj.week_start = moment.utc(obj.week_start, "YYYY-MM-DDTHH:mm").format(' YYYY-MM-DD')
                    } else {
                        obj.week_start = 'Err - This should not be here!'
                    }
                    if (obj.mon_start !== null) {
                        obj.mon_start = moment.utc(obj.mon_start, "HH:mm").format(' h:mma')
                        //console.log(obj.mon_start)
                    } else {
                        obj.mon_start = 'N/A';
                    }
                    if (obj.mon_end !== null) {
                        obj.mon_end = moment.utc(obj.mon_end, "HH:mm").format(' h:mma')
                        //console.log(obj.mon_start)
                    } else {
                        obj.mon_end = 'N/A';
                    }
                    if (obj.tue_start !== null) {
                        obj.tue_start = moment.utc(obj.tue_start, "HH:mm").format(' h:mma')
                        //console.log(obj.tue_start)
                    } else {
                        obj.tue_start = 'N/A';
                    }
                    if (obj.tue_end !== null) {
                        obj.tue_end = moment.utc(obj.tue_end, "HH:mm").format(' h:mma')
                        //console.log(obj.mon_start)
                    } else {
                        obj.tue_end = 'N/A';
                    }
                    if (obj.wen_start !== null) {
                        obj.wen_start = moment.utc(obj.wen_start, "HH:mm").format(' h:mma')
                        //console.log(obj.tue_start)
                    } else {
                        obj.wen_start = 'N/A';
                    }
                    if (obj.wen_end !== null) {
                        obj.wen_end = moment.utc(obj.wen_end, "HH:mm").format(' h:mma')
                        //console.log(obj.mon_start)
                    } else {
                        obj.wen_end = 'N/A';
                    }
                    if (obj.thu_start !== null) {
                        obj.thu_start = moment.utc(obj.thu_start, "HH:mm").format(' h:mma')
                        //console.log(obj.tue_start)
                    } else {
                        obj.thu_start = 'N/A';
                    }
                    if (obj.thu_end !== null) {
                        obj.thu_end = moment.utc(obj.thu_end, "HH:mm").format(' h:mma')
                        //console.log(obj.mon_start)
                    } else {
                        obj.thu_end = 'N/A';
                    }
                    if (obj.fri_start !== null) {
                        obj.fri_start = moment.utc(obj.fri_start, "HH:mm").format(' h:mma')
                        //console.log(obj.tue_start)
                    } else {
                        obj.fri_start = 'N/A';
                    }
                    if (obj.fri_end !== null) {
                        obj.fri_end = moment.utc(obj.fri_end, "HH:mm").format(' h:mma')
                        //console.log(obj.mon_start)
                    } else {
                        obj.fri_end = 'N/A';
                    }
                    if (obj.sat_start !== null) {
                        obj.sat_start = moment.utc(obj.sat_start, "HH:mm").format(' h:mma')
                        //console.log(obj.tue_start)
                    } else {
                        obj.sat_start = 'N/A';
                    }
                    if (obj.sat_end !== null) {
                        obj.sat_end = moment.utc(obj.sat_end, "HH:mm").format(' h:mma')
                        //console.log(obj.mon_start)
                    } else {
                        obj.sat_end = 'N/A';
                    }
                    if (obj.sun_start !== null) {
                        obj.sun_start = moment.utc(obj.sun_start, "HH:mm").format(' h:mma')
                        //console.log(obj.tue_start)
                    } else {
                        obj.sun_start = 'N/A';
                    }
                    if (obj.sun_end !== null) {
                        obj.sun_end = moment.utc(obj.sun_end, "HH:mm").format(' h:mma')
                        //console.log(obj.mon_start)
                    } else {
                        obj.sun_end = 'N/A';
                    }
                });
                this.setState({ idschedules: res.data.idschedules });
                //console.log(res.data.idschedules)
            });
    }

    render() {
        return (
            <div>
                <h1>Schedules</h1>
                <p>{this.state.week_start} </p>
                <ul>
                    {this.state.idschedules.map((idschedules) => {
                        return (
                            <div key={idschedules}>
                                <table id="schtable" class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th colspan='8'>{idschedules.week_start}</th>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Monday</th>
                                            <th scope="col">Tuesday</th>
                                            <th scope="col">Wednesday</th>
                                            <th scope="col">Thursday</th>
                                            <th scope="col">Friday</th>
                                            <th scope="col">Saturday</th>
                                            <th scope="col">Sunday</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Start</th>
                                            <td>{idschedules.mon_start}</td>
                                            <td>{idschedules.tue_start}</td>
                                            <td>{idschedules.wen_start}</td>
                                            <td>{idschedules.thu_start}</td>
                                            <td>{idschedules.fri_start}</td>
                                            <td>{idschedules.sat_start}</td>
                                            <td>{idschedules.sun_start}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">End</th>
                                            <td>{idschedules.mon_end}</td>
                                            <td>{idschedules.tue_end}</td>
                                            <td>{idschedules.wen_end}</td>
                                            <td>{idschedules.thu_end}</td>
                                            <td>{idschedules.fri_end}</td>
                                            <td>{idschedules.sat_end}</td>
                                            <td>{idschedules.sun_end}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                    })}
                </ul>
            </div>
        );
    }
}