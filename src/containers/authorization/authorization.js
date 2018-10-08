import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect'
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback, Container } from 'reactstrap';

// Actions
import { login, registration } from '../../actions';
// Components
import { RegistrationModal } from '../../components';

import './authorization.css';

class Authorization extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			registrationModalOpened: false
		};
	}

	emailInputHandler = (e) => {
		this.setState({ email: e.target.value });
	};

	passwordInputHandler = (e) => {
		this.setState({ password: e.target.value });
	};

	submit = () => {
		const { email, password } = this.state;
		const { login, history } = this.props;

		login({
			email,
			password
		}).then(() => {
			history.push('/employee-list/1');
		}, (err) => {
			console.log('login error', err);
		});
	};

	registrationModalToggle = () => {
		this.setState({registrationModalOpened: !this.state.registrationModalOpened});
	};

	registration = (user) => {
		const { registration, history } = this.props;

		registration(user)
			.then(() => {
				history.push('/employee-list/1');
			}, (err) => {
				console.log('registration error', err);
			})
	};


	render() {
		const { email, password, registrationModalOpened } = this.state;

		return (
			<Container>
				<Form tag="div" className="form-signin">
					<FormGroup>
						<h3>Please sign in</h3>
					</FormGroup>
					<FormGroup>
						<Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" value={email} onChange={this.emailInputHandler} />
					</FormGroup>

					<FormGroup>
						<Input type="password" name="password" id="examplePassword" placeholder="password placeholder"  value={password} onChange={this.passwordInputHandler} />
					</FormGroup>

					<FormGroup>
						<Button block onClick={this.submit}>Sign in</Button>
					</FormGroup>
					<FormGroup>
						<Button block onClick={this.registrationModalToggle}>Sign up</Button>
					</FormGroup>
				</Form>
				<RegistrationModal isOpen={registrationModalOpened} registration={this.registration} toggle={this.registrationModalToggle} />
			</Container>
		);
	}
}
const mapStateToProps = (state) => createStructuredSelector({

});
const mapDispatchToProps = dispatch => ({
	login: user => dispatch(login(user)),
	registration: user => dispatch(registration(user))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authorization));