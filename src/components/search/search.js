import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Col, FormGroup, Input } from 'reactstrap';

class Search extends Component {
	render() {
		const { searchBy, handler } = this.props;

		return (
			<FormGroup row className="search-wrapper">
				<Label for="search" sm={1}>Search</Label>
				<Col sm={4}>
					<Input type="text" name="search" id="search" placeholder="Start typing here..." value={searchBy} onChange={handler} />
				</Col>
			</FormGroup>


		)
	}
}
Search.propTypes = {
	searchBy: PropTypes.string,
	handler: PropTypes.func
};

export default Search;