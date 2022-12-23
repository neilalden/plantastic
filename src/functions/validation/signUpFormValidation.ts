import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateUsername,
} from './stringValidation';

export const signUpFormValidation = (
  username,
  email,
  password,
  confirmPassword,
) => {
  const valdiatedUsername = validateUsername(username);
  const validatedEmail = validateEmail(email);
  const validatedPassword = validatePassword(password);
  const validatedConfirmPassword = validateConfirmPassword(
    password,
    confirmPassword,
  );
  if (valdiatedUsername !== true) {
    alert(valdiatedUsername);
    return false;
  }
  if (!validatedEmail) {
    alert('Please enter a valid email');
    return false;
  }
  if (validatedPassword !== true) {
    alert(validatedPassword);
    return false;
  }
  if (validatedConfirmPassword !== true) {
    alert(validatedConfirmPassword);
    return false;
  }
  return true;
};
