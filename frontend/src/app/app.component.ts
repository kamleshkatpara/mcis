import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModelService } from './model/model.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  breakpoint: number;

  public connection;
  durationInSeconds = 5;
  snackMessage = '';

  constructor(
    private snackBar: MatSnackBar,
    public modelService: ModelService
  ) {}

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 400 ? 1 : 2;
    this.connection = this.modelService.getSold().subscribe(model => {
      this.openSnackBar(model);
    });
  }

  openSnackBar(model) {
    this.snackBar.open(
      `${model.manufacturer + ' ' + model.name} is sold`,
      '',
      {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'top',
        panelClass: 'warn'
      }
    );
  }

  onResize(event: { target: { innerWidth: number; }; }) {
    this.breakpoint = event.target.innerWidth <= 400 ? 1 : 2;
  }
}
