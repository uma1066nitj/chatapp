const { userLoginService, registerUserService } = require("../services/login");

exports.login = async (req, res) => {
  try {
    const { email, password, type } = req.body;
    if (!email || !password || !type) {
      return res
        .status(400)
        .json({ error: "Missing email, password, or type" });
    }
    const isUserCredCorrect = await userLoginService(email, password, type);
    if (isUserCredCorrect.status === 200) {
      return res
        .status(200)
        .json({ message: "Login Successful", token: isUserCredCorrect.token });
    }
    res.status(400).json({ error: "Something went wrong" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, type } = req.body;
    if (!email || !password || !type) {
      return res
        .status(400)
        .json({ error: "Missing email, password, or type" });
    }

    const registrationResult = await registerUserService(
      name,
      email,
      password,
      type
    );

    if (registrationResult.status === 200) {
      return res.status(200).json({ message: "Registration Successful" });
    } else {
      return res.status(400).json({ error: registrationResult.message });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
