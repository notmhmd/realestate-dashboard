import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.reportsForm = this.fb.group({
      from: [""],
      to: [""],
    });
  }

  formChanged() {
    this.wasFormChanged = true;
  }

  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  submit() {
    console.log(this.reportsForm.value);
  }
}
