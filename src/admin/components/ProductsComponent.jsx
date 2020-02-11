import React, { Component } from "react";
import { Form, Button, Table } from "react-bootstrap";
import axios from "axios";

class ProductsComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			description: "",
			currentFile: null,
			image: "",
			price: "",
			productid: null,
			products: []
		};
	}
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	componentDidMount() {
		axios.get("http://localhost:4000/product/getproduct").then(response => {
			console.log(response.data);
			this.setState({
				products: response.data
			});
		});
	}
	handleFileChange = e => {
		this.setState({
			currentFile: e.target.files[0]
		});
	};

	deleteproduct = productid => {
		var x = confirm("Are you sure you want to delete?"); //eslint-disable-line
		if (x) {
			axios.delete(
				"http://localhost:4000/product/deleteproduct/:id/" + productid
			);
			location.reload(); //eslint-disable-line
		} else {
			return false;
		}
	};

	handleSubmit = e => {
		e.preventDefault();

		let data = new FormData();
		console.log(this.currentFile);
		console.log(data);
		data.append("imageFile", this.state.currentFile);

		axios
			.post("http://localhost:4000/uploads/", data)
			.then(response => {
				console.log(response.data);
				axios
					.post("http://localhost:4000/product/addproducts", {
						name: this.state.name,

						image: response.data.filename,
						description: this.state.description,
						specification: this.state.specification,
						price: this.state.price
					})
					.then(response => {
						console.log(response.data);
						this.setState({
							name: "",
							image: "",
							description: "",
							specification: "",
							price: ""
						});
					})
					.catch(err => console.log(err.response));
			})
			.catch(err => console.log(err));

		alert("Product added");
	};

	updateData = productid => {
		axios
			.put("http://localhost:4000/product/updateproduct/" + productid, {
				name: this.state.name,
				description: this.state.description,
				price: this.state.price
			})
			.then(data => {
				console.log(data);
			})
			.catch(err => {
				console.log(err);
			});
		window.location.reload();
	};

	deleteproduct = productid => {
		var x = confirm("Are you sure you want to delete?"); //eslint-disable-line
		if (x) {
			axios.delete("http://localhost:4000/product/deleteproduct/" + productid);
			location.reload(); //eslint-disable-line
		} else {
			return false;
		}
	};

	getTableData = id => {
		axios.get("http://localhost:4000/product/" + id).then(response => {
			console.log(response.data);
			this.setState({
				name: response.data.name,
				description: response.data.description,
				price: response.data.price
			});
		});
	};

	render() {
		const mydata = this.state.products.map(products => {
			return (
				<tr>
					<td
						onClick={() => this.getTableData(products._id)}
						style={{ cursor: "pointer" }}
					>
						{products.name}
					</td>
					<td
						onClick={() => this.getTableData(products._id)}
						style={{ cursor: "pointer" }}
					>
						{products.price}
					</td>
					<td
						onClick={() => this.getTableData(products._id)}
						style={{ cursor: "pointer" }}
					>
						{products.description}
					</td>
					<td>
						<a>
							<Button
								className="btn btn-danger"
								onClick={() => this.updateData(products._id)}
							>
								Update
							</Button>
						</a>
					</td>
					<td>
						<a>
							<Button
								className="btn btn-danger"
								onClick={() => this.deleteproduct(products._id)}
							>
								Delete
							</Button>
						</a>
					</td>
				</tr>
			);
		});
		return (
			<React.Fragment>
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<Form onSubmit={this.handleSubmit}>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter product name"
									onChange={this.handleChange}
									name="name"
									id="name"
									value={this.state.name}
									onChange={this.handleChange}
								/>
								<Form.Label>Price</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter product price"
									onChange={this.handleChange}
									name="price"
									id="price"
									value={this.state.price}
								/>
								<Form.Label>Image</Form.Label>
								<Form.Control
									className="file"
									type="file"
									onChange={this.handleFileChange}
									name="image"
								/>
								<Form.Label>Description</Form.Label>
								<Form.Control
									as="textarea"
									id="description"
									rows="3"
									placeholder="Enter product description"
									onChange={this.handleChange}
									name="description"
									value={this.state.description}
								/>
								<br />
								<Button
									variant="primary"
									size="md"
									block
									onClick={this.handleSubmit}
								>
									{this.state.formvalue}
									Add Product
								</Button>
								{/* <Button
									variant="primary"
									size="md"
									block
									onClick={() => this.updateData(products._id)}
								>
									{this.state.formvalue}
									Update Product
								</Button> */}
							</Form>
						</div>
						<div class="table-responsive">
							<Table id="productTable" striped bordered hover>
								<thead>
									<tr>
										<th>Name</th>
										<th>Price</th>
										<th>Description</th>
										<th>Update</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody>{mydata}</tbody>
							</Table>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default ProductsComponent;
