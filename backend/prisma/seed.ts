import { PrismaClient,roles,users } from '@prisma/client';
import bcrypt from 'bcrypt';
import {rolesData} from "../src/common/models/roleData"

const prisma = new PrismaClient();

async function main() {

  let roldAdmin: roles | null = null;

  for (const role of rolesData) {
      const result = await prisma.roles.upsert({
          where: { role_name: role },
          update: {}, // No update needed for now
          create: {
              role_name: role,
          },
      });
      if (role === "Admin") {
        roldAdmin = result;
    }
}
if (!roldAdmin) {
  throw new Error("Admin role was not found or created.");
}


const password = "123456";
const saltRounds = 10;
const salt = await bcrypt.genSalt(saltRounds);
const hashPassword = await bcrypt.hash(password, salt);
const userAdmin = await prisma.users.upsert({
  where: {username :'admin@gmail.com'},
  update: {},
  create:{
    username:'admin@gmail.com',
    password:hashPassword,
    role_id:roldAdmin.role_id,
    email:'admin@gmail.com',
    first_name:'Admin',
    last_name:'User',
    phone_number:'1234567890',
  }
})


const companyMain = await prisma.companies.upsert({
  where: { company_name: 'Supersix' },
  update: {},
  create: {
    company_name: 'Supersix',
    company_code: 'SP1001',
    created_by: userAdmin.employee_id, 
    updated_by: userAdmin.employee_id,
    company_main: true
  },
})

const setPayloadUpdateUserAdmin = {
  company_id: companyMain.company_id,
};

const saltNoungn = await bcrypt.genSalt(saltRounds);  
  const hashPasswordNoungn = await bcrypt.hash(password, saltNoungn);
  const userNoungn = await prisma.users.upsert({
    where: { username: 'noungn1123@gmail.com' },
    update: {},
    create: {
      
      username: 'noungn1123@gmail.com',
      password: hashPasswordNoungn, 
      email: 'noungn1123@gmail.com',
      role_id: roldAdmin.role_id,
      first_name: 'noungn',
      company_id: companyMain.company_id,
      created_by: userAdmin.employee_id,
      updated_by: userAdmin.employee_id
    },
  })

  const saltKanyarat = await bcrypt.genSalt(saltRounds);  
  const hashPasswordKanyarat = await bcrypt.hash(password, saltKanyarat);
  const userKanyarat = await prisma.users.upsert({
    where: { username: 'kanyarat28042546@gmail.com' },
    update: {},
    create: {
      username: 'kanyarat28042546@gmail.com',
      password: hashPasswordKanyarat, 
      email: 'kanyarat28042546@gmail.com',
      role_id: roldAdmin.role_id,
      first_name: 'kanyarat',
      company_id: companyMain.company_id,
      created_by: userAdmin.employee_id,
      updated_by: userAdmin.employee_id
    },
  })





  // await prisma.users.create({
  //   data: {
  //     employee_id: '1',
  //     username: 'admin',
     
  //     role_id: roldAdmin.role_id,
  //     email: 'admin@example.com',
  //     first_name: 'Admin',
  //     last_name: 'User',
  //     phone_number: '1234567890',
  //     create_by: 'system',
  //     update_by: 'system',
  //   },
  // });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
