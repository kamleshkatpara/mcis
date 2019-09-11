import { Component, OnInit } from '@angular/core';
import { ViewmodelComponent } from './../viewmodel/viewmodel.component';
import { MatDialog } from '@angular/material/dialog';
import { ModelService } from './../model/model.service';
import { Model } from '../model/model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  models: Model[];

  displayedColumns: string[] = ['id', 'manufacturer', 'name', 'stock'];

  dataSource = new MatTableDataSource<Model>();

  public connection;

  id: number;

  constructor(public dialog: MatDialog, public modelService: ModelService) {}

  ngOnInit() {
    this.getModels();
    this.connection = this.modelService.getModel().subscribe(model => {
      this.newData(model);
    });
    this.connection = this.modelService.getSold().subscribe(model => {
      this.getModels();
    });
  }

  newData(model) {
    this.dataSource.data = [...this.dataSource.data, model.data] as Model[];
  }

  getModels() {
    this.modelService.getModels().subscribe(res => {
      this.dataSource.data = res as Model[];
    });
  }

  viewModel(
    id: number,
    manufacturer: string,
    name: string,
    color: string,
    manufacturingyear: number,
    registrationnumber: string,
    note: string,
    image1: string,
    image2: string,
    stock: number
  ) {
    this.id = id;
    const dialogRef = this.dialog.open(ViewmodelComponent, {
      disableClose: true,
      maxWidth: '100vh',
      maxHeight: '100vh',
      data: {
        id,
        manufacturer,
        name,
        color,
        manufacturingyear,
        registrationnumber,
        note,
        image1,
        image2,
        stock
      }
    });
  }
}
