import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavigationComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() backLink: string;
  @Input() showSearch: boolean;
  @Output() searchChange = new EventEmitter<string>();
  // @Input() showBackButton = false;
  // @Input() showSort = false;
  // @Input() showOptions = false;
  // @Input() actionText = '';
  // @Input() actionIcon = '';
  // @Output() action: EventEmitter<any> = new EventEmitter();
  // @Output() sortChange: EventEmitter<ISort> = new EventEmitter();
  // @Output() options: EventEmitter<string> = new EventEmitter();

  activeSearch: boolean;
  searchTerm: string;
  searchTermChanged: Subject<string> = new Subject<string>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.activeSearch = false;
    this.searchTerm = '';
  }

  ngAfterViewInit(): void {
    this.searchTermChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((value: string) => !value.trim() || value.trim().length >= 2)
      )
      .subscribe((searchValue: string) => this.searchChange.emit(searchValue));
  }

  onToggleSearch(setActive: boolean): void {
    this.activeSearch = setActive;
    this.searchTerm = '';
    this.onSearchChange(this.searchTerm);
  }

  onSearchChange(searchValue: string): void {
    console.log('vale', searchValue);
    console.log('search', this.searchTerm);
    this.searchTermChanged.next(searchValue);
  }
}
