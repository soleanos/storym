import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard';
// import { AuthGuard } from './services/auth.service';

import { HomeComponent } from './components/home/home.component';
import { StoryEditionComponent } from './components/story-edition/story-edition.component';
import { StoryTestComponent } from './components/story-test/story-test.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,  canActivate: [AuthGuard]},
  { path: 'story/:id', component: StoryEditionComponent, canActivate: [AuthGuard] },
  { path: 'test/:id', component: StoryTestComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


