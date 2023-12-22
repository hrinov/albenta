import { FC, useEffect, useState } from "react";
import { Modal } from "antd";
import "./index.sass";
import { requestHandler } from "../../../../../../utils";
import { ActivityInterface } from "../../../../../../../types";

interface PropsInterface {
  isActivityModalOpen: boolean;
  handleActivityModal: (arg: boolean) => void;
}

const ActivityModalWindow: FC<PropsInterface> = ({
  isActivityModalOpen,
  handleActivityModal,
}) => {
  const [activity, setActivity] = useState<ActivityInterface[]>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const handleCancel = () => {
    handleActivityModal(false);
  };

  function formatDate(inputDate: string) {
    const date = new Date(inputDate);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}`;
  }

  const getActivity = async () => {
    const response: { success: boolean; data: ActivityInterface[] } =
      await requestHandler(`activity?page=${pageNumber}`, "GET");
    response.success && setActivity(response.data);
  };

  useEffect(() => {
    if (isActivityModalOpen) getActivity();
  }, [isActivityModalOpen]);

  return (
    <Modal
      title="Activity Log"
      open={isActivityModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="main-wrapper">
        <div className="activity title">
          <div className="block">DATE</div>
          <div className="block right">DEVICE</div>
          <div className="block right">BROWSER</div>
          <div className="block right">COUNTRY</div>
          <div className="block right">ACTIVITY</div>
        </div>
        {activity?.map((item) => (
          <div className="activity">
            <div className="block">{formatDate(item.date)}</div>
            <div className="block right">{item.device}</div>
            <div className="block right">{item.browser}</div>
            <div className="block right">{item.country}</div>
            <div className="block right">{item.type}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ActivityModalWindow;
