import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, OnInit, Inject } from "@angular/core";
import { UtilService } from "app/services/util.service";

export class ConfirmDialogModel {
  constructor(
    public title: string,
    public message: string,
    public payload: any
  ) {}
}

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.css"],
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;
  payload: any;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel,
    private util: UtilService
  ) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.payload = data.payload;
  }

  ngOnInit() {}

  async onConfirm() {
    // Close the dialog, return true
    this.dialogRef.close(true);
    console.log(this.payload);
    let reqData = {
      signature: "TEST",
      period: this.payload.period,
      request_id: this.payload.id,
    };
    this.util
      .request(`property/${this.payload.id}/approve/`, reqData)
      .subscribe((res) => {
        console.log(res);
      });
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
