import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewerPageComponent } from './viewer-page/viewer-page.component';
import { AddNoteComponent } from './add/add-note.component';
import { EditComponent } from './edit/edit.component';
import { OwnerComponent } from './owner/owner.component';


const routes: Routes = [
  //{path: '', component: LoginComponent}
  {path: ':owner', component: OwnerComponent},
  {path: ':owner/edit', component: EditComponent},
  {path: ':owner/new', component: AddNoteComponent},
  {path: ':owner/viewers', component: ViewerPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
