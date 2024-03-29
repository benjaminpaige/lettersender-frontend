import * as yup from "yup"

export const addMessageValidationSchema = yup.object().shape({
  content: yup.string().required("A Message is required"),
  recipientName: yup.string().required("Recipient is required"),
  recipientAddress: yup.string().required("Address is required")
})

export const signInValidationSchema = yup.object({
  password: yup
    .string()
    .min(8, "Must be at least 8 characters")
    .required("Password required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address required")
})

export const requestResetValidationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address required")
})

export const signUpValidationSchema = yup.object({
  password: yup
    .string()
    .min(8, "Must be at least 8 characters")
    .required("Password required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address required"),
  fullName: yup
    .string()
    .min(2, "Must be at least 2 characters")
    .required("Name required")
})
