import BaseButton from "@/components/common/BaseButton";
import BaseTable from "@/components/common/BaseTable";
import { iconNoData } from "@/constants/icon";
import { Tag } from "antd";
import { useState } from "react";
// import FormFilter from "./FormFilter";
import Loading from "@/components/Loading";
import dayjs from "dayjs";
import FormFilter from "./FormFilter";
import ModalCreate from "./ModalCreate";
import ModalUpdate from "./ModalUpdate";
import "./styles.scss";

const ManageAppPush = () => {
  const [params, setParams] = useState({
    page: 0,
    size: 10,
    totalPage: null,
    totalRecord: null,
  });
  const [searchMode, setSearchMode] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});
  const [filter, setFilter] = useState({});
  const [listAppPush, setListAppPush] = useState([]);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [listRegister, setListRegister] = useState([]);

  const columns = [
    {
      title: "Nhà cung cấp",
      dataIndex: "serviceProvider",
    },
    {
      title: "Gửi đến",
      dataIndex: "destination",
      render: (destination) => (destination ? destination : "Chưa cập nhật"),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      render: (title) => (title ? title : "Chưa cập nhật"),
    },
    {
      title: "Nội dung",
      dataIndex: "body",
      render: (body) => (body ? body : "Chưa cập nhật"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => {
        let color = "red";
        if (status?.toLowerCase() === "active") {
          color = "green";
        }
        return (
          <Tag className="font-semibold" color={color} key={status}>
            {status?.toUpperCase() || "Chưa cập nhật"}
          </Tag>
        );
      },
    },
    {
      title: "Ngày gửi",
      dataIndex: "sendDate",
      render: (_, record) => {
        return (
          <div>{dayjs(record?.sendDate).format("DD-MM-YYYY HH:mm:ss")}</div>
        );
      },
    },
    // {
    //   title: "Hành động",
    //   dataIndex: "actions",
    //   width: "10%",
    //   align: "center",
    //   render: (_, record) => {
    //     return (
    //       <div className="whitespace-nowrap">
    //         <Tooltip title="Sửa" onClick={() => handleShowModalUpdate(record)}>
    //           <Typography.Link className="text-base">
    //             <i className="fa-solid fa-pen-to-square"></i>
    //           </Typography.Link>
    //         </Tooltip>
    //         <Tooltip title="Xóa">
    //           <Typography.Link className="text-base !text-danger">
    //             <i className="fa-sharp fa-regular fa-trash"></i>
    //           </Typography.Link>
    //         </Tooltip>
    //       </div>
    //     );
    //   },
    // },
  ];

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

        <div className="manage-apppush">
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
              text="Gửi thông báo"
              className="btn-add-apppush me-3"
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

          {listAppPush && (
            <BaseTable
              columns={columns}
              data={listAppPush}
              title={() => (
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">LỊCH SỬ GỬI THÔNG BÁO</div>
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
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => {
                    setCurrentRecord(record);
                    setIsOpenModalUpdate(true);
                  },
                };
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

          {listRegister && (
            <ModalCreate
              open={isOpenModalCreate}
              setIsOpenModalCreate={setIsOpenModalCreate}
              currentRecord={currentRecord}
              listRegister={listRegister}
              setCurrentRecord={setCurrentRecord}
            />
          )}

          {Object.keys(currentRecord).length > 0 && (
            <ModalUpdate
              open={isOpenModalUpdate}
              setIsOpenModalUpdate={setIsOpenModalUpdate}
              currentRecord={currentRecord}
              setCurrentRecord={setCurrentRecord}
              maskClosable={true}
            />
          )}
        </div>
    </>
  );
};

export default ManageAppPush;
