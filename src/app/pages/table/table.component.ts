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

@Component({
  selector: "table-cmp",
  moduleId: module.id,
  templateUrl: "table.component.html",
  styleUrls: ["table.component.css"],
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
export class TableComponent implements OnInit {
  data: any;
  propyrties: [];
  isLoadingResults = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource(this.propyrties);

  columnsToDisplay = ["owner", "price", "max_price", "min_price", "prop_type"];

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
      myObj.util.getRequest("property").subscribe(
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
