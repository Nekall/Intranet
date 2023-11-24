export const updateUserValidators = ({
  firstname,
  lastname,
  email,
  password,
  gender, 
  phone,
  birthdate,
  city,
  country,
  category,
  isAdmin
}) => {
  const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s-']+$/;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const phoneRegex = /^\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/;

  let errors = {
    noErrors: true,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    birthdate: "",
    city: "",
    country: "",
    category: "",
    isAdmin: "",
  };

  if (!nameRegex.test(firstname) || firstname.length < 3 || firstname.length > 20) {
    errors.firstname = "First name is invalid. It should contain 3 to 20 characters and accept only letters, spaces, hyphens, and apostrophes.";
    errors.noErrors = false;
  }

  if (!nameRegex.test(lastname) || lastname.length < 3 || lastname.length > 20) {
    errors.lastname = "Last name is invalid. It should contain 3 to 20 characters and accept only letters, spaces, hyphens, and apostrophes.";
    errors.noErrors = false;
  }

  if (email !== "") {
    if (!emailRegex.test(email)) {
      errors.email = "Email format is incorrect.";
      errors.noErrors = false;
    }
  } else {
    errors.email = "Email cannot be empty.";
    errors.noErrors = false;
  }

  if (password === "") {
    errors.password = "Password cannot be empty.";
    errors.noErrors = false;
  }

  if (gender === ""){
    errors.gender = "Gender cannot be empty.";
    errors.noErrors = false;
  } else {
    if (gender !== "male" && gender !== "female"){
      errors.gender = "Gender should be 'male' or 'female'.";
      errors.noErrors = false;
    }
  }

  if (phone === ""){
    errors.phone = "Phone number cannot be empty.";
    errors.noErrors = false;
  } else {
    if (!phoneRegex.test(phone)) {
      errors.phone = "Phone number format is invalid. Please use the format 01-23-45-67-89.";
      errors.noErrors = false;
    }
  }

  if (birthdate === ""){
    errors.birthdate = "Birthdate cannot be empty.";
    errors.noErrors = false;
  }

  if (city === "" || city.length < 3 || city.length > 20){
    errors.city = "City cannot be empty.";
    errors.noErrors = false;
  }

  if (country === "" || country.length < 3 || country.length > 20){
    errors.country = "Country cannot be empty.";
    errors.noErrors = false;
  }

  if (category === "" || category.length < 3 || category.length > 20){
    errors.category = "Category cannot be empty.";
    errors.noErrors = false;
  }

  if (isAdmin !== true && isAdmin !== false){
    errors.isAdmin = "Admin status should be either 'true' or 'false'.";
    errors.noErrors = false;
  }

  return errors;
};
export const loginValidators = ({ email, password }) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  let errors = {
    noErrors: true,
    email: "",
    password: "",
  };

  if (email != "") {
    if (!email.match(regex)) {
      errors.email = "Invalid email format.";
      errors.noErrors = false;
    }
  } else {
    errors.email = "Email cannot be empty.";
    errors.noErrors = false;
  }

  if (password === "") {
    errors.password = "Password cannot be empty.";
    errors.noErrors = false;
  }

  return errors;
};
