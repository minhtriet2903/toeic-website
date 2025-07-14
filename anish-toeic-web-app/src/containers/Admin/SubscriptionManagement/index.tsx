import { Modal, notification, Table } from "antd";
import { useEffect, useState } from "react";
import {
  deleteSubscription,
  getSubscriptions,
  Subscription,
} from "../../../query";
import columns from "./columns";

const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>();
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    getSubscriptions().then((res) => {
      setSubscriptions(res.data);
    });
  }, [reload]);

  const handleDeleteContest = (id: string) => {
    deleteSubscription(id).then((res) => {
      if (res) {
        notification.success({
          message: "Delete Success",
        });
        setReload(!reload);
      }
    });
  };

  const showDeleteConfirm = (id: string) => {
    Modal.confirm({
      title: "Delete Item",
      content: `Are you sure you want to delete this item?`,
      okText: "Delete",
      okType: "danger",
      onOk: () => {
        handleDeleteContest(id);
      },
    });
  };

  return (
    <div className="flex flex-col w-full mt-4">
      <div className="w-full p-5">
        <Table
          columns={columns(showDeleteConfirm)}
          dataSource={subscriptions}
        ></Table>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
