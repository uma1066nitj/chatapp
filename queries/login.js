const dbConnection = require("../helper/database/dbConnection");

exports.registerUser = async (name, email, password, type) => {
  let resp = { status: 400, message: "" };
  try {
    const query = `INSERT INTO users (name, email, password, type, is_deleted) VALUES (?, ?, ?, ?, 0)`;

    const [result] = await dbConnection.query(query, [
      name,
      email,
      password,
      type,
    ]);

    if (result.affectedRows === 1) {
      resp.status = 200;
      resp.message = "User registered successfully";
    } else {
      resp.message = "Failed to register user";
    }
    return resp;
  } catch (error) {
    console.error("Error executing the query: ", error);
    throw error;
  }
  s;
};

exports.checkUserExists = async (email) => {
  try {
    const query = `SELECT COUNT(*) AS count FROM users WHERE email = ?`;

    const [rows] = await dbConnection.query(query, [email]);

    const count = rows[0].count;

    return count > 0;
  } catch (error) {
    console.error("Error executing the query: ", error);
    throw error;
  }
};

exports.getUserLogin = async (email, password, type) => {
  let resp = { status: 400, message: "" };
  try {
    let query =
      "SELECT count(*) as count FROM users WHERE email = ? AND password = ? AND type = ? AND is_deleted = 0";
    const [results] = await dbConnection.query(query, [email, password, type]);

    const count = results[0].count;
    if (count === 1) {
      resp.status = 200;
      resp.message = "success";
    } else {
      resp.message = "failure";
    }

    return resp;
  } catch (error) {
    resp.status = 500;
    resp.message = "Something went wrong";
    return resp;
  }
};
