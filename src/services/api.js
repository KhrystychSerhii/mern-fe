import { Http } from '../utils';

export const loginUser = (email, password) => Http.post('/users/authenticate', {email, password});

export const registerUser = ({username, email, password}) => Http.post('/users/register', {username, email, password});

export const fetchUser = () => Http.get('/users/profile');

export const fetchEmployees = () => Http.get('/employees/list');

export const fetchEmployeeById = (id) => Http.get(`/employees/employee/${id}`);

export const fetchEmployeeUpdate = (employee) => Http.put('/employees/update', employee);

export const fetchNewEmployee = (employee) => Http.post('/employees/create', employee);

export const fetchEmployeeDelete = (id) => Http.remove(`/employees/delete/${id}`);