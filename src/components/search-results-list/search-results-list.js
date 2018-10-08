import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { EmployeeListItem } from '../';

class SearchResultsList extends Component {
	render() {
		const { employees, selectEmployee, openEmployeeModal, openDeleteConfirmModal, searchBy } = this.props;
		return <tbody>
				{
					(employees && employees.length && employees.length > 0) ?
						employees.map(e => <EmployeeListItem key={e.id} employee={e} editAction={(employee) => { selectEmployee(employee); openEmployeeModal(); }} deleteAction={(employee) => { selectEmployee(employee); openDeleteConfirmModal(); }} />) :
						<tr>
							<td colSpan="6">No results by "{searchBy}" word</td>
						</tr>
				}
		</tbody>;
	}
}
SearchResultsList.propTypes = {
	employees: PropTypes.array,
	searchBy: PropTypes.string,
	selectEmployee: PropTypes.func,
	openEmployeeModal: PropTypes.func,
	openDeleteConfirmModal: PropTypes.func
};

export default SearchResultsList;