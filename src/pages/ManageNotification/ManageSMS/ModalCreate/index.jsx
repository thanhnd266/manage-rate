import BaseModal from "@/components/common/BaseModal";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { useEffect, useState } from "react";
import "./styles.scss";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { convertToCamalCase } from "@/helpers/convert";

const { TextArea } = Input;

const ModalCreate = ({ setIsOpenModalCreate, listTemplate, ...props }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [variables, setVariables] = useState([]);

  const handleSubmit = async () => {
    
  };

  const handleVariableChange = (index, event) => {
    const updatedVariables = [...variables];
    if (!updatedVariables[index]) {
      updatedVariables[index] = {};
    }
    updatedVariables[index].name = event.target.value;
    setVariables(updatedVariables);
  };

  const handleValueChange = (index, event) => {
    const updatedVariables = [...variables];
    updatedVariables[index].value = event.target.value;
    setVariables(updatedVariables);
  };

  const handleRemoveVariable = (index, event) => {
    const updatedVariables = [...variables];
    updatedVariables.splice(index, 1);
    setVariables(updatedVariables);
  };

  const handleSelectTemplate = (value) => {
    if (value) {
      const chosenTemplate = listTemplate.find(
        (template) => template.code === value
      );
      setSelectedTemplate(chosenTemplate);
    } else {
      setSelectedTemplate({});
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setVariables([]);
    setSelectedTemplate({});
    setIsOpenModalCreate(false);
  };

  const getPreview = () => {
    let modifiedTemplate = selectedTemplate.content;
    variables.forEach((variable) => {
      const regex = new RegExp(`\\$${variable.name}`, "g");
      if (variable.value) {
        modifiedTemplate = modifiedTemplate.replace(regex, variable.value);
      }
    });
    return { __html: modifiedTemplate };
  };

  const content = (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          source: "DSC",
          templateCode: "",
        }}
      >
        <Row gutter={20}>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              label="Người gửi"
              name="source"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Input placeholder="Nhập người gửi..." />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12}>
            <Form.Item
              label="Gửi tới"
              name="destination"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Input placeholder="Nhập SĐT người nhận..." />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Input placeholder="Nhập mô tả..." />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="templateCode" label="Template">
              <Select allowClear onChange={handleSelectTemplate}>
                <Select.Option value="">Mặc định</Select.Option>
                {listTemplate.filter(item => item.notiType.toLowerCase() === "sms").map((template) => {
                  return (
                    <Select.Option value={template.code} key={template.id}>
                      {template?.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          {selectedTemplate && Object.keys(selectedTemplate).length > 0 && (
            <Col span={24}>
              <h2 className="mb-2 mt-2">Biến</h2>
              <Form.List name="params">
                {(fields, { add, remove }, { errors }) => (
                  <>
                    <Row gutter={20}>
                      {fields.map((field, index) => (
                        <Col span={12} key={field.key}>
                          <Form.Item
                            label={
                              <>
                                <Input
                                  placeholder="Nhập tên biến..."
                                  style={{ width: "200px" }}
                                  className="input-params input-params__key"
                                  onChange={(event) =>
                                    handleVariableChange(index, event)
                                  }
                                />
                              </>
                            }
                            required={false}
                          >
                            <Form.Item
                              {...field}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message:
                                    "Vui lòng nhập đầy đủ tên biến và giá trị biến!",
                                },
                              ]}
                              noStyle
                            >
                              <div>
                                <TextArea
                                  rows={4}
                                  placeholder="Nhập giá trị của biến..."
                                  className="input-params relative mt-2"
                                  onChange={(event) =>
                                    handleValueChange(index, event)
                                  }
                                />
                                <MinusCircleOutlined
                                  className="dynamic-delete-button"
                                  onClick={(event) => {
                                    remove(field.name);
                                    handleRemoveVariable(index, event);
                                  }}
                                />
                              </div>
                            </Form.Item>
                          </Form.Item>
                        </Col>
                      ))}
                    </Row>
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                        className="btn-add-param"
                      >
                        Thêm biến
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
          )}

          {selectedTemplate && Object.keys(selectedTemplate).length === 0 && (
            <Col span={24}>
              <Form.Item
                label="Nội dung"
                name="content"
                rules={[
                  {
                    required: true,
                    message: `Vui lòng nhập trường này!`,
                  },
                ]}
              >
                <TextArea
                  styles={{
                    height: 300,
                  }}
                  rows={6}
                  classNames="ant-textarea-content"
                  placeholder="Nhập nội dung..."
                />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>

      {selectedTemplate && Object.keys(selectedTemplate).length > 0 && (
        <div className="preview-template">
          <h2 className="mb-2.5">Nội dung</h2>
          <div
            className="preview-template__item"
            dangerouslySetInnerHTML={getPreview()}
          />
        </div>
      )}
    </>
  );

  return (
    <BaseModal
      wrapClassName="modal-create-sms"
      title="Gửi tin nhắn SMS"
      content={content}
      onOk={() => handleSubmit()}
      onCancel={handleCancel}
      width={600}
      okButtonProps={{
        htmlType: "submit",
        loading: loading,
      }}
      centered
      forceRender
      okText="Tạo mới"
      cancelText="Hủy"
      {...props}
    />
  );
};

export default ModalCreate;
