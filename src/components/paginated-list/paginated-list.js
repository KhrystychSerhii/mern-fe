import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { EmployeeListItem } from '../';

class PaginatedList extends Component {

	render() {
		const { employees, selectEmployee, openEmployeeModal, openDeleteConfirmModal } = this.props;
		return <tbody>
			{
				(employees && employees.length && employees.length > 0) ?
					employees.map(e => <EmployeeListItem key={e.id} employee={e} editAction={(employee) => { selectEmployee(employee); openEmployeeModal(); }} deleteAction={(employee) => { selectEmployee(employee); openDeleteConfirmModal(); }} />) :
					<tr>
						<td colSpan="6">No employees</td>
					</tr>
			}
		</tbody>
	}
}

PaginatedList.propTypes = {
	employees: PropTypes.array,
	selectEmployee: PropTypes.func,
	openEmployeeModal: PropTypes.func,
	openDeleteConfirmModal: PropTypes.func
};

export default PaginatedList;