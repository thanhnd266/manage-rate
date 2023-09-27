import BaseTable from "@/components/common/BaseTable";
import { Tag, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import BaseButton from "@/components/common/BaseButton";
import { iconNoData } from "@/constants/icon";
import FormFilter from "./FormFilter";
import "./styles.scss";
import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import ModalUpdate from "./ModalUpdate";
import usePermission from "@/hooks/usePermission";

const UserInfo = () => {
  const [params, setParams] = useState({
    page: 0,
    size: 10,
    totalPage: null,
    totalRecord: null,
  });
  const [searchMode, setSearchMode] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});
  const [filter, setFilter] = useState({});
  const [listUser, setListUser] = useState([]);
  const [listRole, setListRole] = useState([]);

  const [createUserPermission] = usePermission({ key: "dsc.auth.user.create" });
  const [updateUserPermission] = usePermission({ key: "dsc.auth.user.update" });
  
  const columns = [
    {
      title: "Tài Khoản",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email) => email ? email : 'Chưa cập nhật',
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      render: (phone) => phone ? phone : 'Chưa cập nhật',
    },
    {
      title: "Phân quyền",
      dataIndex: "role",
      render: (role) => {
        return role[0] ? (
          <Tag className="font-semibold" color="gold">
            {role[0]}
          </Tag>
          
        ) : (
          <Tag className="font-semibold">
            Không có quyền
          </Tag>
        )
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => {
        let color = "red";
        if(status.toLowerCase() === "active") {
          color = "green";
        }
        return (
          <Tag className="font-semibold" color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        )
      },
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      width: "10%",
      align: "center",
      render: (_, record) => {
        return (
          <div className="whitespace-nowrap">
            <Tooltip title="Sửa">
              <Typography.Link 
                className={
                  updateUserPermission
                    ? "text-base"
                    : "ant-typography-text-disabled"
                }
                onClick={updateUserPermission ? () => handleShowModalUpdate(record) : () => {}} 
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </Typography.Link>
            </Tooltip>
            <Tooltip title="Xóa">
              <Typography.Link 
                className="text-base !text-danger"
                onClick={() => {
                  setCurrentRecord(record);
                  setOpenModalDelete(true);
                }}
              >
                <i className="fa-sharp fa-regular fa-trash"></i>
              </Typography.Link>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const handleShowModalUpdate = (record) => {
    setCurrentRecord(record);
    setOpenModalUpdate(true)
  }

  const handleChangePage = (pageChange, sizeChange) => {
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

  return (
    <div className="manage-user">
      {searchMode && (
        <FormFilter 
          setSearchMode={setSearchMode} 
          params={params}
          setParams={setParams}
          setListUser={setListUser}
          setFilter={setFilter}
          listRole={listRole}
        />
      )}

      <div className="mb-4 flex justify-start">
        <BaseButton
          icon={<i className="fa-solid fa-plus"></i>}
          text="Thêm mới"
          className={createUserPermission ? "btn-add-user me-3" : "me-3"}
          onClick={createUserPermission ? () => setOpenModalCreate(true) : () => {}}
          disabled={!createUserPermission}
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

      {listUser && (
        <BaseTable
          columns={columns}
          data={listUser}
          title={() => (
            <div className="flex items-center justify-between">
              <div className="font-bold text-lg">QUẢN LÝ NGƯỜI DÙNG</div>
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
      )}

      {createUserPermission && listRole.length > 0 && (
        <ModalCreate 
          open={openModalCreate} 
          setIsOpenModalCreate={setOpenModalCreate}
          listRole={listRole}
        />
      )}

      {Object.keys(currentRecord).length > 0  && listRole.length > 0 && (
        <ModalUpdate
          open={openModalUpdate} 
          setIsOpenModalUpdate={setOpenModalUpdate}
          currentRecord={currentRecord}
          setCurrentRecord={setCurrentRecord}
          listRole={listRole}
        />
      )}

      {Object.keys(currentRecord).length > 0 && (
        <ModalDelete
          open={openModalDelete}
          setIsOpenModalDelete={setOpenModalDelete}
          currentRecord={currentRecord}
          setCurrentRecord={setCurrentRecord}
        />
      )}
    </div>
  );
};

export default UserInfo;
