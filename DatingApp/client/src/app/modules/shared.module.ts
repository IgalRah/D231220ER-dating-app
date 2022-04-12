import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgxGalleryModule } from '@kolkov/ngx-gallery'
import { FileUploadModule } from 'ng2-file-upload'
import { ButtonsModule } from 'ngx-bootstrap/buttons'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { NgxSpinnerModule } from 'ngx-spinner'
import { TimeagoModule } from 'ngx-timeago'
import { ToastrModule } from 'ngx-toastr'

import { MemberCardComponent } from '../members/member-card/member-card.component'

@NgModule({
  imports: [
    NgxGalleryModule,
    CommonModule,
    RouterModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot(),
  ],
  declarations: [MemberCardComponent],
  exports: [
    ButtonsModule,
    NgxGalleryModule,
    TabsModule,
    BsDropdownModule,
    ToastrModule,
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule,
    FormsModule,
    PaginationModule,
    TimeagoModule,
    MemberCardComponent,
  ],
})
export class SharedModule {}
