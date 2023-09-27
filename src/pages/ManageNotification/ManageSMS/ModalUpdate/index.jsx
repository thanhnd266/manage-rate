import BaseModal from "@/components/common/BaseModal";
import {
  Col,
  Form,
  Input,
  Row
} from "antd";
import "./styles.scss";

const ModalUpdate = ({ setIsOpenModalUpdate, listTemplate, currentRecord, setCurrentRecord, ...props }) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setCurrentRecord({});
    setIsOpenModalUpdate(false);
  };

  const content = (
    <div className="content-wrapper">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          sender: currentRecord?.sender || "",
          destination: currentRecord?.destination || "",
          sendDate: currentRecord?.sendDate || "",
          status: currentRecord?.status || "",
        }}
      >
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Người gửi"
              name="sender"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Input
                disabled
                className="!cursor-default !bg-transparent"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Gửi tới"
              name="destination"
            >
              <Input disabled className="!cursor-default !bg-transparent" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Trạng thái" name="status">
              <Input disabled className="!cursor-default !bg-transparent" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Thời gian" name="sendDate">
              <Input disabled className="!cursor-default !bg-transparent" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Nội dung"
        >
          <div className="preview-template">
            <div className="preview-template__item" dangerouslySetInnerHTML={{ __html: currentRecord?.content }} />
          </div>
        </Form.Item>
      </Form>
        
    </div>
  );

  return (
    <BaseModal
      wrapClassName="modal-detail-sms"
      title="Chi tiết tin nhắn"
      content={content}
      onCancel={handleCancel}
      centered
      footer={false}
      {...props}
    />
  );
};

export default ModalUpdate;
