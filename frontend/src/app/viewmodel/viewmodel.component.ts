import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModelService } from './../model/model.service';
import { Model } from './../model/model';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-viewmodel',
  templateUrl: './viewmodel.component.html',
  styleUrls: ['./viewmodel.component.css']
})
export class ViewmodelComponent implements OnInit {

  image1 = '';
  image2 = '';

  constructor(
    public modelService: ModelService,
    public dialogRef: MatDialogRef<ViewmodelComponent>,
    @Inject(MAT_DIALOG_DATA) public model: Model,
  ) { }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.model.image1);
    console.log(this.model.image2);
    if (this.model.image1 !== '') {
      this.image1 = environment.apiUrl + this.model.image1;
    } else {
      this.image1 = '';
    }
    if (this.model.image2 !== '') {
      this.image2 = environment.apiUrl + this.model.image2;
    } else {
      this.image2 = '';
    }
  }

  sell(model: Model): void {
    this.modelService.sellModel(model).subscribe(
      modeldata => {
       this.modelService.soldModel(modeldata);
       this.dialogRef.close();
      },
      err => {
       console.warn(err);
      }
    );
  }

}
