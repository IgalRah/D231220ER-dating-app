import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Member } from '../models/member';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member: Member;
  user: User;

  constructor(
    private accountService: AccountService,
    private memberService: MembersService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user as User
    });
   }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    });
  }


}
