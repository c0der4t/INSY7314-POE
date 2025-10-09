export async function signupApi({ userName, idNumber, accountNumber, password }) {
  try {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: userName,
        idNum: idNumber,
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