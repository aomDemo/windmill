import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PAGE_SIZE, TaskService, Task } from './task.service';
import { FormControl } from '@angular/forms';
import { TaskDataSource } from './task.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsDialogComponent } from './task-details-dialog/task-details-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  pageSize = PAGE_SIZE;
  searchControl = new FormControl('');
  currentSearchString: string;

  displayedColumns: string[] = ['location', 'distance', 'deadline', 'description', 'download'];
  dataSource: TaskDataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  get manualNavigationPages(): number[] {
    const currentPage = this.paginator.pageIndex;
    const pages = [currentPage];

    if (this.paginator.hasPreviousPage()) {
      pages.unshift(currentPage - 1);
    }
    if (this.paginator.hasNextPage()) {
      pages.push(currentPage + 1);
    }

    return pages;
  }

  onSearch() {
    this.paginator.pageIndex = 0;
    this.currentSearchString = this.searchControl.value;
    this.updateTasksLength();
    this.loadTasksPage();
  }

  moveToPage(pageNumber: number) {
    this.paginator.pageIndex = pageNumber;
    this.paginator.page.next({
      pageIndex: pageNumber,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length
    });
  }

  onOpenDetails(task: Task) {
    const dialogRef = this.dialog.open(TaskDetailsDialogComponent);
    dialogRef.componentInstance.task = task;
  }

  ngOnInit() {
    this.dataSource = new TaskDataSource(this.taskService);
    this.loadTasksPage();
    this.updateTasksLength();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadTasksPage()))
      .subscribe();
  }

  private loadTasksPage() {
    this.dataSource.loadTasks(
      this.currentSearchString,
      this.sort.direction && this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex
    );
  }

  private updateTasksLength() {
    this.dataSource.loadTasksLength(this.currentSearchString);
  }
}
