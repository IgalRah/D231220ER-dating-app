import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { take } from 'rxjs/operators'

import { Gender } from '../models/Gender.enum'
import { User } from '../models/user'
import { AccountService } from '../services/account.service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private account: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser: User = {
      token: '',
      username: '',
      photoUrl: '',
      knownAs: '',
      gender: Gender.female,
    }

    this.account.currentUser$.pipe(take(1)).subscribe((user: User | null) => {
      if (user) currentUser = user
    })
    if (currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
    }
    return next.handle(request)
  }
}
