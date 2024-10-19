import * as yup from 'yup'; 

export const validationConfig = {
  email: yup.string() 
    .email('Enter a valid email')
    .required('Email is required'), 

  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long') 
    .matches(/[a-z]/, 'Password must contain a lowercase letter') 
    .matches(/[A-Z]/, 'Password must contain an uppercase letter') 
    .matches(/\d/, 'Password must contain a number') 
    .matches(/[-!@#\$%\^&\*\(\)_\+=\|\[\]\{\};':"'<,>.?\/]+/, 'Password must contain a special character') ,

  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match') 
    .required('Confirm password is required'),

  pincode: yup.string().matches(/^\d{6}$/, 'Invalid PIN code (must be 6 digits)'),
  addressLine1: yup.string().required('Address line 1 is required'),
  addressLine2: yup.string(), 
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  country: yup.string().required('Country is required'),
  phone: yup.string().matches(/^\d{10}$/, 'Invalid phone number (must be 10 digits)'), 
  verifycode: yup.string().required('Enter verification code'), 
  otp: yup.number().required('Enter OTP'),
  terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
};

