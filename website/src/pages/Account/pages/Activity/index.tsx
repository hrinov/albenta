import "./index.sass";
import { Empty, Pagination } from "antd";
import { FC, useEffect, useState } from "react";
import { formatDate, requestHandler } from "../../../../utils";

const Activity: FC = () => {
  const [totalItems, setTotalItems] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [activity, setActivity] = useState<ActivityInterface[] | null>();

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
          <div className="block right colored-blue">ACTIVITY</div>
        </div>

        {activity?.map((item, i) => (
          <div className="activity" key={item.date}>
            <div className="block colored-pink">{getItemNumber(i)}</div>
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
            ?.map((_, i) => (
              <div
                className="activity"
                key={"skeleton" + i}
                children={<div className="block skeleton squared" />}
              />
            ))}

        {activity?.length == 0 && <Empty />}
      </div>

      <div className="footer">
        <Pagination
          simple
          total={totalItems}
          current={pageNumber}
          onChange={(page) => handleChangePage(page)}
        />
      </div>
    </section>
  );
};

export default Activity;
