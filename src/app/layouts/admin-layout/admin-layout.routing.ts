import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { TableComponent } from "../../pages/table/table.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UpgradeComponent } from "../../pages/upgrade/upgrade.component";
import { ServicesComponent } from "../../pages/services/services.component";
import { RentRequestsComponent } from "app/pages/rent-requests/rent-requests.component";

export const AdminLayoutRoutes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "user", component: UserComponent },
  { path: "propertys", component: TableComponent },
  { path: "services", component: ServicesComponent },
  { path: "contracts", component: TypographyComponent },
  { path: "pending", component: RentRequestsComponent },
  // { path: 'icons',          component: IconsComponent },
  // { path: 'maps',           component: MapsComponent },
  // { path: 'notifications',  component: NotificationsComponent },
  // { path: 'upgrade',        component: UpgradeComponent }
];
