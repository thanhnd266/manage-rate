import BaseModal from "@/components/common/BaseModal";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import "./styles.scss";

const { TextArea } = Input;

const ModalCreate = ({ setIsOpenModalCreate, ...props }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [registerSelected, setRegisterSelected] = useState([]);
  const [variables, setVariables] = useState([]);
  const [topicSelected, setTopicSelected] = useState();

  const handleSubmit = async () => {
    
  };

  const handleCancel = () => {
    setIsOpenModalCreate(false);
    setRegisterSelected([]);
    setTopicSelected();
    form.resetFields();
  };

  const content = (
    <>
      <Form form={form} layout="vertical">
        <Row gutter={20}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Input placeholder="Nhập tiêu đề..." />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Nội dung"
              name="body"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Nhập nội dung..."
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );

  return (
    <BaseModal
      wrapClassName="modal-create-apppush"
      title="Gửi thông báo"
      content={content}
      onOk={() => handleSubmit()}
      onCancel={handleCancel}
      okButtonProps={{
        htmlType: "submit",
        loading: loading,
      }}
      okText="Gửi"
      cancelText="Hủy"
      {...props}
    />
  );
};

export default ModalCreate;
