const { User } = require("../../model");
const { Conflict } = require("http-errors");
const { nanoid } = require("nanoid");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../../helpers/sendEmail");
const { sendSampleEmail } = require("../../services/sendSampleEmail");


const registration = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Allready registration");
  }
  const hashPasword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verifyToken = nanoid();
  const result = await User.create({
    name,
    email,
    password: hashPasword,
    verifyToken,
  });
  const emailVerify = {
    to: email,
    subject: "Сonfirmation of registration",
    html: `${sendSampleEmail(verifyToken)}`,
  };
  await sendEmail(emailVerify);

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Success register",
    data: { name, email, verifyToken },
  });
};

module.exports = registration;
