import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<User | null>;
  member:Member;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private memberService: MembersService
    ) {

    this.currentUser$ = this.accountService.currentUser$;
  }

  ngOnInit(): void {
    this.loadMember();
  }

  logout() {
    this.router.navigateByUrl('/');
    this.accountService.logout();
  }

  login() {
    this.accountService.login(this.model)
    .subscribe(response => {
      this.router.navigateByUrl('/members');
      console.log(response);
    });
  }

  loadMember(){
    const username = this.route.snapshot.paramMap.get('username') as string;
    this.memberService.getMember(username).subscribe(member => this.member = member)
  }
}