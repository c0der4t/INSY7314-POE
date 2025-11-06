// import singleton for Axios
import axios from '../interfaces/axiosInstance'

//AUTH ENDPOINTS

//employee login
export const loginEmployee = (credentials) => axios.post('/auth-employee/login', credentials);

// logout user
export const logoutUser = () => axios.get('/auth/logout');


// PAYMENT ENDPOINTS

//endpoints for employees


export const getPendingPayments = (token) =>
  axios.get('/employee/payments/pending', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const getAllPayments = (token) =>
  axios.get('/employee/payments/history', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//employee verifies a payment
export const decidePayment = (id, decision, token) =>
  axios.put(`/employee/payments/${id}`, { decision }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


//EMPLOYEE MANAGEMENT ENDPOINTS

//get all employees
export const getAllEmployees = (token) =>
  axios.get('/admin/employees', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//create new employee
export const createEmployee = (employeeData, token) =>
  
  axios.post('/admin/employees', employeeData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

//delete an employee by ID
export const deleteEmployee = (accNum, token) =>
  axios.delete(`/admin/employees/${accNum}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


//REFERENCES
// Khatri, S. 2017. ‘Answer to “Passing headers with axios POST request”’.
// [Online]. Available at: https://stackoverflow.com/a/44617848/11914974
// [Accessed 10 October 2025].
