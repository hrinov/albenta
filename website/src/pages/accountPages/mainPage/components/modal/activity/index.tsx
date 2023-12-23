import { FC, useEffect, useState } from "react";
import { Modal } from "antd";
import "./index.sass";
import { requestHandler } from "../../../../../../utils";
import { ActivityInterface } from "../../../../../../../types";
import { Pagination } from "antd";

interface PropsInterface {
  isActivityModalOpen: boolean;
  handleActivityModal: (arg: boolean) => void;
}

const ActivityModalWindow: FC<PropsInterface> = ({
  isActivityModalOpen,
  handleActivityModal,
}) => {
  const [activity, setActivity] = useState<ActivityInterface[] | null>();
  const [totalItems, setTotalItems] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const handleCancel = () => {
    setActivity(null);
    setTotalItems(1);
    setPageNumber(1);
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
    const response: {
      success: boolean;
      data: ActivityInterface[];
      total: number;
    } = await requestHandler(`activity?page=${pageNumber}`, "GET");
    if (response.success) {
      setActivity(response.data);
      setTotalItems(response.total || 1);
    }
  };

  const handleChangePage = (page: number) => {
    setActivity(null);
    setPageNumber(page);
  };

  useEffect(() => {
    if (isActivityModalOpen) getActivity();
  }, [isActivityModalOpen, pageNumber]);

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
        {activity?.map((item, i) => (
          <div className="activity" key={item.date}>
            <div className="block">{formatDate(item.date)}</div>
            <div className="block right">{item.device}</div>
            <div className="block right">{item.browser}</div>
            <div className="block right">{item.country}</div>
            <div className="block right">{item.type}</div>
          </div>
        ))}
        {!activity &&
          Array(10)
            .fill(null)
            ?.map((item, i) => (
              <div className="activity skeleton square" key={"skeleton" + i} />
            ))}
      </div>
      <div className="footer">
        <Pagination
          simple
          defaultCurrent={1}
          total={totalItems}
          onChange={(page) => handleChangePage(page)}
        />
      </div>
    </Modal>
  );
};

export default ActivityModalWindow;
