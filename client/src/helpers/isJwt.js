const isJwt = (token) => {
  const regexJwt = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
  return regexJwt.test(token);
};


export default isJwt;