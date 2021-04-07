import * as yup from "yup"

export const addMessageValidationSchema = yup.object().shape({
  content: yup.string().required("A Message is required"),
  recipientName: yup.string().required("Recipient is required"),
  recipientAddress: yup.string().required("Address is required")
})
