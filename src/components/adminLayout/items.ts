import { FcSelfServiceKiosk, FcManager, FcLineChart, FcOrgUnit, FcSettings } from "react-icons/fc";

export interface ItemProps {
  name: string;
  leftIcon: any;
  route: string;
  level: number;
}

export interface ISideBarItemProps extends ItemProps {
  collapsibleItem?: ItemProps[];
}

export const sidebaritems: ISideBarItemProps[] = [
  {
    name: "Dashboard",
    leftIcon: FcSelfServiceKiosk,
    route: "/admin/dashboard",
    level: 1
  },
  {
    name: "Requests",
    leftIcon: FcOrgUnit,
    route: "/campaign-requests",
    level: 1
  },
  {
    name: "Analytics",
    leftIcon: FcLineChart,
    route: "/analytics",
    level: 1
  },
  {
    name: "Profile",
    leftIcon: FcManager,
    route: "/profile",
    level: 1,
  },
  {
    name: "Settings",
    leftIcon: FcSettings,
    route: "/settings",
    level: 1
  }
];