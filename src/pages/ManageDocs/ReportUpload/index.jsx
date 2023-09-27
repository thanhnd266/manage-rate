/* eslint-disable jsx-a11y/iframe-has-title */
import UploadFileMultiple from "@/components/common/UploadFileMultiple";
import { Button, DatePicker, Form, Input, notification, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './styles.scss';

export default function ReportUpload() {
  const [type, setType] = useState('')
  const [form] = Form.useForm();
  const [listType, setListType] = useState([])
  const [stock, setStock] = useState([])
  const [image, setImage] = useState(null)
  const [base64Preview, setBase64Preview] = useState(null)
  const userDetail = useSelector((state) => state.users.user)
  const [dataForm, setDataForm] = useState({
    docTypeName: '',
    stockCode: '',
    quater: '',
    month: '',
    year: '',
    effectiveDate: ''
  })

  useEffect(() => {
    form.setFieldsValue({
      docName: handleAddNameDocName(
        dataForm?.docTypeName,
        dataForm?.stockCode,
        dataForm?.quater,
        dataForm?.year,
        dataForm?.effectiveDate,
        dataForm?.month
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataForm])

  const handleAddNameDocName = (nameFile, ticker, quater, year, effectiveDate, month) => {
    let text = ''

    if (nameFile) {
      text += nameFile
    }
    if (ticker) {
      text += ` - ${ticker}`
    }
    if (month) {
      text += ` - Tháng ${month}`
    }
    if (quater) {
      text += ` - Quý ${quater}`
    }
    if (year) {
      text += ` - Năm ${year}`
    }
    if (effectiveDate) {
      text += ` - ${effectiveDate}`
    }
    return text
  }

  const fetchType = async () => {
    // const res = await API.Report.fetchTypeReport({})
    // if (res?.code === '0') {
    //   setListType(res?.data)
    // }
  }


  const fetchStock = async () => {
    // const res = await API.Stock.FindAllStock();
    // if (res?.code === '0') {
    //   setStock(res?.data)
    // }
  }

  useEffect(() => {
    fetchStock();
    fetchType();
    form.setFieldsValue({
      effectiveDate: dayjs(),
      uploadBy: userDetail.username,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeType = (value) => {
    const docTypeNameFilter = listType.filter((item) => {
      return item.docCode === value
    })
    setType(value);
    setDataForm({
      docTypeName: docTypeNameFilter?.[0]?.docCategory,
      stockCode: '',
      quater: '',
      month: '',
      year: '',
      effectiveDate: ''
    });
    form.setFieldsValue({
      stockCode: '',
      quater: '',
      month: '',
      year: '',
      effectiveDate: '',
    });
  }

  const onFinish = async (values) => {
    let docDate = null;
    if (values?.month) {
      docDate = dayjs(`${values?.month}-1-${values?.year}`).format('YYYY-MM-DD HH:mm:ss');
    }
    if (values?.quater) {
      docDate = dayjs().quarter(values?.quater).year(values?.year).startOf('quarter').format('YYYY-MM-DD HH:mm:ss');
    }
    const data = {
      stockExchange: values?.stockExchange ? values?.stockExchange : null,
      uploadBy: values?.uploadBy ? values?.uploadBy : null,
      docName: values?.docName ? values?.docName : null,
      docCode: values?.docCode ? values?.docCode : null,
      docDate: docDate ? docDate : null,
      effectiveDate: values?.effectiveDate ? dayjs(values?.effectiveDate).format('YYYY-MM-DD HH:mm:ss') : null,
      quater: values?.quater ? values?.quater : null,
      month: values?.month ? values?.month : null,
      stockCode: values?.stockCode ? values?.stockCode : null,
      year: values?.year ? values?.year : null,
      ignoreDateCheck: true,
    }
    if (!image) {
      notification.error({ message: 'File chưa được tải lên!' })
      return false
    }
    const formImages = new FormData();
    data?.stockExchange && formImages.append('stockExchange', data?.stockExchange);
    data?.uploadBy && formImages.append('uploadBy', data?.uploadBy);
    data?.docName && formImages.append('docName', data?.docName);
    data?.docDate && formImages.append('docDate', data?.docDate);
    image?.originFileObj && formImages.append('uploadFile', image?.originFileObj);
    data?.effectiveDate && formImages.append('effectiveDate', data?.effectiveDate);
    data?.docCode && formImages.append('docCode', data?.docCode);
    data?.stockCode && formImages.append('stockCode', data?.stockCode);
    data?.ignoreDateCheck && formImages.append('ignoreDateCheck', data?.ignoreDateCheck);

    // formImages.append('quater', data?.quater);
    // formImages.append('year', data?.year);
    // const res = await API.Upload.uploadReport(formImages);
    if (res?.code === '0') {
      notification.success({ message: 'Upload file thành công' })
      setImage(null)
      // form.resetFields();
    }
  }

  const docTypeNameFilter = listType.filter((item) => {
    return item.docCode === type
  })
  let typeExtension = ''
  let listTypeExtension = []
  if (docTypeNameFilter?.[0]?.fileExtensionFormat) {
    docTypeNameFilter?.[0]?.fileExtensionFormat.map((item) => {
      typeExtension += `.${item},`
    })
    listTypeExtension = docTypeNameFilter?.[0]?.contentType
  }
  const name = image?.originFileObj?.name
  let checkExcel = false
  if (name && (name.indexOf('xlsm') > -1 || name.indexOf('xlsx') > -1 || name.indexOf('xls') > -1)) {
    checkExcel = true
  }
  const year = dayjs().year();
  return (
    <>
      <div className="report-upload">
        <div className="report-upload__form">
          <div className="card">
            <div className="card-body">
              <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
              >
                <Form.Item name={'docCode'} label="Loại tài liệu" rules={[{ required: true, message: 'Trường yêu cầu nhập!' }]}>
                  <Select style={{ width: '100%' }} value={type} onChange={(value) => handleChangeType(value)}>
                    <Select.Option value="">Lựa chọn</Select.Option>
                    {
                      listType.map((item, key) => {
                        return (
                          <Select.Option key={key} value={item?.docCode}>{item?.docCategory}</Select.Option>
                        )
                      })
                    }
                  </Select>
                </Form.Item>
                <div style={{ marginBottom: 12 }}>
                  <UploadFileMultiple
                    maxCount={1}
                    previewImageNew={(value) => setBase64Preview(value)}
                    data={(value) => setImage(value)} defaultData={image}
                    accept={typeExtension}
                    acceptedImageTypes={listTypeExtension}
                  />
                </div>
                {
                  ['003'].indexOf(type) > -1 ?
                    <Form.Item name={'stockCode'} label="Tên cổ phiếu" rules={[{ required: true, message: 'Trường yêu cầu nhập!' }]}>
                      <Select
                        showSearch
                        onChange={(value) => setDataForm({
                          ...dataForm,
                          stockCode: value
                        })}
                        style={{ width: '100%' }}
                        filterOption={(input, option) => {
                          return option?.children?.[2].toLowerCase()?.includes(input?.toLowerCase()) ||
                            option?.children?.[0]?.toLowerCase()?.includes(input?.toLowerCase())
                        }}
                      >
                        <Select.Option value="">Lựa chọn</Select.Option>
                        {
                          stock && stock?.length > 0 ? stock.map((item, key) => {
                            return (
                              <Select.Option key={key} value={item?.ticker}>{item?.ticker} - {item?.organname}</Select.Option>
                            )
                          }) : null
                        }
                      </Select>
                    </Form.Item> : null
                }
                {
                  ['006'].indexOf(type) > -1 ?
                    <Form.Item name={'stockExchange'} label="Sàn" rules={[{ required: true, message: 'Trường yêu cầu nhập!' }]}>
                      <Select style={{ width: '100%' }} rules={[{ required: true, message: 'Trường yêu cầu nhập!' }]}>
                        <Select.Option value="">Lựa chọn</Select.Option>
                        <Select.Option value={'HOSE'}>{'HOSE'}</Select.Option>
                        <Select.Option value={'HNX'}>{'HNX'}</Select.Option>
                        <Select.Option value={'UPCOM'}>{'UPCOM'}</Select.Option>
                      </Select>
                    </Form.Item> : null
                }
                {
                  ['007'].indexOf(type) > -1 ?
                    <Form.Item name={'month'} label="Tháng" rules={[{ required: true, message: 'Trường yêu cầu nhập!' }]}>
                      <Select style={{ width: '100%' }}
                        onChange={(value) => setDataForm({
                          ...dataForm,
                          month: value
                        })}>
                        <Select.Option value="">Lựa chọn</Select.Option>
                        <Select.Option value="1">1</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                        <Select.Option value="3">3</Select.Option>
                        <Select.Option value="4">4</Select.Option>
                        <Select.Option value="5">5</Select.Option>
                        <Select.Option value="6">6</Select.Option>
                        <Select.Option value="7">7</Select.Option>
                        <Select.Option value="8">8</Select.Option>
                        <Select.Option value="9">9</Select.Option>
                        <Select.Option value="10">10</Select.Option>
                        <Select.Option value="11">11</Select.Option>
                        <Select.Option value="12">12</Select.Option>
                      </Select>
                    </Form.Item> : null
                }
                {
                  ['003', '004', '005'].indexOf(type) > -1 ?
                    <Form.Item name={'quater'} label="Quý" rules={[{ required: true, message: 'Trường yêu cầu nhập!' }]}>
                      <Select style={{ width: '100%' }}
                        onChange={(value) => setDataForm({
                          ...dataForm,
                          quater: value
                        })}>
                        <Select.Option value="">Lựa chọn</Select.Option>
                        <Select.Option value="1">1</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                        <Select.Option value="3">3</Select.Option>
                        <Select.Option value="4">4</Select.Option>
                      </Select>
                    </Form.Item> : null
                }
                {
                  ['003', '004', '005', '007'].indexOf(type) > -1 ?
                    <Form.Item name={'year'} label="Năm" rules={[{ required: true, message: 'Trường yêu cầu nhập!' }]}>
                      <Select style={{ width: '100%' }}
                        onChange={(value) => setDataForm({
                          ...dataForm,
                          year: value
                        })}>
                        <Select.Option value="">Lựa chọn</Select.Option>
                        <Select.Option value={year - 0}>{year - 0}</Select.Option>
                        <Select.Option value={year - 1}>{year - 1}</Select.Option>
                        <Select.Option value={year - 2}>{year - 2}</Select.Option>
                        <Select.Option value={year - 3}>{year - 3}</Select.Option>
                        <Select.Option value={year - 4}>{year - 4}</Select.Option>
                      </Select>
                    </Form.Item> : null
                }
                {
                  ['001', '002', '006', '008', '009'].indexOf(type) > -1 ?
                    <Form.Item name={'effectiveDate'} label="Ngày hiệu lực" rules={[{ required: true, message: 'Trường yêu cầu nhập!' }]}>
                      <DatePicker style={{ width: '100%' }} onChange={(value) => setDataForm({
                        ...dataForm,
                        effectiveDate: dayjs(value).format('DDMMYYYY')
                      })} />
                    </Form.Item> : null
                }
                {
                  ['001', '002', '006', '007'].indexOf(type) > -1 ?
                    <Form.Item name={'effectiveDate'} label="Ngày đăng">
                      <DatePicker style={{ width: '100%' }} disabled />
                    </Form.Item> : null
                }
                <Form.Item name={'uploadBy'} label="Người đăng">
                  <Input disabled />
                </Form.Item>
                <Form.Item name={'docName'} label="Tên tài liệu" rules={[{ required: true, message: 'Trường yêu cầu nhập!' }]}>
                  <Input disabled />
                </Form.Item>
                <Button className="bg-main" htmlType="submit" type="primary" style={{ marginRight: 12 }}>Submit</Button>
                <Button className="bg-danger text-white hover:!text-white hover:!border-danger" onClick={() => form.resetFields()}>Cancel</Button>
              </Form>
            </div>
          </div>
        </div>
        <div className="zfiwudeytj">
          {image && !checkExcel ? <iframe src={`${base64Preview}#toolbar=0&embedded=true&view=FitH`}
            className="hreedrmmzm"
            style={{ display: 'block', width: '100%', height: '584px' }}>
          </iframe> : null}
        </div>
      </div>
    </>
  )
}