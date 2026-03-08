import http from "http";
import createApp from "./app";

function main() {
    try {
        const port = 8080;
        const server = http.createServer(createApp());

        server.listen(port,() => {
            console.log(`Server is running port: ${port}`)
        })

    } catch (error) {
        console.error("Failed to start server", error)
    }
}

main();