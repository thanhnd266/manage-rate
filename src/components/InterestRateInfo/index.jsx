import { MinusCircleOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Select } from "antd";
import { Fragment, useState } from "react";
import BaseButton from "../common/BaseButton";
import { FormInterestRateHeader, FormInterestRateTable } from "./styled";

const FormInterestRate = ({ form }) => {

  const handleChangeEndDate = (e, key) => {
    if(isNaN(e.target.value)) {
      return;
    }
    const endDate = form.getFieldValue("users")[key].ngayKetThuc;
    console.log(form.getFieldsValue());
    // form.setFieldValue(users[key+1], endDate + 1);
  }

  return (
    <>
      <FormInterestRateHeader>
        <span>Thông tin lãi suất</span>

        <div className="type-interest-rate">
          <span style={{ marginRight: "10px" }}>Loại lãi suất</span>
          <Select placeholder="Chọn loại lãi suất">
            <Select.Option value="1">Loại lãi suất 1</Select.Option>
            <Select.Option value="2">Loại lãi suất 2</Select.Option>
            <Select.Option value="3">Loại lãi suất 3</Select.Option>
          </Select>
        </div>
      </FormInterestRateHeader>

      <FormInterestRateTable>
          <Form.List 
            name="users"
          >
            {(fields, { add, remove }) => (
              <Fragment>
                {/* <Row gutter={10}>
                  <Col span={4}>
                    <Form.Item name="maCoPhieu" label="Mã cổ phiếu">
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item 
                      name="ngayBatDau" 
                      label="Bắt đầu (Ngày T)"
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

                  <Col span={4}>
                    <Form.Item 
                      name="ngayKetThuc" 
                      label="Kết thúc (Ngày T)"
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

                  <Col span={4}>
                    <Form.Item
                      name="laiSuatTrongHanNam"
                      label="Lãi suất trong hạn (năm)"
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

                  <Col span={4}>
                    <Form.Item
                      name="laiSuatTrongHanNgay"
                      label="Lãi suất trong hạn (ngày)"
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

                  <Col span={4}>
                    <Form.Item label=" ">
                      <BaseButton 
                        icon={<i className="fa-solid fa-plus"></i>} 
                        onClick={() => add()}
                      />
                    </Form.Item>
                  </Col>
                </Row> */}
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={10}>
                    <Col span={4}>
                      <Form.Item 
                        {...restField} 
                        name={[name, "maCoPhieu"]}
                        label={key === 0 ? "Mã cổ phiếu" : ""}
                      >
                        <Input disabled />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item 
                        {...restField} 
                        name={[name, `ngayBatDau`]}
                        label={key === 0 ? "Bắt đầu (Ngày T)" : ""}
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

                    <Col span={4}>
                      <Form.Item 
                        {...restField} 
                        name={[name, "ngayKetThuc"]}
                        label={key === 0 ? "Kết thúc (Ngày T)" : ""}
                        rules={[
                          {
                            required: true,
                            message: `Vui lòng nhập trường này!`,
                          },
                        ]}
                      >
                        <Input onChange={(e) => handleChangeEndDate(e, key)} />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "laiSuatTrongHanNam"]}
                        label={key === 0 ? "Lãi suất trong hạn (năm)" : ""}
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

                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "laiSuatTrongHanNgay"]}
                        label={key === 0 ? "Lãi suất trong hạn (ngày)" : ""}
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
                    <Col span={4}>
                      <Form.Item label={key === 0 ? " " : ""}>
                        <BaseButton 
                          icon={<i className="fa-solid fa-plus"></i>} 
                          onClick={() => add()}
                        />

                        {key !== 0 && (
                          <BaseButton 
                            icon={<MinusCircleOutlined />}
                            onClick={() => remove(name)}
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
              </Fragment>
            )}
          </Form.List>
      </FormInterestRateTable>
    </>
  );
};

export default FormInterestRate;
