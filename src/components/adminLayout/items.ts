import { IoSpeedometerOutline } from "react-icons/io5";
import { GrUserAdmin } from "react-icons/gr";

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
    leftIcon: IoSpeedometerOutline,
    route: "/admin/dashboard",
    level: 1
  },
  // {
  //   name: "Users",
  //   leftIcon: FiUsers,
  //   route: "/profile",
  // },
  // {
  //   name: "Analytics",
  //   leftIcon: GrAnalytics,
  //   route: ""
  // },
  {
    name: "Profile",
    leftIcon: GrUserAdmin,
    route: "/profile",
    level: 1,
    collapsibleItem: [
      {
        name: "Change Password",
        leftIcon: IoSpeedometerOutline,
        route: "/profile/change-password",
        level: 2
      },
    ]
  }
];