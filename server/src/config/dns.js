import dns from "node:dns";

const configureDns = () => {
  const configuredServers = (process.env.DNS_SERVERS || "8.8.8.8,1.1.1.1")
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  if (configuredServers.length) {
    dns.setServers(configuredServers);
  }
};

export default configureDns;
