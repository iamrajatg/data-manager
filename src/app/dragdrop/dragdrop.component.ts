import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.css'],
})
export class DragDropComponent implements OnInit {
  userForm: FormGroup;
  listData: any;
  numberOfColumns: number = 4;

  constructor(private fb: FormBuilder) {
    this.listData = [
      {
        id: 1,
        name: 'Rajat1',
        department: 'Marketing',
        position: 'President',
      },
      {
        id: 2,
        name: 'Rajat2',
        department: 'Marketing',
        position: 'Vice President',
      },
      {
        id: 3,
        name: 'Rajat3',
        department: 'Operations',
        position: 'President',
      },
      {
        id: 4,
        name: 'Rajat4',
        department: 'Marketing',
        position: 'Manager',
      },
      {
        id: 5,
        name: 'Rajat5',
        department: 'Operations',
        position: 'Manager',
      },
    ];
    this.userForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      department: [''],
      position: [''],
    });
  }

  ngOnInit(): void {}

  addItem() {
    this.listData.push({ ...this.userForm.value, id: this.getNextId() });
    this.userForm.reset();
  }
  removeItem(item) {
    this.listData = this.listData.filter((i) => {
      return i !== item;
    });
  }

  reset() {
    this.userForm.reset();
  }

  getNextId(): number {
    if (!this.listData?.length) return 1;

    const idList = this.listData.map((data) => {
      console.log('test', data);
      return parseInt(data.id, 10);
    });
    return Math.max(...idList) + 1;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (typeof event.item.data === 'string') return;
    if (event?.item?.data) {
      if (
        this.userForm.valid &&
        event.item.data.id &&
        this.userForm.value.id !== event.item.data.id
      ) {
        this.listData.push(this.userForm.value);
      }
      this.listData = this.listData.filter((i) => {
        return i.id !== event.item.data.id;
      });
      this.userForm.setValue({ ...event.item.data });
    } else
      moveItemInArray(
        this.listData,
        event.previousIndex - this.numberOfColumns,
        event.currentIndex - this.numberOfColumns
      );
  }

  dropListTable(event: CdkDragDrop<string[]>) {
    const colType = typeof event.item.data;
    if (colType === 'string' || colType === 'number') {
      const colName = event.item.data;
      if (colType === 'number' || colName === 'id') {
        return this.listData.sort((a, b) => a[colName] - b[colName]);
      }
      return this.listData.sort((a, b) => {
        if (a[colName] < b[colName]) {
          return -1;
        }
        if (a[colName] > b[colName]) {
          return 1;
        }
        return 0;
      });
    }

    if (event.item.data instanceof FormGroup && this.userForm.valid) {
      if (!this.userForm.value.id) {
        const newItem = {
          ...event.item.data.value,
          id: this.getNextId(),
        };
        this.listData.splice(
          event.currentIndex - this.numberOfColumns,
          0,
          newItem
        );
      } else
        this.listData.splice(
          event.currentIndex - this.numberOfColumns,
          0,
          event.item.data.value
        );
      this.reset();
    } else if (!(event.item.data instanceof FormGroup)) {
      moveItemInArray(
        this.listData,
        event.previousIndex - this.numberOfColumns,
        event.currentIndex - this.numberOfColumns
      );
    }
  }
}
