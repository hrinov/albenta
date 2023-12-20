const { addActivity } = require("../db/queries/activityQueries");
const geoip = require('geoip-country');

const handleUserActivity = async (userIp, userAgent, user_id, type) => {

    const convertIPv6toIPv4 = (ip) => {
        if (ip.startsWith('::ffff:')) {
            const ipv4Part = ip.split(':').pop();
            return ipv4Part;
        }
        return ip;
    }

    const date = new Date()
    const ip = convertIPv6toIPv4(userIp)
    const geo = geoip.lookup(ip);
    const country = geo?.country || "Underfined";
    const browser = userAgent?.browser || "Underfined";
    const device = userAgent?.isMobile ? 'Mobile' : userAgent?.isTablet ? 'Tablet' : userAgent?.isDesktop ? 'Desktop' : "Underfined";

    const activityOptions = {
        ip, country, device, browser, date, user_id, type
    }

    try {
        await addActivity(activityOptions)
    } catch (error) {
        throw error
    }

}

module.exports = { handleUserActivity }