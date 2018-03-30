import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;
  constructor(private authService: AuthService, private router: Router) {
    // AngularFireAuthModule.call
    //   this.AngularFireAuthModule.subscribe(auth => {
    //   if (auth) {
    //     this.router.navigateByUrl('/home');
    //   
    // });

  }


  ngOnInit() {
  }

}
