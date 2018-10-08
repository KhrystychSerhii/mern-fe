import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { emailValidation } from '../../utils';


class RegistrationModal extends Component {

	constructor(props) {
		super(props);

		this.state = {
			user: {
				username: '',
				email: '',
				password: ''
			},
			confirmPassword: ''
		};
	}

	emailHandler = (e) => {
		const { user } = this.state;
		user.email = e.target.value;
		this.setState({
			user
		});
	};

	passwordHandler = (e) => {
		const { user } = this.state;
		user.password = e.target.value;
		this.setState({
			user
		});
	};

	confirmPasswordHandler = (e) => {
		this.setState({
			confirmPassword: e.target.value
		});
	};

	usernameHandler = (e) => {
		const { user } = this.state;
		user.username = e.target.value;
		this.setState({
			user
		});
	};

	isDisabled = () => {
		const { user, confirmPassword } = this.state;
		const validEmail = emailValidation(user.email);
		const validPassword = (user.password.length >= 6) && (user.password === confirmPassword);

		return !(validEmail && validPassword);
	};

	render() {
		const { isOpen, toggle, registration } = this.props;
		const { user, confirmPassword } = this.state;

		return (
			<Modal isOpen={isOpen} toggle={toggle}>
				<ModalHeader toggle={toggle}>Sign up</ModalHeader>
				<ModalBody>
					<Form>

						<Col>
							<FormGroup row>
								<Label for="email">Username</Label>
								<Input type="text" name="username" id="username" placeholder="Username" onChange={this.usernameHandler} value={user.username} />
							</FormGroup>
							<FormGroup row>
								<Label for="email">Email</Label>
								<Input type="email" name="email" id="email" placeholder="Email" onChange={this.emailHandler} value={user.email} />
							</FormGroup>
							<FormGroup row>
								<Label for="password">Password</Label>
								<Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={this.passwordHandler} value={user.password} />
							</FormGroup>
							<FormGroup row>
								<Label for="cpassword">Confirm Password</Label>
								<Input type="password" name="cpassword" id="cpassword" placeholder="Confirm password" onChange={this.confirmPasswordHandler} value={confirmPassword} />
							</FormGroup>
						</Col>

					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={() => { registration(this.state.user) }} disabled={this.isDisabled()}>Sign Up</Button>{' '}
					<Button color="secondary" onClick={toggle}>Cancel</Button>
				</ModalFooter>
			</Modal>
		)
	}
}
RegistrationModal.propTypes = {
	isOpen: PropTypes.bool,
	toggle: PropTypes.func,
	registration: PropTypes.func,
};

export default RegistrationModal;