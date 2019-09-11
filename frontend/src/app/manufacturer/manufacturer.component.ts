import { Component, OnInit } from '@angular/core';
import { ManufacturerService } from './manufacturer.service';
import { Manufacturer } from './manufacturer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {

  status = false;
  statusClass = 'failure';
  snackMessage = '';

  constructor(
    public manufacturer: Manufacturer,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public manufacturerService: ManufacturerService) { }

  ngOnInit() {
    this.manufacturer.name = '';
  }

  openSnackBar() {
    if (this.status) {
      this.manufacturer.name = '';
      this.dialog.closeAll();
      this.statusClass = 'success';
    }
    this.snackBar.open(this.snackMessage, '', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: this.statusClass
      });
  }


  submit(): void {
    this.manufacturerService.addManufacturer(this.manufacturer)
    .subscribe(
      res => {
        this.status = res.status;
        this.snackMessage = res.message;
        this.openSnackBar();
      },
      err => {
        this.status = err.error.status;
        this.snackMessage = err.error.message;
        this.openSnackBar();
        console.warn(err);
      }
    );
  }
}
