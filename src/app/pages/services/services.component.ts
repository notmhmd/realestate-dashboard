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
import { MatDialog } from "@angular/material/dialog";
import { AddServiceComponent } from "app/modals/add-service/add-service.component";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.css"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class ServicesComponent implements OnInit {
  data: any;
  services: [];
  isLoadingResults = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource(this.services);

  columnsToDisplay = ["name", "price"];

  constructor(private util: UtilService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getServices();
  }

  getServices() {
    this.loadServices().then(
      (res) => {
        this.data = res;
        this.services = this.data;

        this.isLoadingResults = false;
      },
      (err) => {
        console.error(err);
        this.isLoadingResults = false;
      }
    );
  }

  getColName(name: string) {
    return name.toUpperCase().replace("_", " ");
  }

  async loadServices() {
    let myObj = this;
    return new Promise(function (resolve, reject) {
      myObj.util.getRequest("services").subscribe(
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddServiceComponent, {
      width: "640px",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((reload) => {
      console.log(reload);
      if (reload) {
        this.getServices();
      }
    });
  }
}
