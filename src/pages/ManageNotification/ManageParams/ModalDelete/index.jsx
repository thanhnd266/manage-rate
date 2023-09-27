import BaseModal from '@/components/common/BaseModal';
import { useState } from 'react';
import { message } from 'antd';

const ModalDelete = ({ setIsOpenModalDelete, currentRecord, setCurrentRecord, ...props }) => {

  const [loading, setLoading] = useState(false);

    const handleDeleteParam = async () => {
    }

    const handleCancel = () => {
        setIsOpenModalDelete(false);
    }

  return (
    <BaseModal 
        title="Xóa biến"  
        content={`Bạn có chắc chắn muốn xóa biến $${currentRecord?.code}?`}
        onOk={handleDeleteParam}
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