import { TestBed } from '@angular/core/testing';

import { StudentService } from './studentservice.service';

describe('StudentserviceService', () => {
  let service: StudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
