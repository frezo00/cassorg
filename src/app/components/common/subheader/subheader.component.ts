import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { ISort } from '../../../models';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent implements OnInit {
  @Input()
  showBackButton = false;
  @Input()
  showSort = false;
  @Input()
  actionText = '';
  @Input()
  title: string;
  @Input()
  subtitle: string;
  @Output()
  action: EventEmitter<any> = new EventEmitter();
  @Output()
  sortChange: EventEmitter<ISort> = new EventEmitter();

  sortValues = [
    {
      title: 'Zadano',
      value: 'dateCreated',
      direction: 'desc'
    },
    {
      title: 'Ime',
      subtitle: 'abecedno',
      value: 'firstName',
      direction: 'asc'
    },
    {
      title: 'Prezime',
      subtitle: 'abecedno',
      value: 'lastName',
      direction: 'asc'
    },
    { title: 'Najstariji prvo', value: 'birthdate', direction: 'asc' },
    { title: 'Najmlađi prvo', value: 'birthdate', direction: 'desc' }
  ];

  sort: ISort;

  constructor(public location: Location) {
    this.sort = {
      name: this.sortValues[0].value,
      order: 'desc'
    };
  }

  ngOnInit() {}

  onAction() {
    this.action.emit();
  }

  onSortChange(newSort: ISort) {
    this.sort = {
      name: !!newSort.name ? newSort.name : this.sort.name,
      order: !!newSort.order ? newSort.order : this.sort.order
    };
    this.sortChange.emit(this.sort);
  }
}
