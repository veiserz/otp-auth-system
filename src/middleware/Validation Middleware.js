// اعتبارسنجی شماره موبایل برای درخواست OTP
const validateOtpRequest = (req, res, next) => {
  const { mobile } = req.body;
  // شماره موبایل باید وجود داشته باشد و 11 رقم عددی باشد (فرمت ایران)
  if (!mobile || !/^\d{11}$/.test(mobile)) {
    return res.status(400).json({ message: "شماره موبایل نامعتبر است." });
  }
  next();
};

const validateOtpVerify = (req, res, next) => {
  const { mobile, code } = req.body;
  if (!mobile || !/^\d{11}$/.test(mobile)) {
    return res.status(400).json({ message: "شماره موبایل نامعتبر است." });
  }
  if (!code || !/^\d{6}$/.test(code)) {
    return res.status(400).json({ message: "کد OTP نامعتبر است." });
  }
  next();
};
module.exports = { validateOtpRequest, validateOtpVerify };
