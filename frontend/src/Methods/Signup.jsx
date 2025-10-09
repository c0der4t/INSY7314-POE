import axios from '../../interfaces/axiosInstance';

export const signupApi = async (payload) => {
  try {
    const response = await axios.post('/auth/register', payload);
    return {
      success: true,
      message: response.data.message,
      data: response.data,
    };
  } catch (err) {
    console.error('Signup error:', err.response || err);
    return {
      success: false,
      message: err.response?.data?.message || 'Network or server error',
    };
  }
};