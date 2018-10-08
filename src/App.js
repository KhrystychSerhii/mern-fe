import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { Router, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Jumbotron, Container, Row } from 'reactstrap';


import { PrivateRoute } from './utils';

// actions
import { getUserProfile, logOut } from './actions';
// selectors
import { selectLoggedInUser } from './selectors';

// components
import { Header } from './components';
// containers
import { Authorization, EmployeeList } from './containers'
import './App.css';

const history = createBrowserHistory();

const AuthorizationScreen = () => <Authorization />;
const EmployeeListScreen = () => <EmployeeList />;

class App extends Component {

	componentDidMount() {
		this.props.getUserProfile();
	}

	render() {
		const { loggedInUser, logOut } = this.props;
		return (
			<Router history={history}>
				<Container>
					{ loggedInUser && <Header username={loggedInUser.username} logOut={logOut} /> }
					<Redirect from="/" exact to="/login" />
					<PrivateRoute
						exact
						path="/login"
						approved={!loggedInUser}
						component={AuthorizationScreen}
						redirectTo="/employee-list/1" />
					<PrivateRoute
						path="/employee-list/:page"
						approved={!!loggedInUser}
						component={EmployeeListScreen}
						redirectTo="/login" />
				</Container>
			</Router>
		)
	}
}

const mapStateToProps = (state) => createStructuredSelector({
	loggedInUser: selectLoggedInUser()
});
const mapDispatchToProps = dispatch => ({
	getUserProfile: () => dispatch(getUserProfile()),
	logOut: () => dispatch(logOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
