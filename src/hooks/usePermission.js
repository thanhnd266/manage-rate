import { message } from "antd";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const usePermission = ({ key, handle, invalid }) => {
  const userInfo = useSelector(state => state.users.user);

  const permission = useMemo(() => {
    return userInfo.permissions.includes(key);
  }, [userInfo, key]);

  const handler = (...params) => {
    if (!permission) {
      if (invalid && typeof invalid === "function") {
        invalid(...params);
        return;
      }
     message.success("Bạn không có quyền truy cập trang này!")
      return;
    }
    if (handle && typeof handle === "function") {
      handle(...params);
    }
  };

  return [permission, handler];
};

export default usePermission;