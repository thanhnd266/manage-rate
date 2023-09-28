import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { FormInterestRateHeader, FormInterestRateTable } from "./styled";
import BaseButton from "../common/BaseButton";

const FormInterestRate = () => {
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
        <Form
          name="dynamic_form_nest_item"
          layout="vertical"
          autoComplete="off"
        >
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                <Row gutter={10}>
                  <Col span={4}>
                    <Form.Item name="maCoPhieu" label="Mã cổ phiếu">
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item name="ngayBatDau" label="Bắt đầu (Ngày T)">
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item name="ngayKetThuc" label="Kết thúc (Ngày T)">
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      name="laiSuatTrongHanNam"
                      label="Lãi suất trong hạn (năm)"
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      name="laiSuatTrongHanNgay"
                      label="Lãi suất trong hạn (ngày)"
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
                </Row>
                {fields.map(({ key, name, ...restField }) => (
                  <Row gutter={10}>
                    <Col span={4}>
                      <Form.Item {...restField} name={[name, "maCoPhieu"]}>
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item {...restField} name={[name, "ngayBatDau"]}>
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item {...restField} name={[name, "ngayKetThuc"]}>
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "laiSuatTrongHanNam"]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "laiSuatTrongHanNgay"]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <BaseButton 
                        icon={<i className="fa-solid fa-plus"></i>} 
                        onClick={() => add()}
                      />
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Col>
                  </Row>
                ))}
              </>
            )}
          </Form.List>
        </Form>
      </FormInterestRateTable>
    </>
  );
};

export default FormInterestRate;
