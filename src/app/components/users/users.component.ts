
import {of as observableOf,  Observable } from 'rxjs';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { DataSource } from '@angular/cdk/table';
import { Store } from '@ngrx/store';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import * as fromApp from '../../store';
import { IUser } from '../../models';
import { CdkDetailRowDirective } from './cdk-detail-row.directive';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'void',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() singleChildRowDetail: boolean;
  private openedRow: CdkDetailRowDirective;

  users: Observable<IUser[]>;
  displayedColumns = ['displayName', 'email', 'phoneNumber', 'actionButton'];
  dataSource = new MatTableDataSource<IUser>(USER_DATA);

  // dataSource = new UsersDataSource();

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

  onToggleChange(cdkDetailRow: CdkDetailRowDirective): void {
    if (this.openedRow && this.openedRow.expended) {
      this.openedRow.toggle();
    }
    this.openedRow = cdkDetailRow.expended ? cdkDetailRow : undefined;
  }

  constructor(
    public location: Location,
    public router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.users = this.store.select(fromApp.getAllUsers);
  }

  goShowUser(row) {
    this.users.subscribe(users => console.log('users: ', users));
    console.log('row', row);
    this.router.navigate(['/users/HPsv8RFLZawpMceA63Ub']);
  }
}

const USER_DATA: any[] = [
  {
    displayName: 'Mate Matić',
    email: 'mate@email.com',
    phoneNumber: '063 111 222'
  },
  {
    displayName: 'Ante Antić',
    email: 'ante@email.com',
    phoneNumber: '063 111 111'
  },
  {
    displayName: 'Ivan Ivić',
    email: 'ivan@email.com',
    phoneNumber: '063 222 222'
  },
  {
    displayName: 'Ana Anić',
    email: 'ana@email.com',
    phoneNumber: '063 333 222'
  },
  {
    displayName: 'Tomislav Tomić',
    email: 'tomislav@email.com',
    phoneNumber: '063 333 333'
  },
  {
    displayName: 'Jure Jurić',
    email: 'jure@email.com',
    phoneNumber: '063 444 333'
  },
  {
    displayName: 'Frano Franić',
    email: 'frano@email.com',
    phoneNumber: '063 444 444'
  }
];

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' }
];

export class UsersDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return observableOf(ELEMENT_DATA);
  }

  disconnect() {}
}
