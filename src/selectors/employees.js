import { createSelector } from 'reselect'
import { findIndex } from 'lodash'

const selectEmployeesDomain = (state) => state.employees;

export const selectEmployees = () => createSelector(selectEmployeesDomain, subdomain => subdomain.employees );
export const selectEmployeeSelectedIndex = () => createSelector(selectEmployeesDomain, subdomain =>  subdomain.selectedIndex );
export const selectLoader = () => createSelector(selectEmployeesDomain, subdomain =>  subdomain.loader );
export const selectDisplayedPage = () => createSelector(selectEmployeesDomain, subdomain => subdomain.displayedPage );
export const selectEmployeesDependingOnPage = () => createSelector(selectEmployeesDomain, subdomain => {
	const length = 10,
		start = subdomain.displayedPage * length - length,
		employees = [].concat(subdomain.employees);

	return employees.splice(start, length);
});