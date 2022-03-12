import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { take } from 'rxjs/operators';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';

@Injectable()
export class jwtInterceptor implements HttpInterceptor {

  constructor(private account: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: User = {token:'', username:'',photoUrl:''};

    this.account.currentUser$.pipe(take(1)).subscribe((user: User | null) =>  {if (user) currentUser = user });
    if(currentUser.token){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }
    return next.handle(request)
  }
}