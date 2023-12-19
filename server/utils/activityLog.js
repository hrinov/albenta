var geoip = require('geoip-country');

const handleUserActivity = (userIp, userAgent, type) => {

    const convertIPv6toIPv4 = (ip) => {
        if (ip.startsWith('::ffff:')) {
            const ipv4Part = ip.split(':').pop();
            return ipv4Part;
        }
        return ip;
    }

    const date = new Date()
    const formatedIp = convertIPv6toIPv4(userIp)
    const geo = geoip.lookup(formatedIp);
    const country = geo?.country || "Underfined";
    const browser = userAgent?.browser || "Underfined";
    const device = userAgent?.isMobile ? 'Mobile' : userAgent?.isTablet ? 'Tablet' : userAgent?.isDesktop ? 'Desktop' : "Underfined";

    console.log(formatedIp, country, device, browser, date, type)

}

module.exports = { handleUserActivity }