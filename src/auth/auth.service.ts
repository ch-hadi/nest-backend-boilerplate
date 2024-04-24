import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(private readonly jwtService:JwtService){}
    async validateToken(token:any):Promise<any>{
      try {
         const decoded = this.jwtService.verify(token);
         return decoded
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    }
    async signIn(user:{email:string,id:number}):Promise<string>{
        const payload = {
            username:user.email,
            id:user.id
        }
        const secretKey = 'your-secret-key';

        // Set the expiration time (1 hour in this example)
        const expiresIn = '1h';
        return this.jwtService.sign(payload, { secret: secretKey, expiresIn })
    }
}