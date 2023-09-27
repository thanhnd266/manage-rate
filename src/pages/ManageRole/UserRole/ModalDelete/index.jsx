import BaseModal from '@/components/common/BaseModal';
import { useState } from 'react';
import { message } from 'antd';

const ModalDelete = ({ setIsOpenModalDelete, currentRecord, setCurrentRecord, ...props }) => {

  const [loading, setLoading] = useState(false);

    const handleDeleteRole = async () => {
        
    }

    const handleCancel = () => {
        setIsOpenModalDelete(false);
    }

  return (
    <BaseModal 
        title="Xóa quyền"  
        content="Bạn có chắc chắn muốn xóa quyền này?"
        onOk={handleDeleteRole}
        okText="Xóa"
        onCancel={handleCancel}
        cancelText="Hủy"
        maskClosable={true}
        okButtonProps={{
          loading: loading,
          danger: true,
          className: "hover:bg-danger"
        }}
        {...props}
    />
  )
}

export default ModalDelete