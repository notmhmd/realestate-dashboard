import { Component, OnInit } from "@angular/core";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

// export const ROUTES: RouteInfo[] = [
//     { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
//     { path: '/icons',         title: 'Users',             icon:'nc-diamond',    class: '' },
//     { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
//     { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
//     { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
//     { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
//     { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
// ];
export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Home", icon: "nc-bank", class: "" },
  { path: "/user", title: "Users", icon: "nc-circle-10", class: "" },
  { path: "/propertys", title: "Property", icon: "nc-shop", class: "" },
  { path: "/services", title: "Services", icon: "nc-shop", class: "" },
  { path: "/contracts", title: "Contracts", icon: "nc-paper", class: "" },
  { path: "/pending", title: "Pending Request", icon: "nc-bank", class: "" },
];

@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
}
