exports.validateEmail = function(email) {
  let errorMessage = '';
  const regex = /\S+@\S+\.\S+/;
  const trimmedEmail = email.trim();

  if (trimmedEmail.length > 150) {
    errorMessage = '* Email is too long, please use shorter email address';
  }

  if (!regex.test(trimmedEmail) || trimmedEmail.length === 0) {
    errorMessage = '* Email must be in valid format';
  }

  return errorMessage;
};

exports.validatePassword = function(password) {
  const errorMessages = [];

  if (password.length > 50) {
    errorMessages.push('* Must be fewer than 50 chars');
  }

  if (password.length < 8) {
    errorMessages.push('* Must be longer than 7 chars');
  }

  if (!password.match(/[\!\@\#\$\%\^\&\*]/g)) {
    errorMessages.push('* Missing a symbol(! @ # $ % ^ & *)');
  }

  if (!password.match(/\d/g)) {
    errorMessages.push('* Missing a number');
  }

  if (!password.match(/[a-z]/g)) {
    errorMessages.push('* Missing a lowercase letter');
  }

  if (!password.match(/[A-Z]/g)) {
    errorMessages.push('* Missing an uppercase letter');
  }

  return errorMessages;
};

exports.validateStringLength = function(text, limit) {
  let errorMessage = '';
  if (text.trim().length > limit) {
    errorMessage = `* Cannot be more than ${limit} characters`;
  } else if (text.trim().length <= 0) {
    errorMessage = '* Cannot be empty';
  } else {
    errorMessage = '';
  }
  return errorMessage;
};
