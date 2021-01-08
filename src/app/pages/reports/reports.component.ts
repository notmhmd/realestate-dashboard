import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilService } from "app/services/util.service";
// import "rxjs/Rx";
import * as fs from "file-saver";
@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"],
})
export class ReportsComponent implements OnInit {
  public breakpoint: number; // Breakpoint observer code
  isLoadingResults = false;
  public reportsForm: FormGroup;
  wasFormChanged = false;

  constructor(private fb: FormBuilder, private util: UtilService) {}

  ngOnInit(): void {
    this.reportsForm = this.fb.group({
      from: ["", Validators.required],
      to: ["", Validators.required],
      type: ["1"],
    });
  }

  formChanged() {
    this.wasFormChanged = true;
  }

  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  downloadReport(response: any, fileName?: string) {
    console.log("start downloading ..");
    const blob = new Blob([response.body], {
      type: response.headers.get("content-type"),
    });
    fileName =
      fileName || response.headers.get("content-disposition").split(";")[1];
    const file = new File([blob], fileName, {
      type: response.headers.get("content-type"),
    });
    // const url = window.URL.createObjectURL(blob);
    console.log({ blob });
    console.log({ file });
    fs.saveAs(file);
  }

  submit() {
    // console.log(this.reportsForm.value);
    if (this.reportsForm.valid) {
      this.util
        .request("property/generate_report/", this.reportsForm.value)
        .subscribe(
          (res) => {
            console.log({ res });
            this.downloadReport(res);
          },
          (err) => {
            console.log({ err });
            console.log("something went wrong");
          }
        );
    }
  }
}
