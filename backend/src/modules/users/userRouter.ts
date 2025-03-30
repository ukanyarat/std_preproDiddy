import express,{Request,Response} from "express";
import {
    handleServiceResponse,
    validateRequest,
} from "@common/utils/httpHandlers";
import { userService } from "@modules/users/userService";
import { LoginUserSchema,UpdateUserSchema,CreateUserSchema,GetUserSchema} from "@modules/users/userModel";
import authenticateToken from "@common/middleware/authenticateToken";
import authorizeAll from "@common/middleware/authorizeAll";


export const userRouter = (() => {
    const router = express.Router();

    // ยังไม่สมบูรณ์ รอบทำ Sprint 4
    // router.post("/register", authenticateToken, validateRequest(CreateUserSchema),  async (req: Request, res: Response) => {
    //     const payload = req.body;
    //     const ServiceResponse = await userService.create(payload);
    //     handleServiceResponse(ServiceResponse, res);
    // })
router.get("/test", (req: Request, res: Response) => {
    res.status(200).json({ status: "Server is running!" });
  });
    

    router.post("/login", validateRequest(LoginUserSchema),  async (req: Request, res: Response) => {
        const payload = req.body;
        const ServiceResponse = await userService.login(payload, res);
        handleServiceResponse(ServiceResponse, res);
    })

    router.get("/logout", async (req: Request, res: Response) => {
        const ServiceResponse = await userService.logout(res);
        handleServiceResponse(ServiceResponse, res);
    })

    router.get("/auth-status", async (req: Request, res: Response) => {
        const ServiceResponse = await userService.authStatus(req);
        handleServiceResponse(ServiceResponse, res);
    })

    router.get("/usernames", authenticateToken, async (req: Request, res: Response) => {
        const ServiceResponse = await userService.getAllUsernames();
        handleServiceResponse(ServiceResponse, res);
    })

    router.get("/get",
        authenticateToken,
        authorizeAll, 
        async (req: Request, res: Response) => {
       try{
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 12;
            const companyId = req.token.company_id;
            const searchText = (req.query.searchText as string) || "";
            const ServiceResponse = await userService.findAll(
                companyId,
                page,
                pageSize,
                searchText
            );   
            handleServiceResponse(ServiceResponse,res);
        }catch(error){
            console.error("Error in GET request:", error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    });

    router.post("/register", 
        authenticateToken, 
        authorizeAll,
        validateRequest(CreateUserSchema),  
        async (req: Request, res: Response) => {
            try{
                const {companyId, uuid} = req.token.payload;
                const userId = uuid;
                const payload = req.body;
                const ServiceResponse = await userService.create(companyId,userId,payload);
                handleServiceResponse(ServiceResponse, res);

            }
            catch(error){
                console.error("Error in POST request:", error);
                res.status(500).json({ status: "error", message: "Internal Server Error" });
            }
        })




    return router;
})()

