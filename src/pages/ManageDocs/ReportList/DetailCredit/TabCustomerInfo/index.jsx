import BaseButton from "@/components/common/BaseButton";
import BaseTable from "@/components/common/BaseTable";
import { useState } from "react";
import FormFilter from "./FormFilter";
import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import { TabCustomerBtnNavigate } from "./styled";

const data = [
  {
    id: 1,
    key: 1,
    code: "024C896689",
    type: ".6",
    name: 'Nguyễn Văn A',
    fromDate: "17/10/2022",
    toDate: "17/10/2022",
    customerStatus: "Chờ duyệt",
    status: "Hoạt động"
  },
  {
    id: 2,
    key: 2,
    code: "024C888888",
    name: 'Nguyễn Văn B',
    type: ".8",
    fromDate: "17/10/2022",
    toDate: "17/10/2022",
    customerStatus: "Hủy bỏ",
    status: "Không hoạt động"
  },
  {
    id: 3,
    key: 3,
    code: "024C111111",
    name: 'Nguyễn Văn C',
    type: ".8",
    fromDate: "17/10/2022",
    toDate: "17/10/2022",
    customerStatus: "Đã duyệt",
    status: "Hoạt động"
  },
];

const TabCustomerInfo = () => {
  const [currentRecord, setCurrentRecord] = useState({});
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const columns = [
    {
      title: 'Số TK lưu ký',
      dataIndex: 'code',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Loại tiểu khoản',
      dataIndex: 'type',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
    },
    {
      title: 'Hiệu lực từ',
      dataIndex: 'fromDate',
    },
    {
      title: 'Hiệu lực đến',
      dataIndex: 'toDate',
    },
    {
      title: 'Trạng thái KH',
      dataIndex: 'customerStatus',
    },
    {
      title: 'Trạng thái hoạt động',
      dataIndex: 'status',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setCurrentRecord(selectedRows[0]);
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
        <TabCustomerBtnNavigate>
          <BaseButton style={{ marginRight: "10px" }} text="Thêm mới" onClick={() => setIsOpenModalCreate(true)} />
          <BaseButton style={{ marginRight: "10px" }} text="Import" onClick={() => {}} />
          <BaseButton style={{ marginRight: "10px" }} text="Xóa" onClick={() => setIsOpenModalDelete(true)} />
        </TabCustomerBtnNavigate>

        <FormFilter />

        <BaseTable
          columns={columns}
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          data={data}
        />

        <ModalCreate 
          open={isOpenModalCreate}
          setIsOpenModalCreate={setIsOpenModalCreate}
        />

        {currentRecord && Object.keys(currentRecord).length > 0 && (
          <ModalDelete 
            open={isOpenModalDelete} 
            setIsOpenModalDelete={setIsOpenModalDelete} 
            currentRecord={currentRecord} 
            setCurrentRecord={setCurrentRecord} 
          />
        )}
      </div>
    </>
  );
};

export default TabCustomerInfo;
