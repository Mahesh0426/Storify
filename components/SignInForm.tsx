"use client";
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import { z } from "zod";
import { signUpSchema } from "@/Schemas/signUpSchema";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const SignInForm = () => {
  //states
  const [verifying, setVerifying] = useState(false);

  //from clerk
  const { signUp, isLoaded, setActive } = useSignUp();

  //from react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  // function to handle form submit
  const onSubmit = async () => {};

  // function to handle otp submit
  const handleVerificationSubmit = async () => {};

  //form veryting for OTP
  if (verifying) {
    return <h1>this is OtP verifying</h1>;
  }
  return <h1>SignInForm foem with email and other </h1>;
};

export default SignInForm;
