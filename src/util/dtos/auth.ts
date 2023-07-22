import Joi from 'joi'

export const userSignupDto = Joi.object({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    email: Joi.string().max(50).required(),
    password: Joi.string().min(8).required(),
    DateOfBirth: Joi.date(),
    Gender: Joi.string().valid('Male', 'Female', 'other'),
    //countryCode: Joi.string().valid('PK').required(),
    phoneNumber: Joi.string().pattern(/^[0-9]{7,15}$/).required(),
    role: Joi.string().required()
});

export const vendorSignupDto = Joi.object({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    email: Joi.string().max(50).required(),
    password: Joi.string().min(8).required(),
    DateOfBirth: Joi.date(),
    companyName: Joi.string().required(),
    Gender: Joi.string().valid('Male', 'Female', 'other'),
    //countryCode: Joi.string().valid('PK').required(),
    phoneNumber: Joi.string().pattern(/^[0-9]{7,15}$/).required(),
    role: Joi.string().required()
});

export const adminSignupDto = Joi.object({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    email: Joi.string().max(50).required(),
    password: Joi.string().min(8).required()

})

export  const loginDto = Joi.object({
    userName: Joi.string().max(50).trim(),
    email: Joi.string().max(50),
    password: Joi.string().min(8).required(),

})

export const forgotDto = Joi.object({
    _id: Joi.string().optional(),
    email: Joi.string().max(50).optional(),
    enterOtp: Joi.number().min(6).optional(),
    newPassword: Joi.string().min(8).optional(),
    confirmPassword: Joi.string().min(8).optional()
})