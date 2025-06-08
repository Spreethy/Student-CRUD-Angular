import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService, Student } from '../studentservice.service';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css'],
})
export class AddStudentComponent {
  student: Omit<Student, 'Id'> = { Name: '', Age: null, Course: '' };


  constructor(private studentService: StudentService, private router: Router) {}

  addStudent() {
    this.studentService.addStudent(this.student).subscribe(() => {
      this.router.navigate(['/viewstudent']);
    });
  }
}
