import { Component, Input } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';
import { CoordinatesService, Direction } from 'angular-coordinates';

@Component({
  selector: 'app-task-details-dialog',
  templateUrl: './task-details-dialog.component.html',
  styleUrls: ['./task-details-dialog.component.scss']
})
export class TaskDetailsDialogComponent {
  @Input() task: Task;

  constructor(
    public dialogRef: MatDialogRef<TaskDetailsDialogComponent>,
    private taskService: TaskService,
    private snackbarService: SnackbarService,
    private coordinatesService: CoordinatesService
  ) {}

  get locLong(): string {
    return this.coordinatesService.transformToDegrees((this.task.loc && this.task.loc.longitude) || 0, Direction.Longitude);
  }

  get locLat(): string {
    return this.coordinatesService.transformToDegrees((this.task.loc && this.task.loc.latitude) || 0, Direction.Latitude);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  openFileUpload() {
    document.getElementById('fileInput').click();
  }

  async uplaodFile(fileList: FileList) {
    const file = fileList && fileList.item(0);

    if (!file) {
      this.snackbarService.presentErrorMessage('No file selected.');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const { fileName, fileType } = this.fileNameParse(file.name);
        await this.taskService.uploadFile(this.task, reader.result, fileName, fileType);
        this.snackbarService.presentSuccess('Media uploaded');
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      this.snackbarService.presentError(error);
    } finally {
      this.onClose();
    }
  }

  async completeTask() {
    try {
      await this.taskService.completeTask(this.task);
      this.snackbarService.presentSuccess('Task completed');
    } catch (error) {
      this.snackbarService.presentError(error);
    } finally {
      this.onClose();
    }
  }

  private fileNameParse(name: string): { fileName: string, fileType: string } {
    if (!name) {
      return { fileName: null, fileType: null };
    }
    const parts = name.split('.');
    const fileType = parts.length > 1 ? parts[parts.length - 1] : null;
    parts.splice(parts.length - 1, 1);
    const fileName = parts.join('.').replace(/,/g, '');
    return { fileName, fileType };
  }
}
