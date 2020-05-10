import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { PropertyComponent } from "../../pages/property/property.component";
import { MapsComponent } from "../../pages/maps/maps.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ServicesComponent } from "app/pages/services/services.component";
import { MaterialModule } from "app/modules/material.module";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { RentRequestsComponent } from "app/pages/rent-requests/rent-requests.component";
import { ConfirmDialogComponent } from "app/modals/confirm-dialog/confirm-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    MaterialModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    PropertyComponent,
    MapsComponent,
    ServicesComponent,
    RentRequestsComponent,
    ConfirmDialogComponent,
  ],
})
export class AdminLayoutModule {}
