import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ManufacturerService } from './../manufacturer/manufacturer.service';
import { Manufacturer } from '../manufacturer/manufacturer';
import { Model } from '../model/model';
import { ModelService } from './model.service';
import { MatDialog } from '@angular/material/dialog';
import { ManufacturerComponent } from '../manufacturer/manufacturer.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../environments/environment';
import { FormControl, Validators, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModelComponent implements OnInit {

  constructor(
    public model: Model,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public manufacturerService: ManufacturerService,
    public modelService: ModelService
  ) {}
  manufacturers: Manufacturer[];
  years = [];
  formData = new FormData();
  image1: any;
  dimage1: any;
  image2: any;
  dimage2: any;
  status = false;
  statusClass = 'failure';
  snackMessage = '';

  @ViewChild(FormGroupDirective, {static: false}) mymodelForm;

  @ViewChild('image1Input', {static: false})
  image1Variable: ElementRef;

  @ViewChild('image2Input', {static: false})
  image2Variable: ElementRef;

  manufacturerFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  colorFormControl = new FormControl('', [Validators.required]);
  manufacturingyearFormControl = new FormControl('', [Validators.required]);
  registrationnumberFormControl = new FormControl('', [Validators.required]);
  noteFormControl = new FormControl('', [Validators.required]);
  stockFormControl = new FormControl('', [Validators.required]);

  modelForm: FormGroup = new FormGroup({
    manufacturer: this.manufacturerFormControl,
    name: this.nameFormControl,
    color: this.colorFormControl,
    manufacturingyear: this.manufacturingyearFormControl,
    registrationnumber: this.registrationnumberFormControl,
    note: this.noteFormControl,
    stock: this.stockFormControl
  });

  ngOnInit() {
    this.getManufactures();
    this.getYears();
  }

  getManufacturerError() {
    return this.manufacturerFormControl.hasError('required') ? 'Please select manufacturer' : '';
  }

  getNameError() {
    return this.nameFormControl.hasError('required') ? 'Please enter model name' : '';
  }

  getColorError() {
    return this.colorFormControl.hasError('required') ? 'Please enter color' : '';
  }

  getManufacturingYearError() {
    return this.manufacturingyearFormControl.hasError('required') ? 'Please select manufacturing year' : '';
  }

  getRegistrationNumberError() {
    return this.registrationnumberFormControl.hasError('required') ? 'Please enter registration year' : '';
  }

  getNoteError() {
    return this.noteFormControl.hasError('required') ? 'Please enter note' : '';
  }

  getStockError() {
    return this.stockFormControl.hasError('required') ? 'Please enter stock' : '';
  }

  addManufacturer(): void {
    const dialogRef = this.dialog.open(ManufacturerComponent, {
      disableClose: true,
      autoFocus: false
    });
  }

  getManufactures() {
    this.manufacturerService
      .getManufacturers()
      .subscribe(manufacturers => (this.manufacturers = manufacturers));
  }

  getYears() {
    for (let i = new Date().getFullYear(); i >= 1970; i--) {
      this.years.push(i);
    }
  }

  handleImage1(files: FileList) {
    this.model.image1 = '/uploads/' + files[0].name;
    this.formData.append('image1', files[0], files[0].name);
    this.modelService
      .uploadImage(this.formData)
      .subscribe(
        image1 => {
          this.image1 = environment.apiUrl + '/uploads/' + image1;
          this.dimage1 = './uploads/' + image1;
        },
        err => {
          console.warn(err);
        }
      );
    this.formData.delete('image1');
  }

  handleImage2(files: FileList) {
    this.model.image2 = '/uploads/' + files[0].name;
    this.formData.append('image2', files[0], files[0].name);
    this.modelService
      .uploadImage(this.formData)
      .subscribe(
        image2 => {
          this.image2 = environment.apiUrl + '/uploads/' + image2;
          this.dimage2 = './uploads/' + image2;
        },
        err => {
          console.warn(err);
        }
      );
    this.formData.delete('image2');
  }

  deleteImage1(image) {
    this.modelService.deleteImage(image)
    .subscribe(
      res => {
        if (res === 'deleted') {
          this.image1 = '';
          this.dimage1 = '';
          this.image1Variable.nativeElement.value = '';
        }
      },
      err => {
        console.warn(err);
      }
    );
  }

  deleteImage2(image) {
    this.modelService.deleteImage(image)
    .subscribe(
      res => {
        if (res === 'deleted') {
          this.image2 = '';
          this.dimage2 = '';
          this.image2Variable.nativeElement.value = '';
        }
      },
      err => {
        console.warn(err);
      }
    );
  }

  openSnackBar() {
    if (this.status) {
      this.mymodelForm.resetForm();
      this.image1 = '';
      this.image1Variable.nativeElement.value = '';
      this.image2 = '';
      this.image2Variable.nativeElement.value = '';
      this.statusClass = 'success';
    }
    this.snackBar.open(this.snackMessage, '', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: this.statusClass
      });
  }

  submit(): void {
    this.modelService.addModel(this.model).subscribe(
      modeldata => {
        if (modeldata.status) {
          this.modelService.newModel(modeldata);
          this.status = modeldata.status;
          this.snackMessage = modeldata.message;
          this.openSnackBar();
        } else {
          this.status = modeldata.status;
          this.snackMessage = modeldata.message;
          this.openSnackBar();
        }
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
