import BaseButton from "@/components/common/BaseButton";
import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
import './styles.scss';
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const FormFilter = ({ setSearchMode, params, setParams, setFilter }) => {
  const [form] = Form.useForm();

  const onFinishSearch = async (values) => {
    let options = {};

    for (let key in values) {
      if (values[key]) {
        if(Array.isArray(values[key])) {
            values[key].map((item, index) => {
                item = item.format("DD/MM/YYYY");
                if(index === 0) {
                    options.fromDate = item;
                } else {
                    options.toDate = item;
                }
            })
            continue;
        }
        options[key] = values[key]?.trim();
      }
    }

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
          <Form.Item name="destination" label="Người nhận">
            <Input placeholder="Nhập SĐT người nhận" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Form.Item name="messageId" label="Mã tin nhắn">
            <Input placeholder="Nhập mã tin nhắn" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Form.Item name="uploadedAt" label="Thời gian gửi">
            <RangePicker
              style={{ width: "100%" }}
              placeholder={["Từ ngày", "Đến ngày"]}
              presets={{
                Today: [dayjs(), dayjs()],
                "This Month": [
                  dayjs().startOf("month"),
                  dayjs().endOf("month"),
                ],
              }}
              format="DD/MM/YYYY"
            />
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
