import { Gender } from './Gender.enum'
import { User } from './user'

export class UserParams {
  gender: Gender
  minAge = 18
  maxAge = 120
  pageNumber = 1
  pageSize = 4 // TODO: Increase this value
  orderBy = 'lastActive'

  constructor(user: User) {
    this.gender = user.gender === Gender.female ? Gender.male : Gender.female
  }
}
