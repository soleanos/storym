import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent } from './home/home.component';
import { StoryEditionComponent } from './story-edition/story-edition.component';
import { StoryTestComponent } from './story-test/story-test.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'story/:id', component: StoryEditionComponent },
  { path: 'test/:id', component: StoryTestComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


