import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

export class Register extends Component {
  state = {
    username: "",
    firstname: "",
    lastname: "",
    dateofbirth: "",
    address: "",
    salary: "",
    ethnics: "",
    phone: "",
    department: "",
    job: "",
    gender: "",
    email: "",
    password: "",
    password2: "",
    jobs: [],
    departments: []
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    fetch("api/job")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          jobs: data
        });
      });
    fetch("api/department")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          departments: data
        });
      });
  }

  onSubmit = e => {
    e.preventDefault();
    const {
      username,
      firstname,
      lastname,
      dateofbirth,
      address,
      salary,
      ethnics,
      phone,
      department,
      job,
      gender,
      email,
      password,
      password2
    } = this.state;

    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } else {
      const newUser = {
        username,
        firstname,
        lastname,
        dateofbirth,
        address,
        salary,
        ethnics,
        phone,
        department,
        job,
        gender,
        email,
        password
      };
      this.props.register(newUser);
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    let jobs = this.state.jobs.map(item => (
      <option value={item.id} key={item.id}>
        {item.jobname}
      </option>
    ));
    let departments = this.state.departments.map(item => (
      <option value={item.id} key={item.id}>
        {item.departmentname}
      </option>
    ));

    const {
      username,
      firstname,
      lastname,
      dateofbirth,
      address,
      salary,
      ethnics,
      phone,
      department,
      job,
      gender,
      email,
      password,
      password2
    } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                className="form-control"
                type="text"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Firstname</label>
              <input
                className="form-control"
                type="text"
                name="firstname"
                onChange={this.onChange}
                value={firstname}
              />
            </div>
            <div className="form-group">
              <label>Lastname</label>
              <input
                className="form-control"
                type="text"
                name="lastname"
                onChange={this.onChange}
                value={lastname}
              />
            </div>
            <div className="form-group">
              <label>Date of birth</label>
              <input
                className="form-control"
                type="date"
                name="dateofbirth"
                onChange={this.onChange}
                value={dateofbirth}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                className="form-control"
                type="text"
                name="address"
                onChange={this.onChange}
                value={address}
              />
            </div>
            <div className="form-group">
              <label>Salary</label>
              <input
                className="form-control"
                type="number"
                name="salary"
                onChange={this.onChange}
                value={salary}
              />
            </div>
            <div className="form-group">
              <label>Ethnics</label>
              <input
                className="form-control"
                type="text"
                name="ethnics"
                onChange={this.onChange}
                value={ethnics}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                className="form-control"
                type="text"
                name="phone"
                onChange={this.onChange}
                value={phone}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>Department</label>
              <select
                className="form-control"
                name="department"
                id="exampleFormControlSelect1"
                onChange={this.onChange}
                value={department}
              >
                <option>--Choose department--</option>
                {departments}
              </select>
            </div>
            <div className="form-group">
              <label>Job</label>
              <select
                className="form-control"
                name="job"
                id="exampleFormControlSelect1"
                onChange={this.onChange}
                value={job}
              >
                <option>--Choose job--</option>
                {jobs}
              </select>
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                className="form-control"
                name="gender"
                id="exampleFormControlSelect1"
                onChange={this.onChange}
                value={gender}
              >
                <option>--Choose gender--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { register, createMessage }
)(Register);
