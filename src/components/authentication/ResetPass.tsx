import React, { useState } from 'react';
import PasswordReset from './resetPassword/PasswordReset';
import VerifyCode from './resetPassword/VerifyCode';
import NewPassword from './resetPassword/NewPassword';

export default function AuthFlow({setAuthType, onClose, setUserData}) {
  const [step, setStep] = useState('resetPassword');
  const [email, setEmail] = useState('');

  const handleSubmitEmail = (email: string) => {
    setEmail(email);
    setStep('verifyCode');
  };

  const handleVerify = (code: string) => {
    // Assume verification successful
    setStep('newPassword');
  };

  const resendCode = () => {
    // Resend code logic
    console.log("Resend code to", email);
  };

  const editEmail = () => {
    setStep('resetPassword');
  };

  const handlePasswordReset = (password: string) => {
    // Handle password reset logic
    console.log("Password reset to", password);
    alert("Password successfully reset!");
    setStep('signIn');
  };

  return (
    <>
      {step === 'resetPassword' && <PasswordReset handleSubmit={handleSubmitEmail} setStep={setStep} setAuthType={setAuthType} />}
      {step === 'verifyCode' && <VerifyCode handleVerify={handleVerify} resendCode={resendCode} editEmail={editEmail} setAuthType={setAuthType} />}
      {step === 'newPassword' && <NewPassword handlePasswordReset={handlePasswordReset}  />}
    </>
  );
}
