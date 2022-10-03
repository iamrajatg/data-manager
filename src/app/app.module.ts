import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { DragDropComponent } from './dragdrop/dragdrop.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [AppComponent, DragDropComponent, TableComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, DragDropModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
