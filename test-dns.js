const dns = require("dns");

console.log("Current DNS servers:", dns.getServers());

dns.setServers(["8.8.8.8", "1.1.1.1"]);

console.log("New DNS servers:", dns.getServers());

dns.promises
  .resolveSrv("_mongodb._tcp.cluster0.4bcsa6w.mongodb.net")
  .then((result) => {
    console.log("MongoDB DNS works:");
    console.log(result);
  })
  .catch((error) => {
    console.error("DNS failed:");
    console.error(error);
  });
