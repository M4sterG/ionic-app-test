import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/delete/delete.dialog.html',
  styleUrls: ['../../dialogs/delete/delete.dialog.scss']
})
export class DeleteDialogComponent<T> {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent<T>>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService<T>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteItem(this.data.id);
  }
}
