import http from "http";
import createApp from "./app";
import config from "./app/config/env";

function main() {
  try {
    const port = +(config.app.port);
    const server = http.createServer(createApp());

    server.listen(port, () => {
      console.log(`Server is running port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
}

main();


