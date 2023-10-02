import BaseBreadcrumb from "@/components/common/BaseBreadcrumb";
import BaseButton from "@/components/common/BaseButton";
import BaseTable from "@/components/common/BaseTable";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormFilter from "./FormFilter";
import RemoveCredit from "./RemoveCredit";
import { ReportBtnNavigate, ReportListHeader } from "./styled";
import { useDispatch } from "react-redux";
import { setRecord } from "@/features/record/recordSlice";

const data = [
  {
    code: "LN0006",
    key: 1,
    name: "Gói kim cương 6 ",
    description: "Khách hàng trong gói vip 6",
    productId: 19,
    packageType: "TC", // loại lãi xuất
    interestRateType: "TC",
    creditLimit: 500000000, // hạn mức vay
    loanTerm: 180, // kì hạn vay
    interestFreeDay: 30, // số ngày miễn lãi
    overdueInterest: 12.3, // lãi xuất quá hạn
    chargedOverdueInterest: true, // có tính trên lãi quá hạn
    interestCalculationBasis: 360, // cơ số tính lãi
    allowExtension: true, // cho phép gia hạn
    extensionCount: 5, // kỳ gia hạn
    extensionInterestRate: 15.49, // lãi xuất gia hạn
    extensionMax: 5, // số lần gia hạn tối đa
    onlineExtensionAllowed: true, // cho phép gia hạn online
    allowExtensionCount: 3, // số ngày trước kì hạn được phép gia hạn
    warningCount: 5, // số ngày cảnh báo đến hạn
    autoPayDebt: true, // tự động trả nợ trước hạn
    autoPayDebtRollover: true, // tự động đảo nợ
    earlyRepaymentFee: 500000,
    rejectReason: "",
    interestRate: [
      {
        ticker: "",
        interestRateYear: "20",
        interestRateDay: "0.3",
        startDay: "0",
        endDay: "5",
        sortNo: "1",
      },
      {
        ticker: "",
        interestRateYear: "25",
        interestRateDay: "0.3516",
        startDay: "6",
        endDay: "15",
        sortNo: "2",
      },
    ],
    packageStatus: "Chờ duyệt",
    status: "Không hoạt động",
    startDate: "2023-09-26",
    endDate: "2023-10-26",
    maker: "phatnq",
    checker: "",
  },
  {
    code: "LN0007",
    key: 2,
    name: "Gói kim cương 7 ",
    description: "Khách hàng trong gói vip 7",
    productId: 20,
    packageType: "TC", // loại lãi xuất
    interestRateType: "TC",
    creditLimit: 500000000, // hạn mức vay
    loanTerm: 180, // kì hạn vay
    interestFreeDay: 30, // số ngày miễn lãi
    overdueInterest: 12.3, // lãi xuất quá hạn
    chargedOverdueInterest: true, // có tính trên lãi quá hạn
    interestCalculationBasis: 360, // cơ số tính lãi
    allowExtension: true, // cho phép gia hạn
    extensionCount: 5, // kỳ gia hạn
    extensionInterestRate: 15.49, // lãi xuất gia hạn
    extensionMax: 5, // số lần gia hạn tối đa
    onlineExtensionAllowed: true, // cho phép gia hạn online
    allowExtensionCount: 3, // số ngày trước kì hạn được phép gia hạn
    warningCount: 5, // số ngày cảnh báo đến hạn
    autoPayDebt: true, // tự động trả nợ trước hạn
    autoPayDebtRollover: true, // tự động đảo nợ
    earlyRepaymentFee: 500000,
    rejectReason: "",
    interestRate: [
      {
        ticker: "",
        interestRateYear: "20",
        interestRateDay: "0.3",
        startDay: "0",
        endDay: "5",
        sortNo: "1",
      },
      {
        ticker: "",
        interestRateYear: "25",
        interestRateDay: "0.3516",
        startDay: "6",
        endDay: "15",
        sortNo: "2",
      },
    ],
    packageStatus: "Đã duyệt",
    status: "Hoạt động",
    startDate: "2023-09-26",
    endDate: "2023-10-26",
    maker: "thanhnd",
    checker: "",
  },
  {
    code: "LN0008",
    name: "Gói kim cương 8 ",
    key: 3,
    description: "Khách hàng trong gói vip 8",
    productId: 21,
    packageType: "TC", // loại lãi xuất
    interestRateType: "TC",
    creditLimit: 500000000, // hạn mức vay
    loanTerm: 180, // kì hạn vay
    interestFreeDay: 30, // số ngày miễn lãi
    overdueInterest: 12.3, // lãi xuất quá hạn
    chargedOverdueInterest: true, // có tính trên lãi quá hạn
    interestCalculationBasis: 360, // cơ số tính lãi
    allowExtension: true, // cho phép gia hạn
    extensionCount: 5, // kỳ gia hạn
    extensionInterestRate: 15.49, // lãi xuất gia hạn
    extensionMax: 5, // số lần gia hạn tối đa
    onlineExtensionAllowed: true, // cho phép gia hạn online
    allowExtensionCount: 3, // số ngày trước kì hạn được phép gia hạn
    warningCount: 5, // số ngày cảnh báo đến hạn
    autoPayDebt: true, // tự động trả nợ trước hạn
    autoPayDebtRollover: true, // tự động đảo nợ
    earlyRepaymentFee: 500000,
    rejectReason: "",
    interestRate: [
      {
        ticker: "",
        interestRateYear: "20",
        interestRateDay: "0.3",
        startDay: "0",
        endDay: "5",
        sortNo: "1",
      },
      {
        ticker: "",
        interestRateYear: "25",
        interestRateDay: "0.3516",
        startDay: "6",
        endDay: "15",
        sortNo: "2",
      },
    ],
    packageStatus: "Hủy bỏ",
    status: "Không hoạt động",
    startDate: "2023-09-26",
    endDate: "2023-10-26",
    maker: "ruytank",
    checker: "",
  },
];

