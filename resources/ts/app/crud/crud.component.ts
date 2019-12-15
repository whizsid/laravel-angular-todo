import { Component, OnInit } from '@angular/core';
import CRUDService from '../core/services/crud.service';
import Todo, { ITodo } from '../core/models/todo.model';
import * as moment from 'moment';
import UserService from '../core/services/user.service';

export interface IInput {
  type: string;
  name: string;
  property: string;
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit {

  public items: Todo[];

  public name: string;

  public updatingKey?: number;

  constructor(
    private crudService: CRUDService,
    private userService: UserService
  ) {}

  public search = (name: string) => {
    this.crudService.search(Todo, {name}).then(response => {
      if (response.success) {
        this.items = [];
        for (const item of response.results) {
          const todoItem  = item as ITodo;
          this.items.push(new Todo({
            id: todoItem.id,
            name: item.name,
            createdDate: moment(todoItem.createdDate),
            updatedDate: moment(todoItem.updatedDate)
          }));
        }
      }
    });
  }

  public handleChangeName() {
    if (typeof this.updatingKey === 'undefined') {
      this.search(this.name);
    } else {
      this.items[this.updatingKey].setProperty('name', this.name);
    }
  }

  public handleSubmit() {
    if ( typeof this.updatingKey !== 'undefined') {
      this.crudService.update(Todo, new Todo({
        ...this.items[this.updatingKey].data,
        name: this.name
      })).then(response => {
        if (response.success) {
          this.name = '';
          this.search('');
          this.updatingKey = undefined;
        }
      });
    } else {
      this.crudService.create(Todo, new Todo({
        id: 0 ,
        name: this.name,
        createdDate: moment(),
        updatedDate: moment()
      })).then(response => {
        if (response.success) {
          this.name = '';
          this.search('');
        }
      });
    }
  }

  ngOnInit() {
    this.search(this.name);
  }

  public selectToUpdate(i: number) {
    this.updatingKey = i;
    this.name = this.items[i].getProperty('name');
  }

  public isNumber(nmb?: number): boolean {
    return typeof nmb === 'number';
  }

  public handleDelete = (item: Todo) => {
    this.crudService.delete(Todo, item).then(response => {
      if (response.success) {
        this.search(this.name);
      }
    });
  }

  public handleClear = () => {
    this.name = '';
    this.updatingKey = undefined;
    this.search('');
  }
}
