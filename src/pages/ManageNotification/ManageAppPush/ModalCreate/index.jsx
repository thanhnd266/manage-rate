import BaseModal from "@/components/common/BaseModal";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import "./styles.scss";

const { TextArea } = Input;

const ModalCreate = ({ setIsOpenModalCreate, listRegister, ...props }) => {
  const [form] = Form.useForm();
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerSelected, setRegisterSelected] = useState([]);
  const [variables, setVariables] = useState([]);
  const [listTopic, setListTopic] = useState([]);
  const [topicSelected, setTopicSelected] = useState();

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

  const handleCancel = () => {
    setIsOpenModalCreate(false);
    setRegisterSelected([]);
    setTopicSelected();
    form.resetFields();
  };

  const handleSelectReceiver = (value) => {
    let selected = [];

    form.validateFields(['topic'], { force: true });

    listRegister.filter(item => {
      if (value.includes(item.userName)) {
        selected.push(item);
      }
    });

    setRegisterSelected(selected);
  };

  const handleSelectTopic = (value) => {
    if(form.getFieldValue("token")) {
      form.validateFields(['token'], { force: true });
    }
    setTopicSelected(value);
  };

  const content = (
    <>
      <Form form={form} layout="vertical">
        <Row gutter={20}>
          <Col xs={24}>
            <Form.Item
              label="Người nhận"
              name="token"
              rules={[
                ({ getFieldValue }) => ({
                  required: true,
                  validator(_, value) {
                    if (value?.length > 0 || getFieldValue("topic")?.length > 0) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        new Error("Vui lòng chọn người hoặc nhóm người nhận!")
                      );
                    }
                  },
                }),
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                disabled={topicSelected ? true : false}
                style={{
                  width: "100%",
                }}
                placeholder="Chọn người nhận"
                onChange={handleSelectReceiver}
                options={listRegister.map((item) => {
                  return {
                    label: item.userName,
                    value: item.userName,
                  };
                })}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Nhóm người nhận"
              name="topic"
              rules={[
                ({ getFieldValue }) => ({
                  required: true,
                  validator(_, value) {
                    if (value?.length > 0 || getFieldValue("token")?.length > 0) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        new Error("Vui lòng chọn người hoặc nhóm người nhận!")
                      );
                    }
                  },
                }),
              ]}
            >
              <Select 
                disabled={registerSelected.length > 0 ? true : false} 
                allowClear 
                showSearch
                placeholder="Chọn nhóm người nhận" 
                onChange={handleSelectTopic}
                optionFilterProp="children"
                filterOption={(input, option) => {
                  return (option?.nameAlias ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase());
                }}
              >
                {listTopic?.map((topic) => {
                    return (
                      <Select.Option value={topic.topicName} key={topic.id} nameAlias={topic.topicNameAlias}>
                        {topic.topicNameAlias}
                      </Select.Option>
                    );
                })}
              </Select>
              {/* <Select
              className="w-full lg:w-[300px]"
              allowClear
              showSearch
              placeholder="Chọn tài khoản"
              optionFilterProp="children"
              onClear={() => {
                form.resetFields();
              }}
              filterOption={(input, option) => {
                return (option?.fullInfo?.username ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
            >
              {cacheListUser &&
                cacheListUser.map((item) => {
                  return (
                    <Select.Option
                      key={item.key}
                      value={item.username}
                      fullInfo={item}
                    >
                      {item.username}
                    </Select.Option>
                  );
                })}
            </Select> */}
            </Form.Item>
          </Col>

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
          
          <Col span={24}>
              <h2 className="mb-2 mt-2">Biến</h2>
              <Form.List name="data">
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
        </Row>
      </Form>

      {/* <div>
        <h2 className="mb-3">Nội dung</h2>
        <CkeditorItem
          setData={(value) => setEditorContent(value)}
          data={editorContent}
        />
      </div> */}
    </>
  );

  return (
    <BaseModal
      wrapClassName="modal-create-apppush"
      title="Gửi thông báo"
      content={content}
      onOk={() => handleSubmit()}
      onCancel={handleCancel}
      width="80vw"
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
