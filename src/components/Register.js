import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, FormText } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fname: '',
            lname: '',
            email: '',
            password: '',
            address:'',
            number:'',
            isRegistered: false
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = (e) => {
        e.preventDefault();
        console.log(this.state);

        axios.post('http://localhost:3001/users/signup', this.state)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token)
                this.setState({
                    fname: '',
            lname: '',
            email: '',
            password: '',
            address:'',
            number:'',
                    isRegistered: true
                });

            }).catch((err) => console.log(err))
    }


    render() {
        if (this.state.isRegistered === true) {
            return <Redirect to='/dashboard' />
        }
        return (
            <Container>
                <h2>Sign Up</h2>
                <Form>
                    <FormGroup>
                        <Label for='fname'>First Name</Label>
                        <Input type='text' name='fname' id='fname'
                            value={this.state.fname} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='lname'>Last Name</Label>
                        <Input type='text' name='lname' id='lname'
                            value={this.state.lname} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='email'>Username</Label>
                        <Input type='text' name='email' id='email'
                            value={this.state.email} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input type='password' name='password' id='password'
                            value={this.state.password} onChange={this.handleChange} />
                    </FormGroup>
                    <Button color='primary' onClick={this.register}>Sign Up</Button>
                    <FormText>Already a user? <Link to='/'> Login here!</Link></FormText>
                </Form>
            </Container>
        )
    }
}
