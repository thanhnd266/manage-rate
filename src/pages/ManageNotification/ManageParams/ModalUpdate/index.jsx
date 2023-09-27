import BaseModal from "@/components/common/BaseModal";
import { Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import "./styles.scss";
const { TextArea } = Input;

const ModalUpdate = ({ setIsOpenModalUpdate, currentRecord, setCurrentRecord, ...props }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (currentRecord && Object.keys(currentRecord).length > 0) {
      form.setFieldsValue({
        ...currentRecord,
      });
    }
  }, [currentRecord]);

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
      layout="horizontal"
      style={{
        maxWidth: 600,
      }}
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
      wrapClassName="modal-update-params"
      title="Cập nhật biến"
      content={content}
      onOk={handleUpdateUser}
      okText="Cập nhật"
      onCancel={handleCancel}
      cancelText="Hủy"
      okButtonProps={{
        loading: loading,
      }}
      forceRender
      width={600}
      {...props}
    />
  );
};

export default ModalUpdate;
