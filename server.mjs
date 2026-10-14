
import { createServer } from "node:http";
import app from "./dist/server/index.js";

const PORT = process.env.PORT || 10000;

createServer(async (req, res) => {
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);

    const body = Buffer.concat(chunks);
    const url = `http://${req.headers.host}${req.url}`;

    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      ...(body.length ? { body, duplex: "half" } : {})
    });

    const response = await app.fetch(request, process.env);

    res.writeHead(
      response.status,
      Object.fromEntries(response.headers)
    );
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    console.error(error);
    res.writeHead(500);
    res.end("Internal Server Error");
  }
}).listen(PORT, "0.0.0.0", () => {
  console.log(`AllerMenu running on port ${PORT}`);
});
