export const generateRandomOTP = (length = 6) => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
};

export const formatResponse = (status, message, data = null) => {
    return {
        status,
        message,
        data,
    };
};