import React, { Component } from "react";

import { Route, NavLink, Switch } from "react-router-dom";
import UsersComponent from "./UsersComponent";
import NotificationComponent from "./NotificationComponent";
import CouponComponent from "./CouponComponent";
import ProductsComponent from "./ProductsComponent";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";

class HeaderComponent extends Component {
	state = {};

	render() {
		return (
			<div className="container">
				<Navbar bg="light" expand="lg">
					<Navbar.Brand href="/users">Cricketing Material</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="/users">Users</Nav.Link>
							<Nav.Link href="/products">Products</Nav.Link>
							<Nav.Link href="/notification">Notification</Nav.Link>
							<Nav.Link href="/coupon">Coupon</Nav.Link>
						</Nav>
						<Form inline>
							<FormControl
								type="text"
								placeholder="Search"
								className="mr-sm-2"
							/>
							<Button variant="outline-success">Search</Button>
						</Form>
					</Navbar.Collapse>
				</Navbar>
				<switch>
					<Route path="/users" component={UsersComponent} />
					<Route path="/products" component={ProductsComponent} />
					<Route path="/notification" component={NotificationComponent} />
					<Route path="/coupon" component={CouponComponent} />
				</switch>
			</div>
		);
	}
}

export default HeaderComponent;
