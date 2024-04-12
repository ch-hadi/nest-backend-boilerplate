import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User/User';
import { UserModule } from './user/user.module';
@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'auth',
    entities: [User],
    synchronize: true,
  }),
// TypeOrmModule.forFeature([User]),
UserModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
