import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { exitImage } from '../../images';

import './header.css';

class Header extends Component {
	render() {
		const { username, logOut } = this.props;
		return (
			<div className="header">
				<nav>
					<div className="nav nav-pills float-right">
						<span className="nav-item">
							<span className="nav-link">{username}</span>
						</span>
						<span className="nav-item cursor-pointer" onClick={logOut}>
							<span className="nav-link">
								<img src={exitImage} alt="logout"/>
							</span>
						</span>
					</div>
				</nav>
				<h4 className="text-muted">Project name</h4>
			</div>
		)
	}
}

Header.propTypes = {
	username: PropTypes.string,
	logOut: PropTypes.func
};

export default Header;