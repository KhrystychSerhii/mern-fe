import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, approved, redirectTo, ...rest }) => (
	<Route {...rest} render={(props) => (
		approved ? <Component {...props} /> : <Redirect to={redirectTo} />
	)} />
);