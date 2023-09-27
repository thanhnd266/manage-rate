import { Table } from "antd";
import React from "react";
import "./styles.scss";

const BaseTable = ({ data, columns, ...props }) => {
  return (
    <div className="base-table">
      <Table columns={columns} dataSource={data} {...props} />
    </div>
  );
};

export default BaseTable;
