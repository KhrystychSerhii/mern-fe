import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import moment from 'moment';

import { editImage, deleteImage } from '../../images';

import './employee-list-item.css';

class EmployeeListItem extends Component {

	render() {
		const { employee, editAction, deleteAction } = this.props;

		return (
			<tr className="list-item">
				<td>{employee.lastName} {employee.firstName} {employee.patronymic}</td>
				<td>{moment(`${employee.birthDate.year}-${employee.birthDate.month}-${employee.birthDate.day}`).format('MMM D YYYY')}</td>
				<td>{employee.position}</td>
				<td>{employee.salary}</td>
				<td className="text-right">
					<Button color="link" onClick={() => { editAction(employee) }}>
						<img src={editImage} alt="edit"/>
					</Button>
				</td>
				<td className="text-right">
					<Button color="link" onClick={() => { deleteAction(employee) }}>
						<img src={deleteImage} alt="delete"/>
					</Button>
				</td>
			</tr>
		)
	}
};

EmployeeListItem.propTypes = {
	employee: PropTypes.object,
	editAction: PropTypes.func,
	deleteAction: PropTypes.func
};

export default EmployeeListItem;