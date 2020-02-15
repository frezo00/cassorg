import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectModalComponent } from '../components/project/create-project-modal/create-project-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(public dialog: MatDialog) {}

  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectModalComponent, {
      height: 'calc(100%-20vh)',
      maxWidth: '250px',
      panelClass: 'modal-dialog'
    });

    /* dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result: ', result);
    }); */
  }
}
