import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from "./sidebar/sidebar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FixedPluginModule } from "./shared/fixedplugin/fixedplugin.module";

import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routing";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AuthModule } from "./pages/auth/auth.module";
import { DataTablesModule } from "angular-datatables";
import { ReactiveFormsModule } from "@angular/forms";
import { AddPropertyComponent } from "./modals/add-property/add-property.component";

import { MaterialModule } from "./modules/material.module";
import { AddServiceComponent } from './modals/add-service/add-service.component';
import { ReportsComponent } from './pages/reports/reports.component';

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, AddPropertyComponent, AddServiceComponent, ReportsComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: false,
    }),
    SidebarModule,
    NavbarModule,
    MaterialModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    AuthModule,
    DataTablesModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
