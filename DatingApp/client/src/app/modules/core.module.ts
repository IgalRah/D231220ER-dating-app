import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { ToastrModule } from 'ngx-toastr';


@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
  ],
  exports:[
    BsDropdownModule,
  ],
  declarations: []
})
export class CoreModule { }
