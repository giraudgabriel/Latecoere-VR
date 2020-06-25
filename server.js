const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router);

let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
    port = process.env.PORT || 3000;
} else {
    port = 3001;
}

// Start the listener!
const listener = server.listen(port, () => {
    console.log("❇️ JSON-server is running on port", listener.address().port);
});
