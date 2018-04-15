import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

import { HomeAuthorComponent } from './components/home-author/home-author.component';
import { StoryEditionComponent } from './components/story-edition/story-edition.component';
import { StoryTestComponent } from './components/story-test/story-test.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AccountComponent } from './components/account/account.component';
import { StoryManagementComponent } from './components/story-management/story-management.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home/author', pathMatch: 'full' },
  { path: 'home/author', component: HomeAuthorComponent,  canActivate: [AuthGuard]},
  { path: 'story/:id', component: StoryEditionComponent, canActivate: [AuthGuard] },
  { path: 'test/:id', component: StoryTestComponent, canActivate: [AuthGuard] },
  { path: 'login/:nextPage', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegistrationComponent},
  { path: 'story-edit/:id', component: StoryManagementComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


