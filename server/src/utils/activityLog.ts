import { addActivity } from "../db/queries/activityQueries";

const handleUserActivity = async (
  ip: any,
  userAgent: { [key: string]: string },
  user_id: number,
  type: string
) => {
  const date = new Date();
  const browser = userAgent?.browser || "Undefined";
  const device = userAgent?.isMobile
    ? "Mobile"
    : userAgent?.isTablet
    ? "Tablet"
    : userAgent?.isDesktop
    ? "Desktop"
    : "Undefined";

  const activityOptions = {
    ip,
    type,
    date,
    device,
    browser,
    user_id,
  };

  try {
    await addActivity(activityOptions);
  } catch (error) {
    throw error;
  }
};

export { handleUserActivity };
