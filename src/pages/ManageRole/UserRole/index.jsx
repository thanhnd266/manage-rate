import BaseButton from "@/components/common/BaseButton";
import BaseTable from "@/components/common/BaseTable";
import { iconNoData } from "@/constants/icon";
import { Tag } from "antd";
import { useEffect, useState } from "react";
import "./styles.scss";
import ModalUpdate from "./ModalUpdate";
import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import ModalWatchUser from "./ModalWatchUser";
import FormFilter from "./FormFilter";

const ManageRole = () => {
  const [params, setParams] = useState({
    page: 0,
    size: 10,
    totalPage: null,
    totalRecord: null,
  });
  const [listRole, setListRole] = useState([]);
  const [listPermission, setListPermission] = useState([]);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalWatchUser, setIsOpenModalWatchUser] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [filter, setFilter] = useState({});
  const [searchMode, setSearchMode] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});

  const handleChangePage = async (pageChange, sizeChange) => {
    let payload;

    if (sizeChange) {
      payload = {
        page: pageChange - 1,
        size: sizeChange,
      };
    } else {
      payload = {
        page: pageChange - 1,
        size: params.size,
      };
    }

    setParams({
      ...params,
      ...payload,
    });
  };

  const columns = [
    {
      title: "Domain",
      dataIndex: "domain",
    },
    {
      title: "Tên quyền",
      dataIndex: "name",
      render: (text) => (
        <div>
          <Tag color="green">{text}</Tag>
        </div>
      ),
    },
    {
      title: "Loại",
      dataIndex: "type",
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      render: (_, record) => {
        return (
          <div className="flex items-center whitespace-nowrap">
            <Tag
              className="me-4 cursor-pointer"
              onClick={() => {
                setCurrentRecord(record);
                setIsOpenModalUpdate(true);
              }}
            >
              <span className="text-lg">
                <i className="fa-solid fa-pen-to-square"></i>
              </span>
              <span className="ms-1 tracking-tighter">Danh sách quyền</span>
            </Tag>

            <Tag
              className="me-4 cursor-pointer"
              onClick={() => {
                setCurrentRecord(record);
                setIsOpenModalWatchUser(true);
              }}
            >
              <span className="text-lg">
                <i className="fa-regular fa-users"></i>
              </span>
              <span className="ms-1 tracking-tighter">Xem người dùng</span>
            </Tag>

            <Tag
              color="red"
              className="me-4 cursor-pointer"
              onClick={() => {
                setCurrentRecord(record);
                setIsOpenModalDelete(true);
              }}
            >
              <span className="text-lg">
                <i className="fa-duotone fa-trash-can"></i>
              </span>
              <span className="ms-1 tracking-tighter">Xóa</span>
            </Tag>
          </div>
        );
      },
    },
  ];

  return (
    <div className="manage-role">
      {searchMode && (
        <FormFilter 
          setSearchMode={setSearchMode} 
          params={params}
          setParams={setParams}
          setFilter={setFilter}
        />
      )}

      <div className="mb-4 flex justify-start">
        <BaseButton
          icon={<i className="fa-solid fa-plus"></i>}
          text="Thêm mới"
          className="btn-add-role me-3"
          onClick={() => setIsOpenModalCreate(true)}
        />

        <BaseButton
          icon={<i className="fa-regular fa-filter"></i>}
          text="Bộ lọc"
          onClick={() => setSearchMode(!searchMode)}
          className={
            "text-[#828282]" +
            (searchMode ? " border-0 bg-main !text-white" : "")
          }
        />
      </div>

      <BaseTable
        columns={columns}
        data={listRole}
        title={() => (
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">QUẢN LÝ QUYỀN</div>
          </div>
        )}
        locale={{
          emptyText: (
            <div className="flex flex-col items-center justify-center py-8">
              <span>{iconNoData}</span>
              <div className="mt-2 text-lg font-medium">Không có dữ liệu</div>
            </div>
          ),
        }}
        pagination={{
          defaultPageSize: params?.size,
          total: params?.totalRecord,
          pageSizeOptions: [5, 10, 20, 50],
          showSizeChanger: true,
          current: params?.page + 1,
          onChange: handleChangePage,
          onShowSizeChange: handleChangePage,
        }}
      />

      {isOpenModalCreate && listPermission && (
        <ModalCreate
          open={isOpenModalCreate}
          setIsOpenModalCreate={setIsOpenModalCreate}
          listPermission={listPermission}
        />
      )}

      {isOpenModalUpdate && listPermission && (
        <ModalUpdate
          open={isOpenModalUpdate}
          setIsOpenModalUpdate={setIsOpenModalUpdate}
          currentRecord={currentRecord}
          setCurrentRecord={setCurrentRecord}
          listPermission={listPermission}
        />
      )}

      {isOpenModalWatchUser && (
        <ModalWatchUser
          open={isOpenModalWatchUser}
          setIsOpenModalWatchUser={setIsOpenModalWatchUser}
          currentRecord={currentRecord}
          setCurrentRecord={setCurrentRecord}
        />
      )}

      {isOpenModalDelete && (
        <ModalDelete
          open={isOpenModalDelete}
          setIsOpenModalDelete={setIsOpenModalDelete}
          currentRecord={currentRecord}
          setCurrentRecord={setCurrentRecord}
        />
      )}
    </div>
  );
};

export default ManageRole;
