
export const sanitizeInput = (input) => {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
  };

 export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  export const validatePasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

   export const validatePassword = (password) => {
    return password.length >= 8;
  };

