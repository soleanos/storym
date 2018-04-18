import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nextPage: string;
  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router
    , private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  goToAuthorHome = function () {
    this.router.navigateByUrl('/home/author');
  };
  goToReaderHome = function () {
    this.router.navigateByUrl('/home/reader');
  };

}
