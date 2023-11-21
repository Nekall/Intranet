export const signUpValidators = ({
  firstName,
  lastName,
  email,
  password,
  password_confirm,
}) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  let errors = {
    noErrors: true,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  if (email != "") {
    if (!email.match(regex)) {
      errors.email = "Le format de l'e-mail n'est pas correct.";
      errors.noErrors = false;
    }
  } else {
    errors.email = "L'email ne peut pas être vide.";
    errors.noErrors = false;
  }

  if (password != "") {
    if (password != password_confirm) {
      errors.password = "Les mots de passe ne correspondent pas.";
      errors.noErrors = false;
    }
  } else {
    errors.password = "Le mot de passe ne peut pas être vide.";
    errors.noErrors = false;
  }

  if (firstName === "") {
    errors.firstName = "Le prénom ne peut pas être vide.";
    errors.noErrors = false;
  }

  if (lastName === "") {
    errors.lastName = "Le nom ne peut pas être vide.";
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
      errors.email = "Le format de l'e-mail n'est pas correct.";
      errors.noErrors = false;
    }
  } else {
    errors.email = "L'e-mail ne peut pas être vide.";
    errors.noErrors = false;
  }

  if (password === "") {
    errors.password = "Le mot de passe ne peut pas être vide.";
    errors.noErrors = false;
  }

  return errors;
};
