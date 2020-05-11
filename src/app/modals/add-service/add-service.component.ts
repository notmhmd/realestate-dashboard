import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilService, NotifecationType } from "app/services/util.service";

@Component({
  selector: "app-add-service",
  templateUrl: "./add-service.component.html",
  styleUrls: ["./add-service.component.css"],
})
export class AddServiceComponent implements OnInit {
  isLoadingResults = false;
  public addServiceForm: FormGroup;
  public breakpoint: number; // Breakpoint observer code
  wasFormChanged = false;

  constructor(
    public dialogRef: MatDialogRef<AddServiceComponent>,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public util: UtilService
  ) {}

  ngOnInit(): void {
    this.addServiceForm = this.fb.group({
      name: ["", Validators.required],
      price: [0, Validators.pattern("[0-9]+([0-9]+)*")],
    });
  }

  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  formChanged() {
    this.wasFormChanged = true;
  }

  openDialog() {
    this.dialogRef.close();
  }

  submit() {
    if (this.addServiceForm.valid) {
      this.isLoadingResults = true;
      this.util.request("services/", this.addServiceForm.value).subscribe(
        (res) => {
          this.util.showNotification(
            "top",
            "center",
            NotifecationType.success,
            "Added Succesfully",
            "Success"
          );
          this.isLoadingResults = false;
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.util.showNotification(
            "top",
            "center",
            NotifecationType.error,
            "Error Occured",
            "Failed"
          );
          this.isLoadingResults = false;
        }
      );
    }
  }
}
