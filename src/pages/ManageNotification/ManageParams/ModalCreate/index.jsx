import BaseModal from "@/components/common/BaseModal";
import { Form, Input, message } from "antd";
import { useState } from "react";
import "./styles.scss";
const { TextArea } = Input;

const ModalCreate = ({ setIsOpenModalCreate, ...props }) => {
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
      initialValues={{}}
    >
      <Form.Item
        label="Tên biến"
        name="code"
        rules={[
          {
            required: true,
            message: `Vui lòng nhập trường này!`,
          },
        ]}
      >
        <Input placeholder="Nhập tên biến..." />
      </Form.Item>
      <Form.Item
        label="Kiểu dữ liệu"
        name="dataType"
        rules={[
          {
            required: true,
            message: `Vui lòng nhập trường này!`,
          },
        ]}
      >
        <Input placeholder="Nhập kiểu dữ liệu..." />
      </Form.Item>
      <Form.Item
        label="Định dạng"
        name="dataFormat"
      >
        <Input placeholder="Nhập định dạng dữ liệu..." />
      </Form.Item>
      <Form.Item
        label="Biến nguồn"
        name="paramSource"
      >
        <Input placeholder="Nhập paramSource..." />
      </Form.Item>
      <Form.Item
        name="paramMapping"
        label="Param Mapping"
      >
        <Input placeholder="Nhập paramMapping..." />
      </Form.Item>
      <Form.Item
        name="description"
        label="Mô tả"
      >
        <TextArea rows={4} placeholder="Nhập mô tả..." />
      </Form.Item>
    </Form>
  );

  return (
    <BaseModal
      wrapClassName="modal-create-params"
      title="Tạo biến"
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
