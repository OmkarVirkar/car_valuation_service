import {NestInterceptor, ExecutionContext, CallHandler, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session || {}; // Get the userId from the session
        if(userId) {
            const user = await this.usersService.findOne(userId); // Fetch the user from the database
            request.currentUser = user; // Attach the user to the request object
        }
        
        return next.handle();
    }
}