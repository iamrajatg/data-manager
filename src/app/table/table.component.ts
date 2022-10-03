import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() tableData: any;
  @Output() remove = new EventEmitter<any>();
  @Output() drop = new EventEmitter<any>();
  selectedRow: number = 0;

  constructor() {}

  ngOnInit(): void {}

  onRemove(item) {
    this.remove.emit(item);
  }

  onDrop(event) {
    if (!(typeof event.item.data === 'string')) {
      const dataIndex = this.tableData.findIndex(
        (data, ind) => ind === this.selectedRow
      );
      if (!dataIndex) {
        if (this.selectedRow === this.tableData.length - 1)
          this.selectedRow = 0;
        else this.selectedRow++;
      } else {
        this.selectedRow = dataIndex;
      }
    }
    this.drop.emit(event);
  }

  onSelectRow(index) {
    this.selectedRow = index;
  }
}
