import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewerPageComponent } from './viewer-page/viewer-page.component';
import { AddNoteComponent } from './add/add-note.component';
import { EditComponent } from './edit/edit.component';
import { AuthGuard } from './authentication/auth.guard';
import { OwnerComponent } from './owner/owner.component';

const routes: Routes = [
  {path: '', component: OwnerComponent, canActivate: [AuthGuard]},
  {path: 'new', component: AddNoteComponent, canActivate: [AuthGuard]},
  {path: ':x500', component: ViewerPageComponent},
  {path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard]},
  {path: ':id/edit', component: EditComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
