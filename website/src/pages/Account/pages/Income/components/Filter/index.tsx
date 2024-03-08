import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Typography, Space, MenuProps } from "antd";
import { FC, useEffect, useState } from "react";
import "./index.sass";

const Filter: FC = () => {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 2023 + 1 },
    (_, i) => ({
      label: String(currentYear - i),
      key: String(i),
    })
  );
  const currentMonth = new Date().getMonth();
  let monthOptions = Array.from({ length: 12 }, (_, index) => {
    return {
      label: new Date(currentYear, index).toLocaleString("default", {
        month: "long",
      }),
      key: String(index),
    };
  });
  const getMonthNumber = (month: string) => {
    return +monthOptions?.find((option) => option.label === month)!.key + 1;
  };
  const currentMonthName = monthOptions?.find(
    (option) => +option.key === currentMonth
  )!.label;

  const [filters, setFilters] = useState<{ [key: string]: string }>({
    selectedMonth: currentMonthName!,
    selectedYear: String(currentYear),
  });

  const availableMonthOptions = monthOptions?.filter(
    (_, i) => +filters.selectedYear !== currentYear || i <= currentMonth
  );

  const isCurrentMonthInFilter =
    filters.selectedMonth !== currentMonthName ||
    filters.selectedYear !== String(currentYear);

  const createFilter = (options: any, filterName: string) => {
    const isActive =
      filterName === "selectedMonth"
        ? isCurrentMonthInFilter
        : filters.selectedYear !== String(currentYear);
    const filterType =
      filterName === "selectedMonth" ? "month-filter" : "year-filter";

    return (
      <Dropdown
        className={`${filterType} ${isActive && "active"}`}
        menu={{
          items: options.map((item: any, i: number) => ({
            key: i,
            label: (
              <a
                className={filters[filterName] == item.label ? "active" : ""}
                onClick={(e) =>
                  setFilters({
                    ...filters,
                    ...(filterName === "selectedYear"
                      ? { selectedMonth: "January" }
                      : {}),
                    [filterName]: options?.find((item: any) => +item.key === i)!
                      .label,
                  })
                }
              >
                {item.label}
              </a>
            ),
          })),
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {filters[filterName]}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      // <Dropdown
      //   className={`${filterType} ${isActive && "active"}`}
      //   trigger={["click"]}
      //   menu={items}
      // overlay={
      //   <Menu
      //     onClick={(e) =>
      //       setFilters({
      //         ...filters,
      //         ...(filterName === "selectedYear"
      //           ? { selectedMonth: "January" }
      //           : {}),
      //         [filterName]: options?.find(
      //           (item: any) => +item.key === +e.key
      //         )!.label,
      //       })
      //     }
      //     selectedKeys={[
      //       `${options?.find(
      //         (item: any) => item.label === filters[filterName]
      //       )!.key}`,
      //     ]}
      //   >
      //     {options.map((item: any) => (
      //       <Menu.Item key={item.key}>{item.label}</Menu.Item>
      //     ))}
      //   </Menu>
      // }
      // >
      //   <Typography.Link>
      //     <Space className={"dropdown"}>
      //       {
      //         options?.find((item: any) => item.label === filters[filterName])!
      //           .label
      //       }
      //       <DownOutlined style={{ color: "black" }} />
      //     </Space>
      //   </Typography.Link>
      // </Dropdown>
    );
  };

  useEffect(() => {
    const month = getMonthNumber(filters.selectedMonth);
    const year = filters.selectedYear;
    console.log(month, year);
  }, [filters]);

  return (
    <div className={"filters-wrapper"}>
      <div className={"filters"}>
        {createFilter(availableMonthOptions, "selectedMonth")}
        {createFilter(yearOptions, "selectedYear")}
      </div>
    </div>
  );
};

export default Filter;
