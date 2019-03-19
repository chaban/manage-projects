import { Component, OnInit } from '@angular/core';
import { UsersService } from 'projects/core-data/src/lib/users.service';
import { User } from 'projects/core-data/src/lib/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  selectedUser: User
  users

  constructor(private service: UsersService) { }

  resetUser() {
    const empty: User = {
      id: null,
      name: '',
      email: '',
      role: '',
      profile: '',
    }
    this.selectedUser = empty
  }

  ngOnInit() {
    this.list()
    this.resetUser()
  }

  selectUser(user) {
    this.selectedUser = user
  }

  cancel() {
    this.resetUser()
  }

  save(data) {
    const user = data
    user.password = 'password' // todo: !!!!!!! not forget!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (!user.id) {
      this.service.create(user).subscribe(res => {
        this.list()
        this.resetUser()
      })
    }
    else {
      this.service.update(user).subscribe(res => {
        this.list()
        this.resetUser()
      })
    }
  }

  list() {
    this.service.list().subscribe(res => this.users = res)
  }

  del(user) {
    this.service.del(user.id).subscribe(res => {
      console.log(res)
      this.list()
    })
  }

}
