import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TaskService, Task } from './task.service';

export class TaskDataSource implements DataSource<Task> {
  private tasksLengthSubject = new BehaviorSubject<number>(0);
  public tasksLength$ = this.tasksLengthSubject.asObservable();

  private tasksSubject = new BehaviorSubject<Task[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private taskService: TaskService) {}

  get filteredData(): Task[] {
    return this.tasksSubject.value;
  }

  loadTasks(filter: string, sortAttribute: string, sortDirection: string, pageIndex: number) {
    this.loadingSubject.next(true);
    this.tasksSubject.next([]);

    this.taskService
      .findTasks(filter, sortAttribute, sortDirection, pageIndex)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((tasks: Task[]) => this.tasksSubject.next(tasks));
  }

  loadTasksLength(filter: string) {
    this.taskService
      .findTasksLength(filter)
      .pipe(catchError(() => of(0)))
      .subscribe((count: number) => this.tasksLengthSubject.next(count));
  }

  connect(_collectionViewer: CollectionViewer): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  disconnect(_collectionViewer: CollectionViewer): void {
    this.tasksSubject.complete();
    this.tasksLengthSubject.complete();
    this.loadingSubject.complete();
  }
}
