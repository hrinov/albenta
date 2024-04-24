export function convertIPv6ToIPv4(ip: string) {
  function isIPv6Format(ip: string) {
    const ipv6Regex = /^::ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/;
    return ipv6Regex.test(ip);
  }

  if (isIPv6Format(ip)) {
    const parts = ip.split(":");
    return parts[parts.length - 1];
  }
  return ip;
}
