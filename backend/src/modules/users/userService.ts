import {Response} from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseStatus, ServiceResponse } from "@common/models/serviceResponse";
import { userRepository } from "@modules/users/userRepository";
import { TypePayloadUser } from "@modules/users/userModel";

import { users } from "@prisma/client";
import bcrypt from "bcrypt";
import { jwtGenerator } from "@common/utils/jwtGenerator";

export const userService = {
    login: async (payload: TypePayloadUser, res: Response) => {
        try {
            const checkUser = await userRepository.findByUsername(payload.username);
            if(!checkUser){
                return new ServiceResponse(
                    ResponseStatus.Failed,
                    "The username or password is incorrect.",
                    null,
                    StatusCodes.BAD_REQUEST
                )
            }
            const password = payload.password;
            const passwordDB = checkUser.password;
            
            const isValidPassword = await bcrypt.compare(password, passwordDB);
            if (!isValidPassword) {
                return new ServiceResponse(
                    ResponseStatus.Failed,
                    "The username or password is incorrect.",
                    null,
                    StatusCodes.BAD_REQUEST
                )
            }
            
            const uuid = checkUser.employee_id;
            const role = checkUser.role_id;
            const companyId = checkUser.company_id;

            const dataPayload = {
                uuid: uuid,
                role: role,
                companyId: companyId
            }
            const token = await jwtGenerator.generate(dataPayload);
            res.cookie('token', token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV !== 'production',
                maxAge: 3600000 
            });
            return new ServiceResponse(
                ResponseStatus.Success,
                "User authenticated successfully.",
                null,
                StatusCodes.OK
            )
        } catch (ex) {
            const errorMessage = "Error create user :" + (ex as Error).message;
            return new ServiceResponse(
              ResponseStatus.Failed,
              errorMessage,
              null,
              StatusCodes.INTERNAL_SERVER_ERROR
            );  
        }
    },

    logout: (res: Response) => {
        try {
            res.clearCookie('token', {
                httpOnly: true, 
                secure: process.env.NODE_ENV !== 'production', 
                sameSite: 'strict'
            });
    
            return new ServiceResponse(
                ResponseStatus.Success,
                "User logged out successfully.",
                null,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = "Error during logout: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );  
        }
    },
    getAllUsernames: async () => {
        try {
            const usernames = await userRepository.findAllUsernames();
            return new ServiceResponse(
                ResponseStatus.Success,
                "Retrieved all usernames successfully.",
                usernames,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = "Error retrieving usernames: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }  ,

    authStatus:(req: any) => {
        try {
            const token = req.cookies.token;
            if (token) {
                return new ServiceResponse(
                    ResponseStatus.Success,
                    "User authenticated successfully",
                    null,
                    StatusCodes.OK
                );
            }else {
                return new ServiceResponse(
                    ResponseStatus.Success,
                    "Authentication required",
                    null,
                    StatusCodes.OK
                )
            }  
        } catch (ex) {
            const errorMessage = "Error auth status: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );  
        }
    },
    findAll: async (
        companyId:string,
        page:number=1,
        pageSize:number=12,
        searchText:string="",
      ) => {
        try{
          const skip = (page-1)*pageSize;
          const tool = await userRepository.findAll(
            companyId,
            skip,
            pageSize,
            searchText);
          const totalCount = await userRepository.count(companyId,searchText);
          return new ServiceResponse(
            ResponseStatus.Success,
            "Get all success",
            {
              data: tool,
              totalCount,
              totalPages: Math.ceil(totalCount/pageSize),
            },
            StatusCodes.OK
          );
        }catch(ex){
          const errorMessage = "Error Find All Tool :" + (ex as Error).message;
          return new ServiceResponse(
            ResponseStatus.Failed,
            errorMessage,
            null,
            StatusCodes.INTERNAL_SERVER_ERROR
          );
        }
    },

    create: async (companyId: string,userId: string, payload: TypePayloadUser
    ) => {
        try {
            const username = payload.username?.trim();
            const checkUser = await userRepository.findById3(companyId,username);
            if(checkUser){
                return new ServiceResponse(
                    ResponseStatus.Failed,
                    "Username already taken",
                    null,
                    StatusCodes.BAD_REQUEST
                )
            }
            const user = await userRepository.create(companyId,userId,payload);
            console.log(`หน้า2`,companyId);
            return new ServiceResponse<users>(
                ResponseStatus.Success,
                "Create user success",
                user,
                StatusCodes.OK
            )
        } catch (ex) {
            const errorMessage = "Error create user :" + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    },


}