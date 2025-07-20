const validateOtpRequest = (req, res, next) => {
  const { mobile } = req.body;
  console.log(`Validating OTP request for mobile: ${mobile}`);

  if (!mobile || !/^\d{11}$/.test(mobile)) {
    return res.status(400).json({ message: "the phone number is not valid." });
  }
  next();
};

const validateOtpVerify = (req, res, next) => {
  const { mobile, code } = req.body;
  if (!mobile || !/^\d{11}$/.test(mobile)) {
    return res.status(400).json({ message: "the phone number is not valid." });
  }
  if (!code || !/^\d{6}$/.test(code)) {
    return res.status(400).json({ message: "the otp code is not valid." });
  }
  next();
};
module.exports = { validateOtpRequest, validateOtpVerify };
