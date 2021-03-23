import { object, string, InferType } from 'yup';

export const newsletterSchema = object({
  email: string().email('Invalid email').required('Email is required')
});

type NewsletterType = InferType<typeof newsletterSchema>;

export default NewsletterType;
