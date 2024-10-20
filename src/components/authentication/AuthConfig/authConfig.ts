import { create } from "lodash";

export const authConfig = {
    email: {
      componentType : 'field',
      label: 'Email Address',
      type: 'email',
      required: true,
    },
    password: {
      componentType : 'field',
      label: 'Password',
      type: 'password',
      required: true,
    },
    firstName:{
      componentType : 'field',
      label: 'First Name',
      type: 'text',
      required: true,
    },
    lastName:{
      componentType : 'field',
      label: 'Last Name',
      type: 'text',
      required: true,
    },
    confirmPassword: {
      componentType : 'field',
      label: 'Confirm Password',
      type: 'password',
      required: true,
    },
    pincode:{
      componentType : 'field',
      label: 'Pincode',
      type: 'number',
      required: true,
    },
    addressLine1:{
      componentType : 'field',
      label: 'Address Line 1',
      type: 'text',
      required: true,
    },
    addressLine2:{
      componentType : 'field',
      label: 'Address Line 2',
      type: 'text',
      required: true,
    },
    city:{
      componentType : 'field',
      label: 'City',
      type: 'text',
      required: true,
    },
    state:{
      componentType : 'field',
      label: 'State',
      type: 'text',
      required: true,
    },
    country:{
      componentType : 'field',
      label: 'Country',
      type: 'text',
      required: true,
    },
    phone:{
      componentType : 'field',
      label: "Phone",
      type: "number",
      required: true,
    },
    verificationCode:{
      componentType : 'field',
      label: "Verification Code",
      type: "string",
      required: true,
    },
    otp:{
      componentType : 'field',
      label: "OTP",
      type: "number",
      required: true,
    },
    rememberMe:{
      componentType : 'checkbox',
      label: "Remember Me",
    },
    createAccount:{
      componentType : 'link',
      label: "Create Account",
      type: "text",
    },
    forgotPassword:{
      componentType : 'link',
      label: "Forgot Password?",
      type: "text",
    },
    alreadyHaveAccount:{
      componentType : 'link',
      label: "Already have an account?",
      type: "text",
    },
    TryLogin:{
      componentType : 'link',
      label: "Try Login ?",
      type: "text",
    },
    signup:{
      componentType: 'button',
      label: "Sign Up",
      type: "submit",
    },
    login:{
      componentType: 'button',
      label: "Login",
      type: "submit",
    },
    submit:{
      componentType: 'button',
      label: "Submit",
      type: "submit",
    },
    resend:{
      componentType: 'timer-button',
      label: "Resend",
      type: "submit",
    },
    resetPassword:{
      componentType : 'link',
      label: "Reset Password",
      type: "text",
    },
    rememberPassword:{
      componentType : 'link',
      label: "Remembered your password? Sign In",
      type: "text",
    },
    multiComponent:{
      componentType : 'multiComponent',
    },
    terms:{
      componentType : 'checkbox',
      label: "I agree with the terms and conditions",
    }

};
