import { Injectable } from '@angular/core'
import { UrlSegment } from '@angular/router'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { ToastrService } from 'ngx-toastr'
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment'

import { User } from '../models/user'

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  hubUrl = environment.hubUrl
  private onlineUsersSource$ = new BehaviorSubject<string[]>([])
  onlineUsers$ = this.onlineUsersSource$.asObservable()
  private hubConnection: HubConnection

  constructor(private toast: ToastrService) {}

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubUrl}presence`, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection.start().catch((err) => console.log(err))

    this.hubConnection.on('UserIsOnline', (username) => {
      this.toast.info(`${username} has connected`)
    })

    this.hubConnection.on('UserIsOffline', (username) => {
      this.toast.info(`${username} has disconnected`)
    })

    this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
      this.onlineUsersSource$.next(usernames)
      // this.toast.info(`${usernames} are  currently connected`)
    })
  }

  stopHubConnection() {
    this.hubConnection.stop().catch((err) => console.log(err))
  }
}
