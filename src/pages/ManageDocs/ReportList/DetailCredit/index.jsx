
import React from 'react'
import TabGeneralInfo from './TabGeneralInfo';
import BaseBreadcrumb from '@/components/common/BaseBreadcrumb';
import { Link } from 'react-router-dom';
import { Tabs } from 'antd';
import TabCustomerInfo from './TabCustomerInfo';

const DetailCredit = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const tabs = [
    {
      label: `Thông tin chung`,
      key: 1,
      children: <TabGeneralInfo />,
    },
    {
      label: `Thông tin người dùng`,
      key: 2,
      children: <TabCustomerInfo />,
    },
  ];

  return (
    <div>
      <BaseBreadcrumb
        items={[
          {
            title: "Nghiệp vụ",
          },
          {
            title: <Link to="/report/credit">Tín dụng</Link>,
          },
          {
            title: <Link to="/report/credit/detail">Sửa</Link>,
          },
        ]}
      />

      <Tabs onChange={onChange} items={tabs} />
    </div>
  );
}

export default DetailCredit