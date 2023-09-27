import BaseButton from "@/components/common/BaseButton";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import './styles.scss';

const FormFilter = ({ setSearchMode, params, setParams, setFilter, listRole }) => {
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
        name="filter-user-info"
        layout="vertical" 
        form={form} 
        onFinish={onFinishSearch}
        initialValues={{
          username: "",
          email: "",
          phone: "",
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
          <Form.Item name="username" label="Tài khoản">
            <Input placeholder="Nhập tên tài khoản" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Form.Item name="email" label="Email">
            <Input placeholder="Nhập email" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Form.Item name="phone" label="Số điện thoại">
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Form.Item name="role" label="Phân quyền">
            <Select 
              allowClear 
              placeholder="Chọn quyền hạn"
              showSearch
            >
              {listRole && listRole.map((item) => (
                <Select.Option key={item.id} value={item.name}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Form.Item name="status" label="Trạng thái">
            <Select allowClear placeholder="Chọn trạng thái">
              <Select.Option value="ACTIVE">ACTIVE</Select.Option>
              <Select.Option value="INACTIVE">INACTIVE</Select.Option>
              <Select.Option value="BANNED">BANNED</Select.Option>
          <Select.Option value="DRAFT">DRAFT</Select.Option>
            </Select>
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
