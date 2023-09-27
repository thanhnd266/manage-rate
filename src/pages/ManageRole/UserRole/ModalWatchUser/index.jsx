import BaseModal from "@/components/common/BaseModal";
import { Form, Input, Tag, Transfer, message } from "antd";
import { useEffect, useState } from "react";
import "./styles.scss";

const ModalWatchUser = ({
  setIsOpenModalWatchUser,
  currentRecord,
  setCurrentRecord,
  ...props
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);


  const filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  };
  const handleAssignRole = async (newTargetKeys, direction, moveKeys) => {
  };

  const handleCancel = () => {
    form.resetFields();
    setIsOpenModalWatchUser(false);
  };

  const content = (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        roleName: currentRecord?.name,
      }}
    >
      <Form.Item label="Tên quyền" name="roleName">
        <Input readOnly className="cursor-default" />
      </Form.Item>
      <Form.Item label="Danh sách người dùng">
        <Transfer
          showSearch
          dataSource={listUser}
          filterOption={filterOption}
          targetKeys={targetKeys}
          onChange={handleAssignRole}
          render={(item) => item.title}
          selectAllLabels={[
            () => (
              <span>
                <Tag color="orange">Quyền khác</Tag>
              </span>
            ),
            () => (
              <span>
                <Tag color="blue">Quyền {currentRecord?.name}</Tag>
              </span>
            ),
          ]}
        />
      </Form.Item>
    </Form>
  );

  return (
    <>
      <BaseModal
        wrapClassName="modal-watch-user"
        title={`Danh sách người dùng`}
        content={content}
        onCancel={handleCancel}
        cancelText="Hủy"
        footer={null}
        {...props}
      />
    </>
  );
};

export default ModalWatchUser;
