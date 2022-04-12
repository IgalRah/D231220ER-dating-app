import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MemberDetailComponent } from '../members/member-detail/member-detail.component'
import { MemberListComponent } from '../members/member-list/member-list.component'
import { MemberMessagesComponent } from '../members/member-messages/member-messages.component'
import { MemberDetailedResolver } from '../resolvers/member-detailed.resolver'
import { SharedModule } from './shared.module'

const routes: Routes = [
  { path: '', component: MemberListComponent, pathMatch: 'full' },
  {
    path: ':username',
    component: MemberDetailComponent,
    resolve: {
      member: MemberDetailedResolver,
    },
  },
]

@NgModule({
  declarations: [
    MemberListComponent,
    MemberDetailComponent,
    MemberMessagesComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule, MemberListComponent, MemberDetailComponent],
})
export class MembersModule {}
