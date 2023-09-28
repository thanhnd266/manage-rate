
import BaseBreadcrumb from '@/components/common/BaseBreadcrumb';
import { Tabs } from 'antd';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TabGeneralInfo from './TabGeneralInfo';

const AddCredit = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const tabs = [
    {
      label: `Thông tin chung`,
      key: 1,
      children: (<TabGeneralInfo />),
    },
    {
      label: `Thông tin người dùng`,
      key: 2,
      children: `Thong tin người dùng`,
    }
  ]

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
            title: <Link to="/report/credit/add">Thêm mới</Link>,
          },
        ]}
      />

  <Tabs
    onChange={onChange}
    items={tabs}
  />
  
    </div>
  )
}

export default AddCredit