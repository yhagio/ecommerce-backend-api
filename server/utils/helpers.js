exports.validateEmail = function (email) {
  let errorMessage = '';
  const regex = /\S+@\S+\.\S+/;
  const trimmedEmail = email.trim();

  if (trimmedEmail.length > 40) {
    errorMessage = '* Email is too long, please use shorter email address';
  }

  if (!regex.test(trimmedEmail) || trimmedEmail.length === 0) {
    errorMessage = '* Email must be in valid format';
  }

  return errorMessage;
};

exports.validatePassword = function (password) {
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

exports.validateStringLength = function (text, limit) {
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

exports.generatePassword = function () {
  let newPassword;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for(let i = 0; i < 10; i++) {
    newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return newPassword;
}

exports.generateEmailTemplate = function (name, password) {
  const htmlMsg =
    `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"     http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <body>
        <p>Hi  ${name}',</p>
        <p>You requested to reset the password</p>
        <p>Your new password is:</p>
        <h4>${password}</h4>
        <br/>
        <p>All the best,</p>
        <br />
        <strong>ECommerce Team</strong>
      </body>
    </html>`;
  return htmlMsg;
}