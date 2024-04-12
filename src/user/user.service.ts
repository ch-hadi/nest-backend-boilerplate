import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../entities/User/User';
import { UserDto } from 'src/dto/User/User.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dto/User/Login.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}

    async createUser(user:UserDto):Promise<User>{
        try {     
        const salt = await bcrypt.genSalt(10); // Adjust rounds as needed
        const hashedPassword = await bcrypt.hash(user.password, salt);
        const newUser = await this.userRepository.create(user);
        newUser.password=hashedPassword;
        return await this.userRepository.save(newUser)
        } catch (error) {
             console.error('Error fetching user:', error);
             return error.driverError.sqlMessage;
        }

    }

    async getUserByEmail(email:string):Promise<User | undefined>{
       try {
        const user = await this.userRepository.findBy({email});
        // console.log('u',user[0])
        if(user && user.length>0){
            const firtUser = user[0]
            return firtUser
        }
        // return user
       } catch (error) {
        return error
       }
    }

    async loginUser (userData:LoginDto){
        const user = await this.userRepository.findOne({where:{email:userData.email}});
        if (!user) {
            // Handle invalid email case
            return { success: false, message: 'Invalid email or password' };
          }

        const isMatch = await bcrypt.compare(userData.password,user.password);

        if (isMatch) {
            // Login successful
            const firstName = user.firstName;
            const lastName = user.lastName;
            const email = user.email;
            const isActive = user.isActive
            return  {
                firstName,lastName,email,isActive
            } ; // Return user data without password
        }
    }

}
