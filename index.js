const server = require("./api/server");

const PORT = 4000;

server.listen(PORT, () => console.log(`server running in port ${PORT}`));
