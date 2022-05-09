import jsonServer from "json-server";
import express from "express";
import { join } from "path";
const { create, router, defaults } = jsonServer;
const server = create();
const api = router("db.json");
const middlewares = defaults();

server.use(middlewares);
server.use("/api", api);

let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  server.use(express.static(join(__dirname, "../build")));
  server.get("*", (_request, response) => {
    response.send(join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
}

// Start the listener!
const listener = server.listen(port, () => {
  console.log("❇️ JSON-server is running on port", listener.address().port);
});
