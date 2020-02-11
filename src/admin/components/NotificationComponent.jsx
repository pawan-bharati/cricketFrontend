import React, { Component } from "react";
import { Table, Button, Form } from "react-bootstrap";
import axios from "axios";

class NotificationComponent extends Component {
	state = {
		notifications: [],
		postedDate: "",
		endDate: "",
		title: "",
		description: ""
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	postnotification = e => {
		e.preventDefault();
		console.log(this.state);

		axios
			.post(
				"http://localhost:4000/notification/upload_notification",
				this.state
			)
			.then(response => {
				console.log(response.data);
				localStorage.setItem("token", response.data.token);
				this.setState({
					notifications: [],
					startDate: new Date(),
					postedDate: "",
					endDate: "",
					title: "",
					description: ""
				});
				alert("YESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
			})
			.catch(err => console.log(err));
			

		window.location.reload();
	};

	componentDidMount() {
		axios
			.get("http://localhost:4000/notification/notifications")
			.then(response => {
				console.log(response.data);
				this.setState({
					notifications: response.data
				});
			});
	}

	deleteuser = notificationid => {
		var x = confirm("Are you sure you want to delete?"); //eslint-disable-line
		if (x) {
			axios.delete(
				"http://localhost:4000/notification/deletenotification/" +
					notificationid
			);
			location.reload(); //eslint-disable-line
		} else {
			return false;
		}
	};

	render() {
		const mydata = this.state.notifications.map(notifications => {
			return (
				<tr>
					<td>{notifications.postedDate}</td>
					<td>{notifications.endDate}</td>
					<td>{notifications.title}</td>
					<td>{notifications.description}</td>
					<td>
						<a>
							<Button
								className="btn btn-danger"
								onClick={() => this.deleteuser(notifications._id)}
							>
								Delete
							</Button>
						</a>
					</td>
				</tr>
			);
		});
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<h2>Notifications</h2>
						<Form>
							<Form.Label>NOTIFICATION DATE</Form.Label>
							<br />
							<label>FROM &nbsp;&nbsp;</label>
							<Form.Control
								type="date"
								onChange={this.handleChange}
								name="postedDate"
							/>
							<label>TO</label>
							<Form.Control
								type="date"
								onChange={this.handleChange}
								name="endDate"
							/>
							<br />
							<Form.Label>TITLE</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter title"
								onChange={this.handleChange}
								name="title"
							/>
							<Form.Label>DESCRIPTION</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter description"
								onChange={this.handleChange}
								name="description"
							/>
							<br />
							<Button
								onClick={this.postnotification}
								variant="primary"
								size="md"
								block
							>
								Add
							</Button>
						</Form>

						<br />
						<div class="table-responsive">
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Start Date</th>
										<th>End Date</th>
										<th>Title</th>
										<th>Description</th>
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

export default NotificationComponent;
