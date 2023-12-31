import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";

const FormFilter = () => {
  const [form] = Form.useForm();

  const onFinishSearch = (values) => {
    console.log(values);
  };

  return (
    <Form 
        layout="vertical" 
        form={form} 
        onFinish={onFinishSearch}
        initialValues={{}}
        style={{ marginTop: '20px' }}
    >
      <Row gutter={20}>
        <Col span={4}>
          <Form.Item name="code" label="Số tài khoản">
            <Input />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="name" label="Tên tiểu khoản">
            <Select>
              <Select.Option value="">Lựa chọn</Select.Option>
              <Select.Option value="phanvung">Tài liệu phân vùng</Select.Option>
              <Select.Option value="docbieudo">
                Tài liệu đọc biểu đồ
              </Select.Option>
              <Select.Option value="dautu">Tài liệu đầu tư</Select.Option>
              <Select.Option value="catlo">Tài liệu cắt lỗ</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="policy" label="Tên khách hàng">
            <Select>
              <Select.Option value="">Lựa chọn</Select.Option>
              <Select.Option value="phanvung">Tài liệu phân vùng</Select.Option>
              <Select.Option value="catlo">Tài liệu cắt lỗ</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="interestRate" label="Trạng thái">
            <Select>
              <Select.Option value="">Lựa chọn</Select.Option>
              <Select.Option value="phanvung">Tài liệu phân vùng</Select.Option>
              <Select.Option value="catlo">Tài liệu cắt lỗ</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="verified_date" label="Ngày hiệu lực">
            <DatePicker.RangePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end" style={{ marginBottom: 12 }}>
        <Button type="primary" htmlType="submit">
          Tìm kiếm
        </Button>
      </Row>
    </Form>
  );
};

export default FormFilter;
