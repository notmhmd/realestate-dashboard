import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { PropertyComponent } from "../../pages/property/property.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { ServicesComponent } from "../../pages/services/services.component";
import { RentRequestsComponent } from "app/pages/rent-requests/rent-requests.component";
import { ReportsComponent } from "app/pages/reports/reports.component";

export const AdminLayoutRoutes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "user", component: UserComponent },
  { path: "propertys", component: PropertyComponent },
  { path: "services", component: ServicesComponent },
  // { path: "contracts", component: TypographyComponent },
  { path: "pending", component: RentRequestsComponent },
  { path: "reports", component: ReportsComponent },
];
