import AddCredit from "@/pages/ManageDocs/ReportList/AddCredit";
import Home from "../pages/Home";
import ReportList from "../pages/ManageDocs/ReportList";
import ReportUpload from "../pages/ManageDocs/ReportUpload";
import ManageAppPush from "../pages/ManageNotification/ManageAppPush";
import ManageParams from "../pages/ManageNotification/ManageParams";
import ManageSMS from "../pages/ManageNotification/ManageSMS";
import UserRole from "../pages/ManageRole/UserRole";
import UserInfo from "../pages/ManageUsers/UserInfo";
import { iconDocument, iconMail, iconMenu, iconUser } from "./icon";
import DetailCredit from "@/pages/ManageDocs/ReportList/DetailCredit";
import CopyCredit from "@/pages/ManageDocs/ReportList/CopyCredit";
import RemoveCredit from "@/pages/ManageDocs/ReportList/RemoveCredit";

export const ROUTERS = [
  {
    id: 0,
    name: "Trang chủ",
    path: "/",
    component: <Home />,
    permission: "*",
  },
  {
    id: 1,
    name: "Nghiệp vụ",
    path: "/report",
    children: [
      {
        id: 1.1,
        name: "Tín dụng",
        path: "/report/credit",
        icon: (<i className="fa-regular fa-credit-card"></i>),
        component: <ReportList />,
        permission: "dsc.auth.user",
        childRouter: [
          {
            id: 1.11,
            path: "/report/credit/add",
            component: <AddCredit />,
            permission: "dsc.auth.user",
          },
          {
            id: 1.12,
            path: "/report/credit/detail",
            component: <DetailCredit />,
            permission: "dsc.auth.user",
          },
          {
            id: 1.13,
            path: "/report/credit/copy",
            component: <CopyCredit />,
            permission: "dsc.auth.user",
          },
          {
            id: 1.14,
            path: "/report/credit/remove",
            component: <RemoveCredit />,
            permission: "dsc.auth.user",
          },
        ]
      },
      {
        id: 1.2,
        name: "Báo cáo",
        path: "/report/report",
        icon: (<i className="fa-light fa-file-lines"></i>),
        component: <ReportUpload />,
        permission: "dsc.auth.user",
      },
      {
        id: 1.3,
        name: "Quản lý Import",
        path: "/report/import",
        icon: (<i className="fa-light fa-file-arrow-up"></i>),
        component: <ReportUpload />,
        permission: "dsc.auth.user",
      },
    ],
    icon: iconDocument,
  },
  // {
  //   id: 2,
  //   name: "Quản lý thông báo",
  //   path: "/noti/",
  //   children: [
  //     {
  //       id: 2.1,
  //       name: "Quản lý template",
  //       path: "/noti/template",
  //       children: [
  //         {
  //           id: 2.11,
  //           name: "Quản lý biến",
  //           path: "noti/template/manage-params",
  //           component: <ManageParams />,
  //           permission: "dsc.vtrading.stock",
  //         },
  //       ],
  //     },
  //     {
  //       id: 2.2,
  //       name: "Quản lý thông báo",
  //       path: "/noti/notification",
  //       children: [
  //         {
  //           id: 2.21,
  //           name: "Quản lý SMS",
  //           path: "noti/notification/sms",
  //           component: <ManageSMS />,
  //           permission: "dsc.vtrading.stock",
  //         },
  //         {
  //           id: 2.22,
  //           name: "Quản lý App Push",
  //           path: "noti/notification/apppush",
  //           component: <ManageAppPush />,
  //           permission: "dsc.vtrading.stock",
  //         },
  //       ],
  //     },
  //   ],
  //   icon: iconMail,
  // },
  {
    id: 3,
    name: "Quản lý người dùng",
    path: "/user/",
    children: [
      {
        id: 3.1,
        name: "Thông tin khách hàng",
        path: "user/manage-info",
        icon: (<i className="fa-light fa-user"></i>),
        component: <UserInfo />,
        permission: "dsc.auth.user",
      },
    ],
    icon: iconUser,
  },
  // {
  //   id: 4,
  //   name: "Quản lý phân quyền",
  //   path: "/role/",
  //   children: [
  //     {
  //       id: 4.1,
  //       name: "Phân quyền người dùng",
  //       path: "role/user-role",
  //       component: <UserRole />,
  //       permission: "dsc.auth.user",
  //     },
  //   ],
  //   icon: iconMenu,
  // },
];
