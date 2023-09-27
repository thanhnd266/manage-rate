import BaseTable from "@/components/common/BaseTable";
import { Tag, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import BaseButton from "@/components/common/BaseButton";
import { iconNoData } from "@/constants/icon";
// import FormFilter from "./FormFilter";
import "./styles.scss";
import ModalCreate from "./ModalCreate";
import ModalUpdate from "./ModalUpdate";
import Loading from "@/components/Loading";
import FormFilter from "./FormFilter";
import ModalDelete from "./ModalDelete";

const ManageParams = () => {
  const [params, setParams] = useState({
    page: 0,
    size: 10,
    totalPage: null,
    totalRecord: null,
  });
  const [searchMode, setSearchMode] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});
  const [filter, setFilter] = useState({});
  const [listVariable, setListVariable] = useState([]);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const columns = [
    {
      title: "Tên biến",
      dataIndex: "code",
      onCell: (record, rowIndex) => {
        return {
          onClick: () => handleShowModalUpdate(record),
        };
      },
    },
    {
      title: "Biến nguồn",
      dataIndex: "paramSource",
      render: (paramSource) => (paramSource ? paramSource : "Chưa cập nhật"),
      onCell: (record, rowIndex) => {
        return {
          onClick: () => handleShowModalUpdate(record),
        };
      },
    },
    // {
    //   title: "paramMapping",
    //   dataIndex: "paramMapping",
    //   width: "20%",
    //   render: (paramMapping) => (paramMapping ? paramMapping : "Chưa cập nhật"),
    // },
    {
      title: "Kiểu dữ liệu",
      dataIndex: "dataType",
      onCell: (record, rowIndex) => {
        return {
          onClick: () => handleShowModalUpdate(record),
        };
      },
    },
    {
      title: "Tạo bởi",
      dataIndex: "createdBy",
      onCell: (record, rowIndex) => {
        return {
          onClick: () => handleShowModalUpdate(record),
        };
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (description) => (description ? description : "Chưa cập nhật"),
      onCell: (record, rowIndex) => {
        return {
          onClick: () => handleShowModalUpdate(record),
        };
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
            <Tooltip title="Sửa" onClick={() => handleShowModalUpdate(record)}>
              <Typography.Link className="text-base">
                <i className="fa-solid fa-pen-to-square"></i>
              </Typography.Link>
            </Tooltip>
            <Tooltip title="Xóa" onClick={() => {
              setIsOpenModalDelete(true);
              setCurrentRecord(record);
            }}>
              <Typography.Link className="text-base !text-danger">
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
    setIsOpenModalUpdate(true);
  };

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
    <>

        <div className="manage-params">
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
              className="btn-add-params me-3"
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

          {listVariable && (
            <BaseTable
              columns={columns}
              data={listVariable}
              title={() => (
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">QUẢN LÝ BIẾN</div>
                </div>
              )}
              locale={{
                emptyText: (
                  <div className="flex flex-col items-center justify-center py-8">
                    <span>{iconNoData}</span>
                    <div className="mt-2 text-lg font-medium">
                      Không có dữ liệu
                    </div>
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

          <ModalCreate
            open={isOpenModalCreate}
            setIsOpenModalCreate={setIsOpenModalCreate}
            currentRecord={currentRecord}
            setCurrentRecord={setCurrentRecord}
          />

          {Object.keys(currentRecord).length > 0 && (
            <ModalUpdate
              open={isOpenModalUpdate}
              setIsOpenModalUpdate={setIsOpenModalUpdate}
              currentRecord={currentRecord}
              setCurrentRecord={setCurrentRecord}
            />
          )}

          {Object.keys(currentRecord).length > 0 && (
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

export default ManageParams;
