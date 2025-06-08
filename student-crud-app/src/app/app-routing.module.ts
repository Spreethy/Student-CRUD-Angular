import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewStudentComponent } from './viewstudent/viewstudent.component';
import { AddStudentComponent } from './addstudent/addstudent.component';
import { EditStudentComponent } from './editstudent/editstudent.component';

const routes: Routes = [
  { path: '', redirectTo: '/viewstudent', pathMatch: 'full' },
  { path: 'viewstudent', component: ViewStudentComponent },
  { path: 'addstudent', component: AddStudentComponent },
  { path: 'editstudent/:id', component: EditStudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
