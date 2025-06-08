import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService, Student } from '../studentservice.service';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.css'],
})
export class EditStudentComponent implements OnInit {
  student: Student = { Id: '', Name: '', Age: 0, Course: '' };
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.studentService.getStudentById(this.id).subscribe(
        (data) => {
          console.log('Loaded student:', data);
          this.student = data;
        },
        (error) => {
          console.error('Error loading student:', error);
        }
      );
    }
  }

  updateStudent() {
    // Map to backend expected format (omit Id)
    const updatedStudent = {
      Name: this.student.Name,
      Age: this.student.Age,
      Course: this.student.Course,
    };

    this.studentService.updateStudent(this.id, updatedStudent).subscribe(() => {
      this.router.navigate(['/viewstudent']);
    });
  }
}
