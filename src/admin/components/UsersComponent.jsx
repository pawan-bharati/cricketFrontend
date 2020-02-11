import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

class UsersComponent extends Component {
	state = {
		users: []
	};
	componentDidMount() {
		axios.get("http://localhost:4000/register/users").then(response => {
			console.log(response.data);
			this.setState({
				users: response.data
			});
		});
	}
	deleteuser = userid => {
		var x = confirm("Are you sure you want to delete?"); //eslint-disable-line
		if (x) {
			axios.delete("http://localhost:4000/register/deleteuser/" + userid);
			location.reload(); //eslint-disable-line
		} else {
			return false;
		}
	};

	render() {
		const mydata = this.state.users.map(users => {
			return (
				<tr>
					<td>{users.fname}</td>
					<td>{users.lname}</td>
					<td>{users.address}</td>
					<td>{users.email}</td>
					<td>{users.phone}</td>
					<td>
						<a>
							<Button className="btn btn-danger" onClick={() => this.deleteuser(users._id)}>Delete</Button>
						</a>
					</td>
				</tr>
			);
		});
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12"><br/>
						<div class="table-responsive">
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>First Name</th>
										<th>Last Name</th>
										<th>Address</th>
										<th>Email</th>
										<th>Phone</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody>{mydata}</tbody>
							</Table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default UsersComponent;
