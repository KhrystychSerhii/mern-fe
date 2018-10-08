import {
	GET_EMPLOYEES_SUCCESS,
	SELECT_EMPLOYEE_INDEX,
	TOGGLE_LOADER,
	EMPLOYEE_UPDATE_SUCCESS,
	EMPLOYEE_CREATE_SUCCESS,
	EMPLOYEE_REMOVED_SUCCESS,
	SET_DISPLAYED_PAGE,
} from '../constants';
import { findIndex, remove } from 'lodash';

const initialState = {
	employees: [],
	selectedIndex: 0,
	displayedPage: 0,
	loader: false
};
export default function employees(state = initialState, action) {
	switch (action.type) {
		case SELECT_EMPLOYEE_INDEX:
			return Object.assign({}, state, { selectedIndex: action.selectedIndex });

		case GET_EMPLOYEES_SUCCESS:
			return Object.assign({}, state, { employees: action.data });

		case TOGGLE_LOADER:
			return Object.assign({}, state, { loader: action.loader });

		case EMPLOYEE_UPDATE_SUCCESS: {
			const employees = state.employees;
			const index = findIndex(state.employees, (c) => {
				return action.employee.id === c.id;
			});
			employees[index] = action.employee;
			return Object.assign({}, state, { employees: [ ...employees ] });
		}

		case EMPLOYEE_CREATE_SUCCESS:
			return Object.assign({}, state, { employees: [ ...state.employees, action.employee ] });

		case EMPLOYEE_REMOVED_SUCCESS: {
			const employees = [ ...state.employees ];
			remove(employees, (e) => e.id === action.id);

			return Object.assign({}, state, { employees: [ ...employees ] });
		}

		case SET_DISPLAYED_PAGE:
			return Object.assign({}, state, { displayedPage: action.displayedPage });

		default:
			return state;
	}
};