import BaseTable from "@/components/common/BaseTable";
import { Tag, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import BaseButton from "@/components/common/BaseButton";
import { iconNoData } from "@/constants/icon";
// import FormFilter from "./FormFilter";
import "./styles.scss";
import ModalCreate from "./ModalCreate";
import dayjs from "dayjs";
import FormFilter from "./FormFilter";
import ModalUpdate from "./ModalUpdate";

const ManageSMS = () => {
  const [params, setParams] = useState({
    page: 0,
    size: 10,
    totalPage: null,
    totalRecord: null,
  });
  const [searchMode, setSearchMode] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});
  const [filter, setFilter] = useState({});
  const [listSms, setListSms] = useState([]);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [listTemplate, setListTemplate] = useState([]);

  const columns = [
    {
      title: "Người gửi",
      dataIndex: "sender",
    },
    {
      title: "Gửi đến",
      dataIndex: "destination",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      width: "50%",
      render: (content) => (content ? content : "Chưa cập nhật"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => {
        let color = "red";
        if (status.toLowerCase() === "success") {
          color = "green";
        }
        if (status.toLowerCase() === "draft") {
          color = "volcano";
        }
        if (status.toLowerCase() === "pending") {
          color = "gold";
        }
        return (
          <Tag className="font-semibold" color={color} key={status}>
            {status.toUpperCase()}
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
    <div className="manage-sms">
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
          text="Gửi SMS"
          className="btn-add-sms me-3"
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

      {listSms && (
        <BaseTable
          columns={columns}
          data={listSms}
          title={() => (
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">LỊCH SỬ GỬI SMS</div>
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

      <ModalCreate
        open={isOpenModalCreate}
        setIsOpenModalCreate={setIsOpenModalCreate}
        listTemplate={listTemplate}
      />

      {Object.keys(currentRecord).length > 0 && (
        <ModalUpdate
          open={isOpenModalUpdate}
          setIsOpenModalUpdate={setIsOpenModalUpdate}
          listTemplate={listTemplate}
          currentRecord={currentRecord}
          setCurrentRecord={setCurrentRecord}
          maskClosable={true}
        />
      )}
    </div>
  );
};

export default ManageSMS;
