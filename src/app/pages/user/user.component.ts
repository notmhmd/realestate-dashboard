import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UtilService } from "app/services/util.service";
import { MatDialog } from "@angular/material/dialog";
import { AddPropertyComponent } from "app/modals/add-property/add-property.component";

@Component({
  selector: "user-cmp",
  moduleId: module.id,
  templateUrl: "user.component.html",
  styleUrls: ["user.component.css"],
})
export class UserComponent implements OnInit {
  data: any;
  propyrties: [];
  isLoadingResults = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource(this.propyrties);

  columnsToDisplay = [
    "id",
    "username",
    "email",
    "first_name",
    "last_name",
    "phone_number",
  ];

  constructor(private util: UtilService, public dialog: MatDialog) {}

  getColName(name: string) {
    return name.toUpperCase().replace("_", " ");
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.loadProperty().then(
      (res) => {
        this.data = res;
        this.propyrties = this.data;

        this.isLoadingResults = false;
      },
      (err) => {
        console.error(err);
        this.isLoadingResults = false;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async loadProperty() {
    let myObj = this;
    return new Promise(function (resolve, reject) {
      myObj.util.getRequest("customers").subscribe(
        (res) => {
          console.log(res);
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPropertyComponent, {
      width: "640px",
      disableClose: true,
    });
  }
}
