import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent } from './home/home.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { StoryEditionComponent } from './story-edition/story-edition.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:id', component: StoryDetailComponent },
  { path: 'story/:id', component: StoryEditionComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


