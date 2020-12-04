import { Component, OnInit, ViewChild } from "@angular/core";
import { UtilService } from "app/services/util.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { AddPropertyComponent } from "app/modals/add-property/add-property.component";
import {
  ConfirmDialogModel,
  ConfirmDialogComponent,
} from "app/modals/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-rent-requests",
  templateUrl: "./rent-requests.component.html",
  styleUrls: ["./rent-requests.component.css"],
})
export class RentRequestsComponent implements OnInit {
  data: any;
  requests: [] = [];
  result: string = "";

  isLoadingResults = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource(this.requests);

  columnsToDisplay = ["id", "prop", "customer", "period", "state", "actions"];

  constructor(private util: UtilService, public dialog: MatDialog) {}

  getColName(name: string) {
    return name.toUpperCase().replace("_", " ");
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getData();
  }

  getData() {
    this.loadPendingRequests().then(
      (res) => {
        this.data = res;
        this.requests = this.data;
        this.isLoadingResults = false;
      },
      (err) => {
        console.error(err);
        this.isLoadingResults = false;
      }
    );
  }

  approve(e) {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message, e);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      this.getData();
    });
  }

  openDialog() {
    console.log("Open Dialog");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async loadPendingRequests() {
    // load the pending request data from the API
    let myObj = this;
    return new Promise(function (resolve, reject) {
      myObj.util.getRequest("property/requests").subscribe(
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
}
