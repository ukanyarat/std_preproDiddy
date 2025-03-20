import { users,roles } from "@prisma/client";
import prisma from "@src/db";

import { TypePayloadUser } from "@modules/users/userModel";
import bcrypt from "bcrypt";

import { rolesData } from "@common/models/roleData";

async function main() {
  let roldAdmin: roles | null = null;

  for (const role of rolesData) {
      const result = await prisma.roles.upsert({
          where: { role_name: role },
          update: {},
          create: {
              role_name: role,
          },
      });

      // Save the result for the Admin role
      if (role === "Admin") {
          roldAdmin = result;
      }
  }

  if (!roldAdmin) {
    throw new Error("Admin role was not found or created.");
  }
  const roleId = roldAdmin.role_id;
}

  

export const Keys = [

  "employee_id",
  "company_id",
  "username",
  "password",
  "role_id",
];

export const KeysFindUsername = [
  "employee_id",
  "company_id",
  "username",
  "password",
  "role_id",
];

export const userRepository = {

  findByUsername: async <Key extends keyof users>(
    username: string,
    keys = KeysFindUsername as Key[]
  ) => {
    return prisma.users.findUnique({
      where: { username: username },
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    }) as Promise<Pick<users, Key> | null>;
  },
  findById: async <Key extends keyof users>(
    uuid: string,

    keys = KeysFindUsername as Key[]
  ) => {
    return prisma.users.findUnique({
      where: { employee_id: uuid },
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    }) as Promise<Pick<users, Key> | null>;
  },

  create: async (companyId: string, userId: string, payload: TypePayloadUser) => {

    // Payload
    const usernameTrim = payload.username.trim();
    const passwordTrim = payload.password.trim();
    const emailTrim = payload.email.trim();
    
    const firstName = payload.first_name.trim();
    const is_active = true;
   
    const roldAdmin = await prisma.roles.findUnique({
      where: { role_name: "Admin" },  // หาบทบาทที่ชื่อว่า "Admin"
  });

  // ตรวจสอบว่า roldAdmin ไม่เป็น null
  if (!roldAdmin) {
    throw new Error("Admin role not found");
  }

  //const role_id = roldAdmin.role_id;
    

    // Hash Password using bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(passwordTrim, salt);

    // setPayload
    const setPayload: any = {
      company_id: companyId,
      username: usernameTrim,
      password: hashPassword,
      role_id: payload.role_id?.trim(),
      email: payload.email?.trim(),
      first_name: payload.first_name?.trim(),
      last_name: payload.last_name?.trim(),
      phone_number: payload.phone_number?.trim(),
      created_by: userId,
      updated_by: userId,
      //employee_code: payload.employee_code?.trim(), 
    };
    console.log("setPayload before creating user:", setPayload);


    return await prisma.users.create({
      data: setPayload
    });
  },
  count: async (companyId: string, searchText?: string) => {
    return await prisma.users.count({
      where: {
        company_id: companyId, // เพิ่มเงื่อนไข companyId
        ...(searchText
          ? {
              OR: [
                {
                  username: {
                    contains: searchText,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {}),
      },
    });
  },

  findAll: async (
    companyId: string,
    skip: number,
    take: number,
    searchText: string
  ) => {
    return await prisma.users.findMany({
      where: searchText
        ? {
            OR: [
              {
                username: {
                  contains: searchText,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}, // ถ้าไม่มี searchText ก็ไม่ต้องใช้เงื่อนไขพิเศษ
      skip,
      take,
      orderBy: { created_at: "asc" },
    });
  },

  findByName: async (companyId: string, username: string) => {
    return prisma.users.findFirst({
      where: { company_id: companyId, username: username },
    });
  },

  update: async (
    companyId: string,
    userId: string,
    customer_id: string,
    payload: TypePayloadUser
  ) => {
    
    let hashPassword: string | undefined;
  if (payload.password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    hashPassword = await bcrypt.hash(payload.password.trim(), salt);
  }

    const setPayload = {
        employee_id: payload.employee_id,
        company_id: payload.company_id ?? null, // ถ้าเป็น undefined ให้ใช้ null
        username: payload.username,
        password: hashPassword || undefined,
        role_id: payload.role_id,
        email: payload.email,
        first_name: payload.first_name,
        last_name: payload.last_name ?? null, // ใช้ null ถ้าไม่ได้ระบุ
        phone_number: payload.phone_number ?? null, // ใช้ null ถ้าไม่ได้ระบุ
        updated_at: payload.updated_at || new Date(),
        updated_by: payload.updated_by ?? null, // ใช้ null ถ้าไม่ได้ระบุ
      };
    return await prisma.users.update({
      where: { company_id: companyId, employee_id: userId },
      data: setPayload,
    });
  },
  findById2: async (companyId: string, employee_id: string,) => {
    return prisma.users.findFirst({
      where: {
        company_id: companyId,
        employee_id: employee_id,
      },
      select: Keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}), // Use Keys array
    });
  },
  findById3: async (companyId: string,username:string) => {
    return prisma.users.findFirst({
      where: {
        company_id: companyId,
        username: username
      },
      select: Keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}), // Use Keys array
    });
  },
  findAllUsernames: async () => {
    return prisma.users.findMany({
      select: {
        username: true,
      },
    });
  },
};
