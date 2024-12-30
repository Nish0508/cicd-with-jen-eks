// regex check
export const regex = /[a-zA-Z]/;

// check if email is valid
export const isValidEmail = (email: string) => {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// check if password is valid
export const isStrongPassword = (password: string) => {
  if (import.meta.env.MODE !== "production") return true;

  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numbersRegex = /[0-9]/;
  const specialRegex = /[!@#$%^&*]/;
  const lengthRegex = /.{6,32}/;

  // if true return boolean true or otherwise if false
  return (
    uppercaseRegex.test(password) &&
    lowercaseRegex.test(password) &&
    numbersRegex.test(password) &&
    specialRegex.test(password) &&
    lengthRegex.test(password)
  );
};

// check password strength
export const passwordStrength = (password: string) => {
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numbersRegex = /[0-9]/;
  const specialRegex = /[!@#$%^&*]/;
  const lengthRegex = /.{6,32}/;

  // if true return boolean true or otherwise if false
  return {
    hasUppercase: uppercaseRegex.test(password),
    hasLowercase: lowercaseRegex.test(password),
    hasNumber: numbersRegex.test(password),
    hasSpecialSymbol: specialRegex.test(password),
    lengthInRange: lengthRegex.test(password)
  };
};

export const validateText = (text: string) => {
  const regex = /^[a-zA-Z ]+$/g;
  if (regex.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const validatePhone = (text: string) => {
  const regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,}$/g;
  if (regex.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const validatePassword = (password: string) => {
  if (import.meta.env.MODE !== "production") return true;

  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numbersRegex = /[0-9]/;
  const specialRegex = /[!@#$%^&*]/;
  const lengthRegex = /.{6,32}/;

  return {
    uppercase: uppercaseRegex.test(password),
    lowercase: lowercaseRegex.test(password),
    numbers: numbersRegex.test(password),
    special: specialRegex.test(password),
    length: lengthRegex.test(password)
  };
};

export const validateYOB = (Yob: string) => {
  const currentYear = new Date().getFullYear();
  const maxAge = 120;
  const minYear = currentYear - maxAge;

  // Check if the input is a valid 4-digit number
  if (!/^\d{4}$/.test(Yob)) {
    return false;
  }

  const year = Number(Yob);

  if (year > currentYear || year < minYear) {
    return false;
  }

  return true;
}



