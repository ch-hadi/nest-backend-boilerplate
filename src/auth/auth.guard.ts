import { CanActivate, ExecutionContext,Injectable,UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
// import { Observable } from "rxjs";

Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService:AuthService){}

    async canActivate(context: ExecutionContext): Promise<boolean|any>{
        try {
            const request = context.switchToHttp().getRequest();
            const {authorization}:any = request.headers;
            if(!authorization || authorization.trim()===''){
                throw new UnauthorizedException('Please provide a token');
            }  
            const authToken = authorization.replace(/bearer/gim, '').trim();
            const resp = await this.authService.validateToken(authToken);
            request.decodedData= resp;
            return true;
        } catch (error) {
            console.log('Auth error:', error.message);
            return false;
        }
    }
}