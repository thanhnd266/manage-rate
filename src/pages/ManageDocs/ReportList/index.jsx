import BaseTable from "@/components/common/BaseTable";
import { Breadcrumb, Form } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import FormFilter from "./FormFilter";
import BaseButton from "@/components/common/BaseButton";
import { Link, useNavigate } from "react-router-dom";
import { ReportBtnNavigate, ReportListHeader } from "./styled";
import BaseBreadcrumb from "@/components/common/BaseBreadcrumb";

const data = [
  {
    id: 1,
    key: 1,
    code: "LN0001",
    name: 'Diamond',
    policy: "Tiêu chuẩn",
    interestRate: "Bậc thang",
    fromDate: "17/10/2022",
    toDate: "17/10/2022",
    packageStatus: "Chờ duyệt",
    status: "Hoạt động"
  },
  {
    id: 2,
    key: 2,
    code: "LN0002",
    name: 'Diamond',
    policy: "Ưu đãi",
    interestRate: "Cố định",
    fromDate: "17/10/2022",
    toDate: "17/10/2022",
    packageStatus: "Hủy bỏ",
    status: "Không hoạt động"
  },
  {
    id: 3,
    key: 3,
    code: "LN0003",
    name: 'Gold',
    policy: "Ưu đãi",
    interestRate: "Theo mã",
    fromDate: "17/10/2022",
    toDate: "17/10/2022",
    packageStatus: "Đã duyệt",
    status: "Hoạt động"
  },
];

const ReportList = () => {

  const navigate = useNavigate();

  const columns = [
    {
      title: 'Mã loại hình',
      dataIndex: 'code',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tên loại hình',
      dataIndex: 'name',
    },
    {
      title: 'Loại chính sách',
      dataIndex: 'policy',
    },
    {
      title: 'Loại lãi suất',
      dataIndex: 'interestRate',
    },
    {
      title: 'Hiệu lực (Từ)',
      dataIndex: 'fromDate',
    },
    {
      title: 'Hiệu lực (Đến)',
      dataIndex: 'toDate',
    },
    {
      title: 'Trạng thái gói',
      dataIndex: 'packageStatus',
    },
    {
      title: 'Trạng thái hoạt động',
      dataIndex: 'status',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <>
      <div>
        <ReportListHeader>
          
          <BaseBreadcrumb
            items={[
              {
                title: "Nghiệp vụ",
              },
              {
                title: (
                  <Link to="/report/credit">Tín dụng</Link>
                ),
              },
            ]}
          />
        </ReportListHeader>

        <ReportBtnNavigate>
          <BaseButton text="Thêm mới" onClick={() => navigate("add")} />
          <BaseButton text="Xem chi tiết" onClick={() => navigate("detail")} />
          <BaseButton text="Sửa" onClick={() => navigate("detail")} />
          <BaseButton text="Sao chép" onClick={() => navigate("copy")} />
          <BaseButton text="Xóa" onClick={() => navigate("remove")} />
        </ReportBtnNavigate>

        <FormFilter />

        <BaseTable
          columns={columns}
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          data={data}
        />
      </div>
    </>
  );
};

export default ReportList;
