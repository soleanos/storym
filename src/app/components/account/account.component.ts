import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User;
  title = 'app';
  selectedFiles: FileList;
  file: File;
  imgsrc: Observable<string>;
  color = 'primary';
  mode = 'determinate';
  progressBarValue;
  photoURL: string;
  displayName: string;
  ngOnInit() {
  }

  constructor(private storage: AngularFireStorage, private router: Router, private authService: AuthService,
    private userService: UserService, private af: AngularFireAuth) {
    authService.getAuth().subscribe(user => this.fillFieldByUser(user));
  }

  fillFieldByUser(user: firebase.User) {
    this.photoURL = user.photoURL;
    if (user.displayName) {
      this.displayName = user.displayName;
    }
  }

  uploadpic() {
    const file = this.selectedFiles.item(0);
    const uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
    const uploadTask = this.storage.upload('/profilPicture/' + uniqkey, file);
    this.imgsrc = uploadTask.downloadURL();
    uploadTask.percentageChanges().subscribe((value) => {
      this.progressBarValue = value.toFixed(2);
    });
  }

  chooseFiles(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.item(0)) {
      this.uploadpic();
    }
  }

  saveUserInfos() {
    this.authService.getAuth().subscribe(user => {
        const userUpdated = {displayName : this.displayName, photoURL : user.photoURL};
        if (this.imgsrc) {
          this.imgsrc.subscribe(src => {
            userUpdated.photoURL = src;
          });
        }
        user.updateProfile({displayName : userUpdated.displayName, photoURL : userUpdated.photoURL}).then(() => {
          this.router.navigateByUrl('/home');
        }).catch((err) => console.log(err));
      }
    );
  }

}
