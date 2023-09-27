
import { UploadOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Upload, notification } from 'antd';
import React, { useEffect, useState } from 'react';

export default function UploadFileMultiple(props) {
    const acceptedImageTypes = props?.acceptedFileTypes || [];
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [blockImage, setBlockImage] = useState(false);
    const [blockMessage, setBlockMessage] = useState('');

    const handleCancel = () => {
        setPreviewVisible(false);
    };

    useEffect(() => {
        if (blockImage) {
            notification.open({
                message: blockMessage,
                icon: <WarningOutlined style={{ color: 'red' }} />,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blockImage]);

    useEffect(() => {
        let listImage = [];
        if (props?.defaultData !== undefined && props?.defaultData && props?.defaultData.length > 0) {
            const data = {
                uid: 1,
                name: 'image-1',
                status: 'done',
                url: props?.defaultData,
            };
            listImage.push(data);
            setFileList(listImage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.defaultData]);

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        if (props?.previewImageNew) {
            props?.previewImageNew(file.url || file.preview)
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };

    const handlePreviewMergeData = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        if (props?.previewImageNew) {
            props?.previewImageNew(file.url || file.preview)
        }
        setPreviewImage(file.url || file.preview);
    }

    const handleChange = async (e) => {
        setBlockImage(false);
        const imageDefaultnew = [];
        const { fileList } = e;

        let isLessThan5MB = true;
        let isAcceptedFiles = true;
        const filterFileList = await fileList.filter((file) => {
            if (props?.maxCount === 1) {
                handlePreviewMergeData(file)
            }

            if (file.type !== undefined) {
                if (isAcceptedFiles) {
                    isAcceptedFiles = acceptedImageTypes.includes(file.type);
                }
                if (isLessThan5MB) {
                    isLessThan5MB = file.size / 1024 / 1024 < 50;
                }
                return !(!isLessThan5MB || !isAcceptedFiles);
            }
            return true
        });

        if (!isAcceptedFiles) {
            if (!blockImage) {
                setBlockMessage('Định dạng không cho phép');
                setBlockImage(true);
            }
            return false;
        }

        if (!isLessThan5MB) {
            if (!blockImage) {
                setBlockMessage('Ảnh giới hạn dưới 5MB');
                setBlockImage(true);
            }
            return false;
        }

        if (filterFileList.length > 10) {
            return false;
        }

        fileList.map((file) => {
            if (file.url !== undefined) {
                imageDefaultnew.push(file.url);
            }
            return true
        });
        setFileList(fileList);
        if (fileList) {
            props.data(fileList[0]);
        }
    };

    const handleBeforeUpload = (file) => {
        return false;
    };

    useEffect(() => {
        if (!props?.defaultData) {
            setFileList(null)
        }
    }, [props?.defaultData])

    return (
        <>
            <Upload
                fileList={fileList}
                maxCount={1}
                onPreview={(event) => handlePreview(event)}
                onChange={(event) => handleChange(event)}
                beforeUpload={(event) => handleBeforeUpload(event)}
                accept={props?.acceptedFileTypes || '.xlsm,.xlsx,.xls,.pdf'}
            >
                <Button icon={<UploadOutlined />}>Tải lên (Tối đa: 1)</Button>
            </Upload>
            {/* <Modal visible={previewVisible} title={'Chi tiết'} footer={null} onCancel={handleCancel}>
                <img src={previewImage} alt={previewImage} style={{ width: '100%' }} />
            </Modal> */}
        </>
    );
}
