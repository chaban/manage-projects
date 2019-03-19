import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Manage Projects';

  links = [
    { path: '/home', icon: 'home', title: 'Home' },
    { path: '/users', icon: 'face', title: 'Users' }
  ]
}
