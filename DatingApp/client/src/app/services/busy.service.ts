import { Injectable } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyRequestCount = 0
  constructor(private spinnerService: NgxSpinnerService) {}

  busy() {
    this.busyRequestCount++
    this.spinnerService.show(undefined, {
      bdColor: 'rgb(255,255,255,0)',
      color: '#333333',
      type: 'ball-clip-rotate',
    })
  }

  idle() {
    this.busyRequestCount--
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0
      this.spinnerService.hide()
    }
  }
}
