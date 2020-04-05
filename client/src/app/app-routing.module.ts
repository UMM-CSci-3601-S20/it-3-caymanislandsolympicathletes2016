import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewerPageComponent } from './viewer-page/viewer-page.component';
import { AddNoteComponent } from './add/add-note.component';
import { EditComponent } from './edit/edit.component';
import { OwnerComponent } from './owner/owner.component';
import { AuthGuard } from './authentication/auth.guard';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'new', component: AddNoteComponent},
  {path: 'viewers', component: ViewerPageComponent},
  {path: 'edit/:id', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