const ReportList = () => {
  const navigate = useNavigate();
  const [currentRecord, setCurrentRecord] = useState({});
  const [isOpenModalRemove, setIsOpenModalRemove] = useState(false);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Mã loại hình",
      dataIndex: "code",
    },
    {
      title: "Tên loại hình",
      dataIndex: "name",
    },
    {
      title: "Loại chính sách",
      dataIndex: "packageType",
    },
    {
      title: "Loại lãi suất",
      dataIndex: "packageType",
    },
    {
      title: "Hiệu lực (Từ)",
      dataIndex: "startDate",
    },
    {
      title: "Hiệu lực (Đến)",
      dataIndex: "endDate",
    },
    {
      title: "Trạng thái gói",
      dataIndex: "packageStatus",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "status",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setCurrentRecord(selectedRows[0]);
      dispatch(setRecord(selectedRows[0]))
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
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
                title: <Link to="/report/credit">Tín dụng</Link>,
              },
            ]}
          />
        </ReportListHeader>

        <ReportBtnNavigate>
          <BaseButton
            style={{ marginRight: "10px" }}
            text="Thêm mới"
            onClick={() => navigate("add")}
          />
          <BaseButton
            style={{ marginRight: "10px" }}
            text="Xem chi tiết"
            onClick={() => navigate("detail")}
          />
          <BaseButton
            style={{ marginRight: "10px" }}
            text="Sửa"
            onClick={() => navigate("detail")}
          />
          <BaseButton
            style={{ marginRight: "10px" }}
            text="Sao chép"
            onClick={() => navigate("add")}
          />
          <BaseButton
            style={{ marginRight: "10px" }}
            text="Xóa"
            onClick={() => setIsOpenModalRemove(true)}
          />
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

        {currentRecord && Object.keys(currentRecord).length > 0 && (
          <RemoveCredit
            open={isOpenModalRemove}
            setIsOpenModalRemove={setIsOpenModalRemove}
            currentRecord={currentRecord}
            setCurrentRecord={setCurrentRecord}
          />
        )}
      </div>
    </>
  );
};

export default ReportList;
