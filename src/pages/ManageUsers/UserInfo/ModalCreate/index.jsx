import BaseModal from "@/components/common/BaseModal";
import { Form, Input, Select, message } from "antd";
import { useState } from "react";
import "./styles.scss";
import { validateEmail } from "../../../../helpers/validation";

const ModalCreate = ({ setIsOpenModalCreate, listRole, ...props }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);


  const handleCreate = async () => {
    
  };

  const handleCancel = () => {
    form.resetFields();
    setIsOpenModalCreate(false);
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
      preserve={false}
      initialValues={{
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirm: "",
        createdBy: "system",
        domain: "DSC-EMPLOYEE",
        // brokerId: '0000',
      }}
    >
      <Form.Item
        label="Tên đăng nhập"
        name="username"
        rules={[
          ({ getFieldValue }) => ({
            required: true,
            min: 3,
            max: 30,
            validator(_, value) {
              const regex = /[A-Z!@#$%^&*()+{}\[\]:;<>,?~\\\s]/;
              if (value.match(regex)) {
                return Promise.reject(new Error("Tên người dùng không được viết hoa hoặc có ký tự đặc biệt"));
              } else if (value.trim() === "") {
                return Promise.reject(new Error("Vui lòng nhập trường này!"));
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input placeholder="Nhập tên người dùng..." />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          ({ getFieldValue }) => ({
            required: true,
            validator(_, value) {
              if (validateEmail(value)) {
                return Promise.resolve();
              } else if (value.trim() === "") {
                return Promise.reject(new Error("Vui lòng nhập trường này!"));
              }
              return Promise.reject(new Error("Email không chính xác!"));
            },
          }),
        ]}
      >
        <Input placeholder="Nhập email..." />
      </Form.Item>
      <Form.Item
        label="Họ và tên đệm"
        name="lastName"
        rules={[
          {
            required: true,
            message: `Vui lòng nhập trường này!`,
          },
        ]}
      >
        <Input placeholder="Nhập họ và tên đệm người dùng..." />
      </Form.Item>
      <Form.Item
        label="Tên"
        name="firstName"
        rules={[
          {
            required: true,
            message: `Vui lòng nhập trường này!`,
          },
        ]}
      >
        <Input placeholder="Nhập tên người dùng..." />
      </Form.Item>
      <Form.Item
        label="Trạng thái"
        name="status"
        rules={[
          {
            required: true,
            message: `Vui lòng nhập trường này!`,
          },
        ]}
      >
        <Select
          placeholder="Chọn trạng thái..."
          popupClassName="modal-create-selector"
        >
          <Select.Option value="ACTIVE">ACTIVE</Select.Option>
          <Select.Option value="INACTIVE">INACTIVE</Select.Option>
          <Select.Option value="BANNED">BANNED</Select.Option>
          <Select.Option value="DRAFT">DRAFT</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Quyền"
        name="role"
        rules={[
          {
            required: true,
            message: `Vui lòng nhập trường này!`,
          },
        ]}
      >
        <Select
          placeholder="Chọn quyền của người dùng..."
          popupClassName="modal-create-selector"
        >
          {listRole?.map((role) => (
            <Select.Option key={role.id} value={role.name}>
              {role.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: `Vui lòng nhập trường này!`,
          },
        ]}
      >
        <Input.Password placeholder="Nhập mật khẩu..." />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Nhập lại mật khẩu"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Nhập lại mật khẩu của bạn!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Mật khẩu nhập lại không trùng khớp!")
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="Nhập lại mật khẩu..." />
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
      wrapClassName="modal-create-user"
      title="Tạo người dùng"
      content={content}
      onOk={handleCreate}
      okText="Tạo mới"
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

export default ModalCreate;
