export async function loginApi({ userName, accountNumber, password }) {
  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: userName,
        accNum: accountNumber,
        password,
      }),
    });

    const data = await response.json();

    return {
      success: response.ok,
      message: data.message,
      data,
    };
  } catch (err) {
    console.error('Error:', err);
    return { success: false, message: 'Network or server error' };
  }
}