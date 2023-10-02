import BaseButton from "@/components/common/BaseButton";
import { Button, Col, DatePicker, Form, Input, Space } from "antd";
import "./styles.scss";
const { RangePicker } = DatePicker;

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
      name="filter-params"
      layout="vertical"
      form={form}
      onFinish={onFinishSearch}
      className="relative rounded bg-[#fafafa]"
    >
      <Button
        className="absolute right-1 top-1 z-1 border-none text-lg shadow-none"
        onClick={() => setSearchMode(false)}
      >
        <i className="fa-sharp fa-solid fa-xmark"></i>
      </Button>
      <Col xs={24} sm={12} md={12} lg={6} xl={6}>
        <Form.Item name="code" label="Tên biến">
          <Input placeholder="Nhập tên biến" />
        </Form.Item>
      </Col>
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
