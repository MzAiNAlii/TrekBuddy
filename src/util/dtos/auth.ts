import Joi from "joi";

export const UserSignupDto = Joi.object({
  firstName: Joi.string().max(50).required(),
  lastName: Joi.string().max(50).optional(),
  email: Joi.string().max(50).required(),
  password: Joi.string().min(8).required(),
  DateOfBirth: Joi.string().optional(),
  Gender: Joi.string().valid("Male", "Female", "other"),
  //countryCode: Joi.string().valid('PK').required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{7,15}$/)
    .required(),
  //role: Joi.string(),
});

export const ResetPasswordDto = Joi.object({
  userId: Joi.string().optional().required(),
  newPassword: Joi.string().min(8).required(),
  confirmPassword: Joi.string().min(8).required(),
});

export const VerifyOtpDto = Joi.object({
  userId: Joi.string().required(),
  otp: Joi.string().min(6).required(),
});

export const SendOtpDto = Joi.object({
  email: Joi.string().required(),
});

export const LoginDto = Joi.object({
  // userName: Joi.string().max(50).trim(),
  email: Joi.string().max(50).required(),
  password: Joi.string().min(8).required(),
});

export const VendorSignupDto = Joi.object({
  firstName: Joi.string().max(50).required(),
  lastName: Joi.string().max(50).optional(),
  email: Joi.string().max(50).required(),
  password: Joi.string().min(8).required(),
  DateOfBirth: Joi.date().optional(),
  companyName: Joi.string().required(),
  Gender: Joi.string().valid("Male", "Female", "other"),
  //countryCode: Joi.string().valid('PK').required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{7,15}$/)
    .required(),
  //role: Joi.string(),
});

export const UpdateInfoDto = Joi.object({
  userName: Joi.string(),
  DateOfBirth: Joi.date().optional(),
  contactNumber: Joi.string()
    .pattern(/^[0-9]{7,15}$/)
    .optional(),
  companyName: Joi.string().optional(),
});

export const adminSignupDto = Joi.object({
  firstName: Joi.string().max(50).required(),
  lastName: Joi.string().max(50).required(),
  email: Joi.string().max(50).required(),
  password: Joi.string().min(8).required(),
});
