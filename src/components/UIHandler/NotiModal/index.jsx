import { Modal } from 'antd';
import './styles.scss';

export const NotiModal = (typeModal = "confirm", title, content, handleOk, classNames, props) => {
  Modal[typeModal]({
      title: title,
      className: classNames ? `modal-noti-warning ${classNames}` : "modal-noti-warning",
      content: (
        <div>
          <span>{content}</span>
        </div>
      ),
      async onOk() {
        await handleOk()
      },
      cancelText: "Hủy",
      okText: "Xác nhận",
      ...props
    });
};