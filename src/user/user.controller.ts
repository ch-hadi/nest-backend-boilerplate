import { Body, Controller, Get, Param, Post,UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/User/User.dto';
import { LoginDto } from 'src/dto/User/Login.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService,
        private readonly  authService:AuthService
    ) {}
   
    @Get(":email")
    @UseGuards(AuthGuard)
    async getUserByEmail(@Param('email') email:string){
        try {
            const user = await this.userService.getUserByEmail(email);
            if(user){
                return {
                    success:true,
                    data:user
                }
            }
            return {
                success:true,
                message:"User not found"
            }
        } catch (error) {
            return {
                success:false,
                message:error
            }
        }

    }

    @Post()
    async createUser(@Body() user:UserDto){
       try {
        const newUser = await this.userService.createUser(user);
        if(newUser){
            return {
                success: true,
                data: {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email
                }
            };
        }
        if(newUser){
            return {
                success:true,
                message:'User not created.'
            }
        }
       } catch (error) {
        return {
            success:false,
            message:'User not created.',
            error:error
        }
       }
    }

    @Post('login')
    async login(@Body() loginDto:LoginDto){
       try {
        const loginUser = await this.userService.loginUser(loginDto);
        if(loginUser.id){
            const token = await this.authService.signIn({email:loginUser.email,id:loginUser.id});
            return{
                success:true,
                data:loginUser,
                token:token
            }
        }      
        return{
            success:false,
            message:'Email or Password does not match!'
        }  
       } catch (error) {
        console.log(error)
        return{
            success:false,
            message:error
        }
       }
    }
}
