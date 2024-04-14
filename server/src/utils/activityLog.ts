import { addActivity } from "../db/queries/activityQueries";
const geoip = require("geoip-country");

const handleUserActivity = async (
  userIp: number,
  userAgent: { [key: string]: string },
  user_id: number,
  type: string
) => {
  const convertIPv6toIPv4 = (ip: any) => {
    if (ip.startsWith("::ffff:")) {
      const ipv4Part = ip.split(":").pop();
      return ipv4Part;
    }
    return ip;
  };

  const date = new Date();
  const ip = convertIPv6toIPv4(userIp);
  const geo = geoip.lookup(ip);
  const country = geo?.country || "Undefined";
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
    country,
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
