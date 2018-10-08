import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import moment from 'moment';

import { yearsGenerate, monthGenerate, daysGenerate } from '../../utils';

const Months = monthGenerate();
const Years = yearsGenerate();


const emptyEmployee = {
	firstName: '',
	lastName: '',
	patronymic: '',
	birthDate: {
		day: +moment().date(),
		year: moment().year() - 18,
		month: +moment().month()
	},
	position: '',
	salary: 0,
};


class EmployeeModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			employee: emptyEmployee,
		};
	}

	monthHandler = (e) => {
		let { employee } = this.state;
		employee.birthDate.month = +e.target.value;
		this.setState({employee});
	};

	dayHandler = (e) => {
		let { employee } = this.state;
		employee.birthDate.day = +e.target.value;
		this.setState({employee});
	};

	yearHandler = (e) => {
		let { employee } = this.state;
		employee.birthDate.year = +e.target.value;
		this.setState({employee});
	};

	positionHandler = (e) => {
		let { employee } = this.state;
		employee.position = e.target.value;
		this.setState({employee});
	};

	firstNameHandler = (e) => {
		let { employee } = this.state;
		employee.firstName = e.target.value;
		this.setState({employee});
	};

	lastNameHandler = (e) => {
		let { employee } = this.state;
		employee.lastName = e.target.value;
		this.setState({employee});
	};

	patronymicHandler = (e) => {
		let { employee } = this.state;
		employee.patronymic = e.target.value;
		this.setState({employee});
	};

	salaryHandler = (e) => {
		let { employee } = this.state;
		employee.salary = e.target.value;
		this.setState({employee});
	};

	render() {
		const { isOpen, yesAction, noAction, yesButtonText } = this.props;
		const { employee } = this.state;

		return <Modal isOpen={isOpen} toggle={noAction}
		              onOpened={() => {
			              const { employee } = this.props;
			              if (!!employee) {
				              this.setState({ employee });
			              } else {
			              	this.setState({ employee: emptyEmployee });
			              }
		              }}>
			<ModalHeader toggle={noAction} className="text-capitalize">{yesButtonText} Employee</ModalHeader>
			<ModalBody>
				<Form>

					<Row>
						<Col md={6}>
							<FormGroup>
								<Label for="firstname">First Name</Label>
								<Input type="text" name="firstname" id="firstname" placeholder="First Name" onChange={this.firstNameHandler}  value={employee.firstName} />
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for="lastname">Last Name</Label>
								<Input type="text" name="lastname" id="lastname" placeholder="Last Name" onChange={this.lastNameHandler}  value={employee.lastName} />
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<FormGroup>
								<Label for="patronymic">Patronymic</Label>
								<Input type="text" name="patronymic" id="patronymic" placeholder="Patronymic" onChange={this.patronymicHandler}  value={employee.patronymic} />
							</FormGroup>
						</Col>
					</Row>

					<Row>
						<Col md={12}>
							<Label for="month">Date of Birth</Label>
						</Col>
						<Col md={4}>
							<FormGroup>
								<Input type="select" name="month" id="month" placeholder="Month" onChange={this.monthHandler} value={employee.birthDate.month}>
									{
										Months.map((m) => (<option key={m} value={m}>{moment.months(m)}</option>))
									}
								</Input>
							</FormGroup>
						</Col>
						<Col md={4}>
							<FormGroup>
								<Input type="select" name="day" id="day" placeholder="Day" onChange={this.dayHandler} value={employee.birthDate.day}>
									{
										daysGenerate(employee.birthDate.month, employee.birthDate.year).map((d) => (<option key={d} value={d}>{d}</option>))
									}
								</Input>
							</FormGroup>
						</Col>
						<Col md={4}>
							<FormGroup>
								<Input type="select" name="year" id="year" placeholder="Year" onChange={this.yearHandler} value={employee.birthDate.year}>
									{
										Years.map((y) => (<option key={y} value={y}>{y}</option>))
									}
								</Input>
							</FormGroup>
						</Col>
					</Row>

					<Row>
						<Col md={6}>
							<FormGroup>
								<Label for="position">Position</Label>
								<Input type="select" name="position" id="position" placeholder="Position" onChange={this.positionHandler} value={employee.position}>
									<option disabled value=''>Please, select position</option>
									<option value="FE developer">FE developer</option>
									<option value="BE developer">BE developer</option>
									<option value="Full Stack developer">Full Stack developer</option>
									<option value="Project Manager">Project Manager</option>
									<option value="Sales Manager">Sales Manager</option>
									<option value="Human Resources Manager">Human Resources Manager</option>
									<option value="Office Manager">Office Manager</option>
								</Input>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for="salary">Salary</Label>
								<Input type="number" name="salary" id="salary" placeholder="Salary" onChange={this.salaryHandler} value={employee.salary} />
							</FormGroup>
						</Col>
					</Row>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={() => { yesAction(this.state.employee) }}>{yesButtonText}</Button>{' '}
				<Button color="secondary" onClick={noAction}>Cancel</Button>
			</ModalFooter>
		</Modal>
	}
}

EmployeeModal.propTypes = {
	isOpen: PropTypes.bool,
	noAction: PropTypes.func,
	yesAction: PropTypes.func,
	yesButtonText: PropTypes.string,
	employee: PropTypes.object,
};

export default EmployeeModal;