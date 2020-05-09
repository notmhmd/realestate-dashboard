import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UtilService } from "app/services/util.service";

@Component({
  selector: "app-add-property",
  templateUrl: "./add-property.component.html",
  styleUrls: ["./add-property.component.css"],
})
export class AddPropertyComponent implements OnInit {
  public breakpoint: number; // Breakpoint observer code
  isLoadingResults = false;
  public addPropForm: FormGroup;
  wasFormChanged = false;
  public price: Number;
  public maxPrice: Number;
  public minPrice: Number;
  public propertyOwner: any;
  owners: any;
  constructor(
    public dialogRef: MatDialogRef<AddPropertyComponent>,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public util: UtilService
  ) {
    this.loadOwners();
  }

  ngOnInit(): void {
    this.addPropForm = this.fb.group({
      IdProof: null,
      price: [
        0.0,
        [Validators.required, Validators.pattern("[0-9]+([0-9]+)*")],
      ],
      minPrice: [0, [Validators.pattern("[0-9]+([0-9]+)*")]],
      maxPrice: [0, [Validators.pattern("[0-9]+([0-9]+)*")]],
      address1: [null, [Validators.required]],
      owner: [0, [Validators.required]],
      type: [1, [Validators.required]],
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  formChanged() {
    this.wasFormChanged = true;
  }

  loadOwners() {
    this.util.getRequest("customers").subscribe((customers) => {
      this.owners = customers;
      console.log(customers);
    });
  }

  submit() {
    this.isLoadingResults = true;
    if (this.addPropForm.valid) {
      this.util
        .request("property/", this.addPropForm.value)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
}
