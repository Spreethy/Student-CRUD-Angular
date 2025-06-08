import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Student {
  Id: string;
  Name: string;
  Age: number;
  Course: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'https://localhost:44366/api/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  addStudent(student: Omit<Student, 'Id'>): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student).pipe(catchError(this.handleError));
  }

  updateStudent(id: string, student: Omit<Student, 'Id'>): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student).pipe(catchError(this.handleError));
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Server error:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
