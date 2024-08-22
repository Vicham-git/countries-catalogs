import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule, NgIf, NgForOf, MatFormField, MatInput, KeyValuePipe, MatLabel, MatSortHeader, MatSort, ReactiveFormsModule, MatButton],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'no',
    'name',
    'flag',
    'cc2',
    'cc3',
    'nativeName',
    'altSpellings',
    'idd',
  ];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSize: number = 25;

  search = new FormControl<string | null>('');


  constructor(private http: HttpClient,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.pageIndex = 2;
    // this.search.valueChanges.subscribe({
    //   next:()=>{
    //     this.http.get(`https://restcountries.com/v3.1/name/${this.search.value}?fullText=true`).subscribe({
    //       next:(res: any)=>{
    //         this.dataSource.data = res
    //     }
    //     })
    //   }
    // })
  }

  loadData() {
    this.http.get(`https://restcountries.com/v3.1/all`).subscribe({
      next: (res: any) => {
        this.dataSource.data = res;
      },
    });
  }

  onSearch() {
    if (!this.search.value) {
      this.loadData();
    } else {
      this.http.get(`https://restcountries.com/v3.1/name/${this.search.value}?fullText=true`).subscribe({
        next: (res: any) => {
          this.dataSource.data = res
        }
      })
    }


  }

  onDialog(row: any) {
    this.dialog.open(DialogComponent, {
      minWidth: '1400px',
      height: '700px',
      data : row
    })
  }

  getDisplayedIndex(index: number): number {
    return (
      (this.paginator?.pageIndex ?? 0) * (this.paginator?.pageSize ?? 10) +
      index +
      1
    );
  }

  checkObject(value: any): any {
    return Object.keys(value).map((key) => ({key, value: value[key]}));
  }
}
