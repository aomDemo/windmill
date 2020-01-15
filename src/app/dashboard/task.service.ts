import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export const PAGE_SIZE = 10;

export class Task {
  location: string;
  distance: number;
  deadline: Date;
  description: string;
  documentUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  findTasksLength(filter = ''): Observable<number> {
    const query = filter ? `description like "${filter}"` : '';

    // TODO: load number of objects
    return of(25);
  }

  findTasks(filter = '', sortAttribute = '', sortDirection = 'asc', pageNumber = 0): Observable<Task[]> {
    const query = `description like "${filter}" offset ${pageNumber * PAGE_SIZE} limit ${PAGE_SIZE}`;

    // TODO: load objects and return them
    const fakeTask = new Task();
    fakeTask.location = 'Oslo';
    fakeTask.distance = 55.3;
    fakeTask.description = 'Dead birds everywhere';
    fakeTask.deadline = new Date();
    fakeTask.documentUrl = 'http://www.orimi.com/pdf-test.pdf';

    return of([fakeTask, fakeTask, fakeTask, fakeTask, fakeTask, fakeTask, fakeTask, fakeTask, fakeTask, fakeTask]).pipe(delay(500));
  }

  constructor() {}
}
