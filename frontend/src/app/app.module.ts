import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { ModelComponent } from './model/model.component';
import { InventoryComponent } from './inventory/inventory.component';
import { HttpClientModule } from '@angular/common/http';
import {
  MatGridListModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatSelectModule,
  MatTableModule,
  MatDialogModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatIconModule,
  MatToolbarModule,
  MatSortModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewmodelComponent } from './viewmodel/viewmodel.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Manufacturer } from './manufacturer/manufacturer';
import { Model } from './model/model';

@NgModule({
  declarations: [
    AppComponent,
    ManufacturerComponent,
    ModelComponent,
    InventoryComponent,
    ViewmodelComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  exports: [MatSortModule],
  entryComponents: [ManufacturerComponent, ViewmodelComponent],
  providers: [Manufacturer, Model],
  bootstrap: [AppComponent]
})
export class AppModule { }
