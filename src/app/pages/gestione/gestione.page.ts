import { Storage } from '@ionic/storage';
import { Component, ChangeDetectorRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { AddDialogComponent } from '../../dialogs/add/add.dialog.component';
import { EditDialogComponent } from '../../dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from '../../dialogs/delete/delete.dialog.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface Response {
  success: boolean;
  results: any;
  total: number;
}
export class Assessment {
  id: number;
  fileName: string;
  createdAt: string;
  createdBy: string;
  notes: string;
  damages: [{
    position: string,
    relativePosition: string,
    type: string,
    actionRequired: string,
    picture: {
      path: string,
    }
  }];
}
export interface AssessmentData {
  results: [{
    id: number,
    createdAt: string,
    createdBy: string,
    notes: string,
    damages: [{
      position: string,
      relativePosition: string,
      type: string,
      actionRequired: string,
      picture: {
        path: string,
      }
    }]
  }];
  total: number;
  fetched: number;
}

@Component({
  selector: 'app-gestione',
  templateUrl: './gestione.page.html',
  styleUrls: ['./gestione.page.scss'],
})
export class GestionePage implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  columnNames = ['fileName', 'createdBy', 'notes', 'createdAt', 'actions'];

  exampleDatabase: DataService<Assessment> | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;

  constructor(
    public http: HttpClient,
    private storage: Storage,
    public dialog: MatDialog,
    public dataService: DataService<Assessment>,
    private changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  pageRefresh() {
    this.changeDetector.detectChanges();
  }
  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { user: new Assessment() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, user: Assessment) {
    this.id = user.id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, user: Assessment) {
    this.index = i;
    this.id = user.id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/users/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  /*   // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    // OLD METHOD:
    // if there's a paginator active we're using it for refresh
    if (this.dataSource.paginator.hasNextPage()) {
      this.dataSource.paginator.nextPage();
      this.dataSource.paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource.paginator.hasPreviousPage()) {
      this.dataSource.paginator.previousPage();
      this.dataSource.paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }*/
  loadData() {
    this.exampleDatabase = new DataService(this.http, this.storage);
    this.exampleDatabase.setPath('assessment');
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);

    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
  async fetchAssessmentData() {
    this.storage.get(environment.TOKEN_KEY).then(token => {
      const httpOptions = {
        headers: {
          Authorization: token
        }
      };
      this.http.get<AssessmentData>(
        environment.API_URL + 'user/get',
        httpOptions,
      ).subscribe(
        data => {
          // this.userList = data;
          console.log(data);
          this.pageRefresh();
        },
        error => {
          console.log(error);
        },
      );
    });
  }
}
export class ExampleDataSource extends DataSource<Assessment> {
  filterChange = new BehaviorSubject('');

  get filter(): string {
    return this.filterChange.value;
  }

  set filter(filter: string) {
    this.filterChange.next(filter);
  }

  filteredData: Assessment[] = [];
  renderedData: Assessment[] = [];

  constructor(
    public exampleDatabase: DataService<Assessment>,
    public paginator: MatPaginator,
    public sort: MatSort) {
    super();
    this.exampleDatabase.storage.get(environment.TOKEN_KEY).then(token => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: token
        })
      };
      this.exampleDatabase.fetchData(httpOptions).subscribe(data => {
        const d: Response = data as unknown as Response;

        this.exampleDatabase.dataChange.next(d.results);
        console.log(this.exampleDatabase.dataChange);
        console.log(d.results);
      },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
          console.log(error);
        });
    });
    this.filterChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Assessment[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.sort.sortChange,
      this.filterChange,
      this.paginator.page
    ];
    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this.exampleDatabase.data.slice().filter((item: Assessment) => {
        const searchStr = (item.id + item.fileName).toString().toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.filteredData; // this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this.paginator.pageSize);
      return this.renderedData;
    }
    ));
  }

  disconnect() { }
  /** Returns a sorted copy of the database data. */
  sortData(data: Assessment[]): Assessment[] {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      // switch (this._sort.active) {
      //  case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
      //  case 'username': [propertyA, propertyB] = [a.username, b.username]; break;
      //  case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
      //  case 'surname': [propertyA, propertyB] = [a.surname, b.surname]; break;
      // case 'createdAt': [propertyA, propertyB] = [a.createdAt, b.createdAt]; break;
      // case 'updated_at': [propertyA, propertyB] = [a.updated_at, b.updated_at]; break;
      // }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
    });
  }
}

