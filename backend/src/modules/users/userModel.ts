import { z } from "zod";

export type TypePayloadUser = {
  employee_id: string;
  company_id: string;
  username: string;
  password: string;
  role_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  created_by?: string; // จำเป็นต้องมีฟิลด์นี้
  updated_by?: string; // จำเป็นต้องมีฟิลด์นี้
  created_at: Date;
  updated_at?: Date;
};

export const LoginUserSchema = z.object({
  body: z.object({
    username: z.string().min(4).max(50),
    password: z.string().min(4).max(50),
  }),
});

export const UpdateUserSchema = z.object({
  params: z.object({
    employee_id: z.string().uuid(),
  }),
});

export const GetUserSchema = z.object({
  params: z.object({
    employee_id: z.string().uuid(),
  }),
});

export const CreateUserSchema = z.object({
  body: z.object({
    username: z.string().min(4).max(50),
    password: z.string().min(4).max(50),
    email: z.string().email(),
    first_name: z.string().min(4).max(50),
    role_id: z.string().uuid().optional(),
    company_id: z
  .string()
  .uuid()
  .optional()
  .transform((val) => (val === null || val === undefined || val === "" ? null : val)),


    last_name: z.string().min(4).max(50).optional(),
    phone_number: z.string().min(4).max(50).optional(),
    
  }),
});
