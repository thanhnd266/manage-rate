import BaseModal from "@/components/common/BaseModal";
import { Checkbox, Collapse, Form, Input, Tree, message } from "antd";
import { useEffect, useState } from "react";
import './styles.scss';
import { buildTreePermission } from "@/helpers/buildTreeData";

const ModalUpdate = ({ setIsOpenModalUpdate, currentRecord, setCurrentRecord, listPermission, ...props }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);

  useEffect(() => {
    if(currentRecord?.permissions?.length > 0) {
        setCheckedKeys(currentRecord.permissions.map(item => item.code))
    }
  }, [currentRecord])

  const onCheck = (checkedKeysValue, info) => {
    // if(checkedKeysValue[0] === "selectAll") {
    //     return setCheckedKeys(checkedKeysValue.slice(1, checkedKeysValue.length));
    // }
    const leafKeys = info.checkedNodes
      .filter(node => node?.children?.length === 0)
      .map(node => node.key);

    setCheckedKeys(leafKeys);
  };

//   const handleCheckAll = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log(`checked = ${e.target.checked}`);
//   }


  const treeData = buildTreePermission(listPermission.map(item => item.code).map(el => {
    if(el.includes("dsc")) {
      return el.split(".").splice(1).join(".");
    }
    return el;
  }));

  const items = [
    {
      key: "1",
      label: "Permissions",
      children: (
        <Tree
          checkable
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={treeData}
          showIcon={true}
          selectable={false}
          showLine={true}
          defaultExpandAll={true}
        />
      ),
    },
  ];

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const { roleName } = await form.validateFields();
      const arrPermission = checkedKeys.map(item => ({ code: item, name: item }));
      const payload = {
          id: currentRecord?.id,
          //   role: roleName,
          permissions: arrPermission
      }

      const res = await updateRole(payload);

      if(res?.data?.code === '0') {
        setTimeout(() => {
          setIsOpenModalUpdate(false);
          setCurrentRecord({});
          setLoading(false);
          message.success("Cập nhật người dùng thành công!");
        }, 1000)
      } else {
        message.error("Lỗi cập nhật người dùng!");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log("Validate Failed", err);
    }
};

  const handleCancel = () => {
    form.resetFields();
    setIsOpenModalUpdate(false);
    setCurrentRecord({});
  };

  const content = (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
          roleName: currentRecord?.name || "",
      }}
    >
      <Form.Item label="Role" name="roleName">
        <Input />
      </Form.Item>
      <Form.Item>
        <Collapse items={items} defaultActiveKey="1" />
      </Form.Item>
    </Form>
  );

  return (
    <BaseModal
      wrapClassName="modal-update-role"
      title="Cập nhật quyền"
      content={content}
      onOk={handleUpdate}
      okText="Cập nhật"
      onCancel={handleCancel}
      cancelText="Hủy"
      okButtonProps={{
        loading: loading,
        htmlType: "submit",
      }}
      {...props}
    />
  );
};

export default ModalUpdate;
