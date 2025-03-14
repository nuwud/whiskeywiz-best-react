/**
 * Validates an email address format
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param {string} password - The password to validate
 * @returns {boolean} Whether the password meets requirements
 */
export const isValidPassword = (password) => {
  // At least 8 chars, 1 uppercase, 1 lowercase, and 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Formats a validation error message
 * @param {Object} errors - Object containing validation errors
 * @returns {string} Formatted error message
 */
export const formatValidationErrors = (errors) => {
  return Object.keys(errors)
    .map(key => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${errors[key]}`)
    .join('\n');
};
