import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewerPageComponent } from './viewer-page/viewer-page.component';
import { AddNoteComponent } from './add/add-note.component';
import { EditComponent } from './edit/edit.component';
import { OwnerComponent } from './owner/owner.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'new', component: AddNoteComponent},
  {path: 'viewers', component: ViewerPageComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: ':owner', component: OwnerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
