import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { take } from 'rxjs/operators'
import { Member } from 'src/app/models/member'
import { User } from 'src/app/models/user'
import { AccountService } from 'src/app/services/account.service'
import { MembersService } from 'src/app/services/members.service'

import { Pagination } from './../../models/pagination'
import { UserParams } from './../../models/userParams'

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members: Member[]
  pagination: Pagination
  userParams: UserParams
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ]
  loading = false

  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.UserParams
  }

  ngOnInit(): void {
    this.loadMembers()
  }

  loadMembers() {
    this.loading = true

    this.memberService.UserParams = this.userParams

    this.memberService.getMembers(this.userParams).subscribe((res) => {
      this.members = res.result
      this.pagination = res.pagination

      this.loading = false
    })
  }

  pageChanged({ page }: any) {
    this.userParams.pageNumber = page
    this.memberService.UserParams = this.userParams
    this.loadMembers()
  }

  resetFilters() {
    this.userParams = this.memberService.resetUserParams()
    this.loadMembers()
  }
}
