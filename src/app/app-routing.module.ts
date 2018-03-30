import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// import { AuthGuard } from './services/auth.service';

import { HomeComponent } from './components/home/home.component';
import { StoryEditionComponent } from './components/story-edition/story-edition.component';
import { StoryTestComponent } from './components/story-test/story-test.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'story/:id', component: StoryEditionComponent },
  { path: 'test/:id', component: StoryTestComponent },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


