import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddNoteComponent } from './add/add-note.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'new', component: AddNoteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
