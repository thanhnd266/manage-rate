import BaseModal from "@/components/common/BaseModal";
import { Collapse, Form, Input, Select, Tree, message } from "antd";
import { useState } from "react";
import './styles.scss';
import { buildTreePermission } from "@/helpers/buildTreeData";

const ModalCreate = ({ setIsOpenModalCreate, listPermission, ...props }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [isExtendRole, setIsExtendRole] = useState(false);
  const [listRoleBuiltIn, setListRoleBuiltIn] = useState([]);

  const onCheck = (checkedKeysValue, info) => {
    // if(checkedKeysValue[0] === "selectAll") {
    //     return setCheckedKeys(checkedKeysValue.slice(1, checkedKeysValue.length));
    // }

    const leafKeys = info.checkedNodes
      .filter(node => node?.children?.length === 0)
      .map(node => node.key);

    setCheckedKeys(leafKeys);
  };

  const treeData = buildTreePermission(listPermission.map(item => item.code).map(el => {
    if(el.includes("dsc")) {
      return el.split(".").splice(1).join(".");
    }
    return el;
  }));

  const items = [
    {
      key: "1",
      label: "Danh sách quyền",
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

  const handleCreate = async () => {
    setLoading(true);

    try {
      const data = await form.validateFields();
      
      const arrPermission = checkedKeys.map(item => {
        return {
          code: item,
          name: item
        }
      });

      const payload = {
          ...data,
          code: data.name,
          permissions: arrPermission,
          status: "ACTIVE",
          domain: "DSC-EMPLOYEE"
      };

      const res = await addNewRole({ ...payload });
      
      if(res?.data?.code === '0') {
        setTimeout(() => {
          setIsOpenModalCreate(false);
          form.resetFields();
          setLoading(false);
          message.success("Tạo quyền thành công!");
        }, 1000)
      } else {
        message.error("Lỗi tạo quyền thất bại!");
        setLoading(false);
      }
    } catch(err) {
      setLoading(false);
      message.error("Lỗi tạo quyền thất bại!");
      console.log("Validate Failed", err);
    }
};

  const handleCancel = () => {
    form.resetFields();
    setCheckedKeys([]);
    setIsOpenModalCreate(false);
  };

  const handleSelectType = async (value) => {

    const res = await triggerGetListRole().unwrap();

    try {
      if(res.code === '0') {
        setListRoleBuiltIn(res.data.data.filter(item => item.type === "BUILT_IN"));
      }

    } catch(err) {
      message.error("Đã có lỗi xảy ra");
      console.log(err);
    }

    if(value === "EXTENDED") {
      return setIsExtendRole(true);
    }
    setIsExtendRole(false);
  }

  const content = (
    <Form
      form={form}
      layout="horizontal"
    >
      <Form.Item 
        label="Tên quyền" 
        name="name"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên quyền",
          },
        ]}
      >
        <Input placeholder="Nhập tên quyền" />
      </Form.Item>
      <Form.Item 
        name="type" 
        label="Loại quyền"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn loại quyền",
          },
        ]}
      >
        <Select allowClear placeholder="Chọn loại quyền" onSelect={handleSelectType}>
          <Select.Option value="BUILT_IN">BUILT_IN</Select.Option>
          <Select.Option value="EXTENDED">EXTENDED</Select.Option>
        </Select>
      </Form.Item>
      {isExtendRole && (
        <Form.Item 
          name="builtInId" 
          label="Mở rộng từ"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn quyền mở rộng",
            },
          ]}
        >
          <Select allowClear placeholder="Chọn quyền mở rộng">
            {listRoleBuiltIn.map((role) => {
              if(role.type === "BUILT_IN") {
                return <Select.Option value={role.id} key={role.id}>{role.name}</Select.Option>
              }
            })}
          </Select>
        </Form.Item>
      )}
      <Form.Item>
        <Collapse items={items} defaultActiveKey="1" />
      </Form.Item>
    </Form>
  );

  return (
    <BaseModal
      wrapClassName="modal-create-role"
      title="TẠO MỚI QUYỀN"
      content={content}
      onOk={handleCreate}
      okText="Tạo"
      onCancel={handleCancel}
      cancelText="Hủy"
      okButtonProps={{
        loading: loading,
        htmlType: "submit",
      }}
      width="75vw"
      {...props}
    />
  );
};

export default ModalCreate;
