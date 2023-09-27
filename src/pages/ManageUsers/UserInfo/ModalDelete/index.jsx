import BaseModal from '@/components/common/BaseModal';
import { useState } from 'react';

const ModalDelete = ({ setIsOpenModalDelete, currentRecord, setCurrentRecord, ...props }) => {

  const [loading, setLoading] = useState(false);

    const handleDeleteUser = async () => {
    
    }

    const handleCancel = () => {
        setIsOpenModalDelete(false);
    }

  return (
    <BaseModal 
        title="Xóa người dùng"  
        content="Bạn có chắc chắn muốn xóa người dùng này?"
        onOk={handleDeleteUser}
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