import { z } from 'zod';

const signUp = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.enum(['admin', 'customer'] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    contactNo: z.string({
      required_error: 'Contact No is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    profileImg: z.string({
      required_error: 'Profile Image is required',
    }),
  }),
});

const signIn = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is Required' }),
    password: z.string({ required_error: 'Password is Required' }),
  }),
});

export const AuthValidation = {
  signUp,
  signIn,
};
