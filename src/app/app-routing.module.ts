import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {StoriesComponent } from './stories/stories.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'stories', pathMatch: 'full' },
  { path: 'stories', component: StoriesComponent },
  { path: 'detail/:id', component: StoryDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


