import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userServices: UsersService) { }
    @Post("create")
    signUpUser(@Body() body: any) {
        return this.userServices.signUpUser(body.name, body.lastname, body.username, body.email, body.password);
    }
}
