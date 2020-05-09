import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthGuard } from "./auth/authguard.guard";
import { AuthComponent } from "./pages/auth/auth.component";

export const AppRoutes: Routes = [
  { path: "login", component: AuthComponent },
  {
    path: "",
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule",
      },
    ],
  },
  {
    path: "**",
    redirectTo: "",
  },
];
