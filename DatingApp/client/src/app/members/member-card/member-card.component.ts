import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { Member } from 'src/app/models/member'
import { MembersService } from 'src/app/services/members.service'
import { PresenceService } from 'src/app/services/presence.service'

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() member!: Member

  constructor(
    private readonly memberService: MembersService,
    private readonly toastrService: ToastrService,
    public presence: PresenceService
  ) {}

  ngOnInit(): void {}

  toggleLike(member: Member) {
    this.memberService.addLike(member.username).subscribe(() => {
      this.toastrService.success(`You liked: ${member.knownAs}`)
    })
  }
}
