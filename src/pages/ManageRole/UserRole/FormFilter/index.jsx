import BaseButton from "@/components/common/BaseButton";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import './styles.scss';

const FormFilter = ({ setSearchMode, params, setParams, setFilter }) => {
  const [form] = Form.useForm();

  const onFinishSearch = async (values) => {
    let options = {};

    for(let key in values) {
      if(values[key]) {
        options[key] = values[key].trim();
      }
    };

    setFilter(options);
    setParams({
      ...params,
      page: 0,
    })
  };

  return (
    <Form
        name="filter-role"
        layout="vertical" 
        form={form} 
        onFinish={onFinishSearch}
        initialValues={{
        }}
        className="mb-5 bg-[#fafafa] py-5 rounded relative"
    >
      <Button 
        className="absolute top-1 right-1 text-lg border-none shadow-none z-1"
        onClick={() => setSearchMode(false)}
      >
        <i className="fa-sharp fa-solid fa-xmark"></i>
      </Button>
      <Row gutter={20}>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Form.Item name="domain" label="Domain">
            <Select allowClear placeholder="Chọn loại quyền">
              <Select.Option value="DSC-EMPLOYEE">DSC-EMPLOYEE</Select.Option>
              <Select.Option value="DSC-CUSTOMER">DSC-CUSTOMER</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Form.Item name="name" label="Tên quyền">
            <Input placeholder="Nhập tên quyền" />
          </Form.Item>
        </Col>
      </Row>

      <div
        style={{
          textAlign: "right",
        }}
      >
        <Space size="small">
          <BaseButton
            text="Tìm kiếm"
            type="primary"
            htmlType="submit"
            className="btn-search"
          />
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            Xoá
          </Button>
        </Space>
      </div>
    </Form>
  );
};

export default FormFilter;
