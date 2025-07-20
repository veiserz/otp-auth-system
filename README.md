# OTP Auth System

سیستم احراز هویت با OTP و JWT، همراه با داکیومنت Swagger و Docker Compose.

## Overview

This project implements an OTP (One-Time Password) authentication system using Express.js with an MVC architecture. It provides a secure way to authenticate users through OTPs sent to their registered contact methods.

## Project Structure

```
otp-auth-system
├── src
│   ├── config
│   │   └── db.js          # Database configuration settings
│   ├── controllers
│   │   └── otpController.js # Handles OTP-related requests
│   ├── models
│   │   └── otpModel.js    # Defines the OTP data structure
│   ├── routes
│   │   └── otpRoutes.js    # Sets up OTP-related routes
│   ├── services
│   │   └── otpService.js   # Contains business logic for OTPs
│   ├── utils
│   │   └── index.js        # Utility functions
│   └── app.js              # Entry point of the application
├── package.json             # NPM configuration file
└── README.md                # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd otp-auth-system
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the application:
   ```
   npm start
   ```
2. The server will run on `http://localhost:3000`.

## Features

- Generate and send OTPs to users.
- Verify OTPs for authentication.
- Configurable database connection using Sequelize.

## نحوه اجرا

1. نصب وابستگی‌ها:

   ```bash
   npm install
   ```

2. اجرای پروژه با Docker:

   ```bash
   docker-compose up --build
   ```

3. اجرای migration Prisma:

   ```bash
   docker-compose exec app npx prisma migrate dev --name init
   ```

4. مشاهده داکیومنت Swagger:
   ```
   http://localhost:3000/api-docs
   ```

## مسیرهای اصلی API

- `POST /otp/request` : دریافت OTP
- `POST /otp/verify` : تایید OTP و دریافت JWT
- `GET /user/profile` : دریافت پروفایل کاربر (نیازمند JWT)

## نکات مهم

- فایل `.env` را در ریپو قرار ندهید (اطلاعات حساس).
- دیتابیس و Redis با Docker Compose اجرا می‌شوند.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
