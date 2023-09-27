import BaseModal from "@/components/common/BaseModal";
import { Form, Input, Select, message } from "antd";
import { useState } from "react";
import "./styles.scss";

const ModalUpdate = ({ setIsOpenModalUpdate, currentRecord, setCurrentRecord, listRole, ...props }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);


  const handleUpdateUser = async () => {
    
  };

  const handleCancel = () => {
    form.resetFields();
    setIsOpenModalUpdate(false);
    setCurrentRecord({});
  };

  const content = (
    <Form
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        username: currentRecord.username || '',
        email: currentRecord.email || '',
        lastName: currentRecord.lastName || "",
        firstName: currentRecord.firstName || "",
        phone: currentRecord.phone || "",
        country: currentRecord.country || "",
        status: currentRecord.status || "",
        role: (currentRecord?.role?.length > 0 && currentRecord.role[0]) || "",
      }}
    >
      <Form.Item 
        label="Tên người dùng" 
        name="username"
      >
        <Input disabled={true} />
      </Form.Item>
      <Form.Item 
        label="Email" 
        name="email"
      >
        <Input disabled={true} />
      </Form.Item>
      <Form.Item label="Họ và tên đệm" name="lastName">
        <Input placeholder="Nhập họ và tên đệm người dùng..." />
      </Form.Item>
      <Form.Item label="Tên" name="firstName">
        <Input placeholder="Nhập tên người dùng..." />
      </Form.Item>
      <Form.Item label="Quyền" name="role">
        <Select
          placeholder="Chọn quyền của người dùng"
          popupClassName="modal-create-selector"
        >
          {listRole?.map(role => <Select.Option key={role.id} value={role.name}>{role.name}</Select.Option>)}
        </Select>
      </Form.Item>
      {/* <Form.Item
        label="Trạng thái"
        name="status"
      >
        <Select
          placeholder="Chọn trạng thái"
          popupClassName="modal-create-selector"
        >
          <Select.Option value="ACTIVE">ACTIVE</Select.Option>
          <Select.Option value="INACTIVE">INACTIVE</Select.Option>
          <Select.Option value="BANNED">BANNED</Select.Option>
          <Select.Option value="DRAFT">DRAFT</Select.Option>
        </Select>
      </Form.Item> */}
      <Form.Item label="Số điện thoại" name="phone">
        <Input placeholder="Nhập số điện thoại..." />
      </Form.Item>
      <Form.Item label="Địa chỉ" name="country">
        <Input placeholder="Nhập địa chỉ..." />
      </Form.Item>
      {/* <Form.Item 
        label="Domain" 
        name="domain"
      >
        <Input disabled={true} />
      </Form.Item> */}
    </Form>
  );

  return (
    <BaseModal
      wrapClassName="modal-update-user"
      title="Cập nhật người dùng"
      content={content}
      onOk={handleUpdateUser}
      okText="Cập nhật"
      onCancel={handleCancel}
      cancelText="Hủy"
      okButtonProps={{
        loading: loading,
      }}
      width={600}
      {...props}
    />
  );
};

export default ModalUpdate;
