import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from 'src/entities/User/User';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/User/User.dto';
import { LoginDto } from 'src/dto/User/Login.dto';
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService) {}
   
    @Get(":email")
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
                success:true,
                data:newUser
            }
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

        if(loginUser){
            return{
                success:true,
                data:loginUser
            }
        }      
        return{
            success:false,
            message:'Email or Password does not match!'
        }  
       } catch (error) {
        return{
            success:false,
            message:error
        }
       }
    }
}
