import { object, string, number, InferType } from 'yup';

export const commentSchema = object({
  id: string().optional(),
  name: string().required('Name is required'),
  email: string().email('Invalid email').required('Email is required'),
  text: string().required('Text is required'),
  eventId: number().optional()
});

type CommentType = InferType<typeof commentSchema>;

export default CommentType;
