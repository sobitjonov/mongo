import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getEmployees, deleteEmployee } from "../../actions/employees";

export class Employee extends Component {
  static propTypes = {
    employees: PropTypes.array.isRequired,
    getEmployees: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getEmployees();
  }

  onChange = e =>
    this.setState({
      employees: this.props.getEmployees(null, null, e.target.value)
    });

  sortBy(key) {
    this.setState({
      employees: this.props.getEmployees(key, null, null)
    });
  }

  render() {
    return (
      <Fragment>
        <h2 className="text-center">List of Employee</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th
                className="text-primary"
                onClick={() => this.sortBy("username")}
              >
                <a href="#">Username</a>
              </th>
              <th
                className="text-primary"
                onClick={() => this.sortBy("firstname")}
              >
                <a href="#">Firstname</a>
              </th>
              <th>
                <input
                  className="form-control"
                  type="text"
                  name="stroka"
                  placeholder="Find by Last name"
                  onChange={this.onChange}
                />
                Lastname
              </th>
              <th>Email</th>
              <th>Dob</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Ethnics</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Job</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.username}</td>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.email}</td>
                <td>{employee.dateofbirth}</td>
                <td>{employee.address}</td>
                <td>{employee.salary}</td>
                <td>{employee.ethnics}</td>
                <td>{employee.phone}</td>
                <td>{employee.gender}</td>
                <td>{employee.departmentname}</td>
                <td>{employee.jobname}</td>
                <td>
                  <button
                    onClick={this.props.deleteEmployee.bind(this, employee.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  employees: state.employees.employees
});

export default connect(
  mapStateToProps,
  { getEmployees, deleteEmployee }
)(Employee);
