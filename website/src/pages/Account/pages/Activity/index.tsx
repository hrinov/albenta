import { FC, useEffect, useState } from "react";
import "./index.sass";
import { requestHandler } from "../../../../utils";
import { ActivityInterface } from "../../../../../types";
import { Pagination } from "antd";

const Activity: FC = () => {
  const [activity, setActivity] = useState<ActivityInterface[] | null>();
  const [totalItems, setTotalItems] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);

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

  const getItemNumber = (i: number) => {
    return pageNumber == 1 ? i + 1 : 10 * (pageNumber - 1) + (i + 1);
  };

  useEffect(() => {
    getActivity();
  }, [pageNumber]);

  return (
    <section className="activity">
      <div className="activity-main-wrapper">
        <div className="activity title">
          <div className="block">№</div>
          <div className="block">DATE</div>
          <div className="block right">DEVICE</div>
          <div className="block right">BROWSER</div>
          <div className="block right">COUNTRY</div>
          <div className="block right">ACTIVITY</div>
        </div>
        {activity?.map((item, i) => (
          <div className="activity" key={item.date}>
            <div className="block">{getItemNumber(i)}</div>
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
              <div className="activity" key={"skeleton" + i}>
                <div className="block skeleton square" />
                <div className="block skeleton square" />
                <div className="block skeleton square" />
                <div className="block skeleton square" />
                <div className="block skeleton square" />
                <div className="block skeleton square" />
              </div>
            ))}
      </div>
      <div className="footer">
        <Pagination
          simple
          current={pageNumber}
          total={totalItems}
          onChange={(page) => handleChangePage(page)}
        />
      </div>
    </section>
  );
};

export default Activity;
