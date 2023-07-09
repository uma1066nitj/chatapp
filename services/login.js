const {
  getUserLogin,
  checkUserExists,
  registerUser,
} = require("../queries/login");

const jwt = require("jsonwebtoken");

exports.userLoginService = async (email, password, type) => {
  let resp = { status: 400, message: "" };
  let secretKey =
    "f9c7f3f8d6318ef1cf2ffccad98d146a59324f5f31b6ad4efed49194b7f86fa8";
  try {
    const getUserPassCheck = await getUserLogin(email, password, type);
    if (getUserPassCheck.status === 200) {
      const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

      resp.status = 200;
      resp.message = "success";
      resp.token = token;
    } else {
      resp.message = "Either email or password is incorrect";
    }
    return resp;
  } catch (err) {
    console.log(err);
  }
};

exports.registerUserService = async (name, email, password, type) => {
  let resp = { status: 400, message: "" };
  try {
    const userExists = await checkUserExists(email);
    if (userExists) {
      resp.message = "User already exists";
    } else {
      const registrationResult = await registerUser(
        name,
        email,
        password,
        type
      );
      if (registrationResult.status === 200) {
        resp.status = 200;
        resp.message = "Registration successful";
      } else {
        resp.message = "Failed to register user";
      }
    }
    return resp;
  } catch (err) {
    console.log(err);
    resp.message = err.message;
    resp.status = 500;
    return resp;
  }
};
