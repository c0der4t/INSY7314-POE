// import singleton for Axios
import axios from '../interfaces/axiosInstance'

//reg user through api
export const registerUser = (payload) => axios.post('/auth/register', payload);

//login user and return the toekn if successful
export const loginUser = (payload) => axios.post('/auth/login', payload);

//logout user
export const logoutUser = () => axios.get('/auth/logout');

//endpoints for the payments
// (Khatri, 2017)
export const createPayment = (paymentData, token) =>
    axios.post('/payment/add', paymentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
});
  

//payments for the logged in user
export const getLoggedInPayments = () => axios.get('/payments/logged-in');

//endpoints for employees (not sure if we are going this route?)
export const getPendingPayments = () => axios.get('/employee/pending');

//employee verifies a payment
export const verifyPayment = (id) => axios.post(`/employee/verify/${id}`); 


// References
// Khatri, S. 2017. ‘Answer to “Passing headers with axios POST request”’. [Online]. Available at: https://stackoverflow.com/a/44617848/11914974 [Accessed 10 October 2025].
