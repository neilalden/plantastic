export const validatePassword = (password: string): boolean | string => {
  if (!password) return 'Please enter a password';
  if (password.length < 8)
    return 'Password length must be 8 characters or longer';
  return true;
};
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm password';
  if (password !== confirmPassword)
    return 'Password and Confirm password do not match';
  return true;
};
export const validateEmail = (email: string): RegExpMatchArray | null => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
export const validateUsername = (username: string): string | boolean => {
  if (!username) return 'Please enter a username';
  if (username.includes(' ')) return 'Username should not include spaces';
  if (username.length < 5)
    return 'Username should at least be 5 characters long';
  if (username.length > 25)
    return 'Username length must not exceed 25 characters';
  return true;
};
