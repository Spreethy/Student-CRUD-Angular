import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService, Student } from '../studentservice.service';

@Component({
  selector: 'app-viewstudent',
  templateUrl: './viewstudent.component.html',
  styleUrls: ['./viewstudent.component.css'],
})
export class ViewStudentComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (data) => (this.students = data),
      (error) => console.error('Error loading students', error)
    );
  }

  editStudent(id: string | undefined): void {
    if (!id) {
      console.error('Invalid student id:', id);
      return;
    }
    this.router.navigate(['/editstudent', id]);
  }

  deleteStudent(id: string): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }

  // Add this method to fix the error:
  goToAddStudent(): void {
    this.router.navigate(['/addstudent']);
  }
}
