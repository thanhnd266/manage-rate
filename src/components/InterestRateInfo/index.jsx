import { MinusCircleOutlined } from "@ant-design/icons";
import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import { Fragment, useState } from "react";
import BaseButton from "../common/BaseButton";
import { FormInterestRateHeader, FormInterestRateTable } from "./styled";

const FormInterestRate = ({ form }) => {

  const handleChangeEndDate = (e, index) => {
    if(isNaN(e)) {
      return;
    }
    const arrUsers = form.getFieldValue("users");
    const endDate = arrUsers[index].ngayKetThuc;
    form.setFieldValue("users", arrUsers?.map((el, i) => {
      if(i === index+1) {
        if(!el) {
          el = {};
        }
        el.ngayBatDau = endDate + 1;
      }
      return el;
    }));
  };

  const handleBlurEndDate = (e, index) => {
    let value = +e.target.value;
    if(isNaN(value)) {
      alert("Ngày kết thúc phải là số nguyên")
      return;
    }

    const arrUsers = form.getFieldValue("users");

    if(value < arrUsers[index].ngayBatDau) {
      alert("Ngày kết thúc phải lớn hơn ngày bắt đầu")
    }
  }

  const handleAddRow = (addFn, index) => {
    let arrUsers = form.getFieldValue("users");
    if(arrUsers[index]?.ngayKetThuc) {

      arrUsers.splice(index+1, 0, {
        ngayBatDau: arrUsers[index]?.ngayKetThuc + 1,
      });

      form.setFieldValue("users", arrUsers);
    } else {
      addFn();
    }
  };

  const handleRemoveRow = (removeFn, index) => {
    const arrUsers = form.getFieldValue("users");
    if(arrUsers[index-1]?.ngayKetThuc && arrUsers[index+1]?.ngayBatDau) {
      arrUsers.splice(index, 1); // xoa phan tu o index
      console.log(arrUsers);
      arrUsers[index].ngayBatDau = arrUsers[index-1].ngayKetThuc + 1; //set lai el moi tai vi tri index
      form.setFieldValue("users", arrUsers);
    } else {
      removeFn(index);
    }
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
                        <InputNumber 
                          onChange={(e) => handleChangeEndDate(e, name)} 
                          onBlur={(e) => handleBlurEndDate(e, name)}  
                        />
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
                          onClick={() => handleAddRow(add, name)}
                        />

                        {key !== 0 && (
                          <BaseButton 
                            icon={<MinusCircleOutlined />}
                            onClick={() => handleRemoveRow(remove, name)}
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
