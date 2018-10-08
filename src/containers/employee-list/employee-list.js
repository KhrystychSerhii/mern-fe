import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { Button, Table, FormGroup, Input, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import { getEmployees, createEmployee, getEmployeeById, updateEmployee, removeEmployee, setDisplayedPage } from '../../actions';
import { selectEmployees, selectEmployeesDependingOnPage, selectDisplayedPage } from '../../selectors';
import './employee-list.css';

// Modals
import { ConfirmModal, EmployeeModal, EmployeeListItem, Pagination, Search, PaginatedList, SearchResultsList } from '../../components';

class EmployeeList extends Component {
	selectedEmployee = null;

	constructor(props) {
		super(props);

		this.state = {
			searchBy: '',
			deleteModalOpened: false,
			employeeModalOpened: false,
		};
	};

	componentDidMount() {
		const { match } = this.props;
		this.props.getEmployees();
		this.props.setDisplayedPage(+match.params.page);
	}

	selectEmployee = (employee) => {
		this.selectedEmployee = employee;
		this.props.getEmployeeById(employee.id);
	};

	openDeleteConfirmModal = () => {
		this.setState({deleteModalOpened: true});
	};

	closeDeleteConfirmModal = () => {
		this.selectedEmployee = null;
		this.setState({deleteModalOpened: false});
	};

	openEmployeeModal = () => {
		this.setState({employeeModalOpened: true});
	};

	closeEmployeeModal = () => {
		this.selectedEmployee = null;
		this.setState({employeeModalOpened: false});
	};

	createEmployee = (employee) => {
		this.props.createEmployee(employee);
		this.closeEmployeeModal();
	};

	editEmployee = (employee) => {
		this.props.updateEmployee(employee);
		this.closeEmployeeModal();
	};

	deleteEmployee = () => {
		this.props.removeEmployee(this.selectedEmployee.id);
		this.closeDeleteConfirmModal();
	};

	searchByHandler = (e) => {
		this.setState({searchBy: e.target.value});
	};

	goPrevious = () => {
		const { history, match } = this.props;
		const nextPage = +match.params.page - 1;
		if (nextPage <= 1) {
			history.push('/employee-list/1');
		} else {
			history.push('/employee-list/' + nextPage);
		}
		this.props.setDisplayedPage(+nextPage);
	};

	goNext = () => {
		const { history, match } = this.props;
		const nextPage = +match.params.page + 1;
		if (nextPage >= 50) {
			history.push('/employee-list/50');
		} else {
			history.push('/employee-list/' + nextPage);
		}
		this.props.setDisplayedPage(+nextPage);
	};

	goToPage = (page) => {
		const { history, match } = this.props;
		history.push('/employee-list/' + page);
		this.props.setDisplayedPage(+page);
	};

	searchFilter = (employee) => {
		if (this.state.searchBy === '') return true;

		let result = false;
		const searchBy = this.state.searchBy.toLowerCase();

		for (let key in employee) {
			if (key !== 'birthDate') {
				result = String(employee[key]).toLowerCase().indexOf(searchBy) >= 0; // search by first letters
				if (result) break;
			}
		}

		return result;
	};

	render() {
		const { employees, employeesDependingOnPage, displayedPage } = this.props;
		const { deleteModalOpened, employeeModalOpened, searchBy } = this.state;

		return (
			<div className="employee-list-container">
				<div className="component-header">
					<h6 className="h3">Employees</h6>
					<Button color="primary" onClick={this.openEmployeeModal}>Create Employee</Button>
				</div>
				<Search searchBy={searchBy} handler={this.searchByHandler} />
				<Table>
					<thead>
					<tr>
						<th>Full Name</th>
						<th>Date of Birth</th>
						<th>Position</th>
						<th>Salary</th>
						<th></th>
						<th></th>
					</tr>
					</thead>

					{
						!searchBy ? <PaginatedList employees={employeesDependingOnPage} selectEmployee={this.selectEmployee} openEmployeeModal={this.openEmployeeModal} openDeleteConfirmModal={this.openDeleteConfirmModal} /> :
									<SearchResultsList searchBy={searchBy} employees={employees.filter(this.searchFilter)} selectEmployee={this.selectEmployee} openEmployeeModal={this.openEmployeeModal} openDeleteConfirmModal={this.openDeleteConfirmModal} />
					}

				</Table>

				{
					(employees.length > 10 && !searchBy) && <Pagination length={employees.length / 10} current={displayedPage} goPrevious={this.goPrevious} goNext={this.goNext} goToPage={this.goToPage} />
				}

				<ConfirmModal isOpen={deleteModalOpened} yesAction={this.deleteEmployee} noAction={this.closeDeleteConfirmModal} />
				<EmployeeModal isOpen={employeeModalOpened} yesAction={(employee) => { !!this.selectedEmployee ? this.editEmployee(employee) : this.createEmployee(employee) }} noAction={this.closeEmployeeModal} yesButtonText={!!this.selectedEmployee ? 'Edit' : 'Create'} employee={this.selectedEmployee} />
			</div>
		);
	}
}

const mapStateToProps = (state) => createStructuredSelector({
	employees: selectEmployees(),
	employeesDependingOnPage: selectEmployeesDependingOnPage(),
	displayedPage: selectDisplayedPage()
});
const mapDispatchToProps = dispatch => ({
	getEmployees: () => dispatch(getEmployees()),
	createEmployee: employee => dispatch(createEmployee(employee)),
	getEmployeeById: id => dispatch(getEmployeeById(id)),
	updateEmployee: employee => dispatch(updateEmployee(employee)),
	removeEmployee: id => dispatch(removeEmployee(id)),
	setDisplayedPage: page => dispatch(setDisplayedPage(page))
});

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(EmployeeList));