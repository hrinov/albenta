import { addActivity } from "../db/queries/activityQueries";

const handleUserActivity = async (
  userAgent: { [key: string]: string },
  user_id: number,
  type: string
) => {
  const date = new Date();
  const platform = userAgent?.platform || "Undefined";
  const browser = userAgent?.browser || "Undefined";
  const device = userAgent?.isMobile
    ? "Mobile"
    : userAgent?.isTablet
    ? "Tablet"
    : userAgent?.isDesktop
    ? "Desktop"
    : "Undefined";

  const activityOptions = {
    platform,
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
