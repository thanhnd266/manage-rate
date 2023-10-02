import InterestRateInfo from "@/components/InterestRateInfo";
import BaseButton from "@/components/common/BaseButton";
import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from "antd";

const TabGeneralInfo = () => {
  const [form] = Form.useForm();

  const onFinishSearch = (values) => {
    console.log(values);
  };

  const handleSubmitForm = () => {
    const result = form.getFieldsValue();
    console.log(result);
  }

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinishSearch}
        initialValues={{
          users: [{}]
        }}
      >
        <Row gutter={20}>
          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="code"
              label="Mã loại hình"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="name"
              label="Tên loại hình"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="LoaiChinhSach"
              label="Loại chính sách"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Select>
                <Select.Option value="fix">Cố định</Select.Option>
                <Select.Option value="noFix">Ưu đãi</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="HanMucGiaiNgan"
              label="Hạn mức GN"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <InputNumber
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                addonAfter={<span>VNĐ</span>} 
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="kyHanVay"
              label="Kỳ hạn vay"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Input addonAfter={<span>Ngày</span>} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="coSoTinhLai"
              label="Cơ số tính lãi"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Select>
                <Select.Option value="365">365 ngày/năm</Select.Option>
                <Select.Option value="360">360 ngày/năm</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="laiSuatQuaHan"
              label="Lãi suất quá hạn"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Input addonAfter={<span>%/năm</span>} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="canhBaoDenGioiHan"
              label="Cảnh báo đến hạn"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Input addonAfter={<span>Ngày</span>} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="phiTraNoTruocHan"
              label="Phí trả nợ trước hạn"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <InputNumber
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                addonAfter={<span>VNĐ</span>} 
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="tuDongDaoNo"
              label="Tự động đảo nợ"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Select>
                <Select.Option value="yes">Có</Select.Option>
                <Select.Option value="no">Không</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="tuDongTraNoTruocHan"
              label="Tự động trả nợ trước hạn"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Select>
                <Select.Option value="yes">Có</Select.Option>
                <Select.Option value="no">Không</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="duocPhepGiaHan"
              label="Được phép Gia hạn"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Select>
                <Select.Option value="yes">Có</Select.Option>
                <Select.Option value="no">Không</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="kiHanGiaHan"
              label="Kỳ hạn gia hạn"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Input addonAfter={<span>Ngày</span>} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="laiSuatGiaHan"
              label="Lãi suất gia hạn"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Input addonAfter={<span>%</span>} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="soLanGiaHanToiDa"
              label="Số lần gia hạn tối đa"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Input addonAfter={<span>Lần</span>} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="phamViHienThiOnline"
              label="Phạm vi hiển thị Online"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Select>
                <Select.Option value="AFTYPE1">AFTYPE1</Select.Option>
                <Select.Option value="AFTYPE2">AFTYPE2</Select.Option>
                <Select.Option value="AFTYPE3">AFTYPE3</Select.Option>
                <Select.Option value="AFTYPE4">AFTYPE4</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="giaHanOnline"
              label="Gia hạn Online"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Select>
                <Select.Option value="yes">Có</Select.Option>
                <Select.Option value="no">Không</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="soNgayTruocKHanDuocGH"
              label="Số ngày trước K.hạn được GH"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Input addonAfter={<span>Ngày</span>} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="verified_date"
              label="Ngày hiệu lực"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <DatePicker.RangePicker />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="createdBy"
              label="Người tạo"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Input readOnly />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
            <Form.Item
              name="verifyBy"
              label="Người duyệt"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập trường này!`,
                },
              ]}
            >
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24} md={16}>
            <Form.Item name="dienGiai" label="Diễn Giải">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <InterestRateInfo />
      </Form>


      <Row justify="end" gutter={10} style={{ marginBottom: 12 }}>
        {/* <BaseButton type="primary" htmlType="submit">
          Duyệt
        </BaseButton>

        <BaseButton danger>
          Chỉnh sửa
        </BaseButton> */}

        <Col>
          <BaseButton type="primary" htmlType="submit" onClick={handleSubmitForm}>
            Lưu
          </BaseButton>
        </Col>
        <Col>
          <BaseButton type="default">Hủy bỏ</BaseButton>
        </Col>
      </Row>
    </>
  );
};

export default TabGeneralInfo;
