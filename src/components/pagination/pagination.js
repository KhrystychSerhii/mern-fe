import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination as BootstrapPagination, PaginationItem, PaginationLink } from 'reactstrap';

import { createPaginationItemsArray } from '../../utils';

import './pagination.css';

class Pagination extends Component {

	render() {
		const { length, current, goPrevious, goToPage, goNext } = this.props;

		return (
			<div className="pagination-wrapper">
				<BootstrapPagination aria-label="Page navigation example">
					<PaginationItem>
						<PaginationLink previous onClick={goPrevious} />
					</PaginationItem>

					{
						createPaginationItemsArray(length, current).map((i, index) => {
							if (i.visible) {
								return (
									<PaginationItem key={index} active={current === i.number}>
										<PaginationLink onClick={() => { goToPage(i.number) }}>
											{i.number}
										</PaginationLink>
									</PaginationItem>
								)
							} else {
								return null;
							}
						})
					}

					<PaginationItem>
						<PaginationLink next onClick={goNext} />
					</PaginationItem>
				</BootstrapPagination>
			</div>
		)
	}
}

Pagination.propTypes = {
	length: PropTypes.number,
	current: PropTypes.number,
	goPrevious: PropTypes.func,
	goNext: PropTypes.func,
	goToPage: PropTypes.func
};

export default Pagination;