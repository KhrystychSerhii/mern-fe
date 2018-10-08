import { fetchEmployees, fetchEmployeeUpdate, fetchNewEmployee, fetchEmployeeById, fetchEmployeeDelete } from '../services/api';

import { GET_EMPLOYEES_SUCCESS, TOGGLE_LOADER, SELECT_EMPLOYEE_INDEX, EMPLOYEE_UPDATE_SUCCESS, EMPLOYEE_CREATE_SUCCESS, EMPLOYEE_REMOVED_SUCCESS, SET_DISPLAYED_PAGE } from '../constants';

// Action generators
export const getEmployeesSuccess = (data) => ({type: GET_EMPLOYEES_SUCCESS, data});
export const toggleLoader = (loader) => ({type: TOGGLE_LOADER, loader});
export const selectEmployeeIndex = (selectedIndex) => ({type: SELECT_EMPLOYEE_INDEX, selectedIndex});
export const employeeUpdateSuccess = (employee) => ({type: EMPLOYEE_UPDATE_SUCCESS, employee});
export const createEmployeeSuccess = (employee) => ({type: EMPLOYEE_CREATE_SUCCESS, employee});
export const employeeRemovedSuccess = (id) => ({type: EMPLOYEE_REMOVED_SUCCESS, id });
export const setDisplayedPage = (displayedPage) => ({type: SET_DISPLAYED_PAGE, displayedPage});

export const getEmployees = () => async (dispatch) => {
	dispatch(toggleLoader(true));
	try {
		const response = await fetchEmployees();
		dispatch(getEmployeesSuccess(response.data.employees));
		dispatch(toggleLoader(false));
	} catch (e) {
		dispatch(toggleLoader(true));
	}
};

export const getEmployeeById = (id) => async (dispatch) => {
	try {
		const response = await fetchEmployeeById(id);
		if (response.data.success) {
			dispatch(employeeUpdateSuccess(response.data.employee));
		}
	} catch (e) {
		console.log('e', e);
		throw e;
	}
};

export const updateEmployee = (employee) => async (dispatch) => {
	try {
		const response = await fetchEmployeeUpdate(employee);
		if (response.data.success) {
			dispatch(employeeUpdateSuccess(response.data.employee));
		}

	} catch (e) {
		console.log('e', e);
		throw e;
	}
};

export const createEmployee = (employee) => async (dispatch) => {
	try {
		const response = await fetchNewEmployee(employee);
		if (response.data.success) {
			dispatch(createEmployeeSuccess(response.data.employee));
			dispatch(getEmployees());
		}
	} catch (e) {
		console.log('e', e);
		throw e;
	}
};

export const removeEmployee = (id) => async (dispatch) => {
	try {
		const response = await fetchEmployeeDelete(id);
		if (response.data.success) {
			dispatch(employeeRemovedSuccess(response.data.id));
		}
	} catch (e) {
		console.log('e', e);
		throw e;
	}
};