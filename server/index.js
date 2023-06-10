const fastify = require("fastify")();
const { default: puppeteer } = require("puppeteer");
const scrape = require("./scrape");

fastify.register(require("@fastify/cors"), {
  origin: "*",
});
fastify.register(require("@fastify/websocket"));

fastify.register(async (fastify) => {
  fastify.get("/ws", { websocket: true }, (connection, request) => {
    console.log("Client connected.");
    let browser;

    connection.socket.on("message", async (message) => {
      const request = JSON.parse(message);

      if (request.type === "SCRAPE") {
        const { startDate, endDate } = request.data;
        browser = await puppeteer.launch({
          headless: true,
          defaultViewport: null,
        });

        await scrape(browser, connection, startDate, endDate);
      }

      if (request.type === "ABORT") {
        browser && (await browser.close());
        connection.socket.send(
          JSON.stringify({
            type: "ABORT",
          })
        );
      }
    });

    connection.socket.on("close", () => {
      browser && browser.close();
      console.log("Client disconnected.");
    });
  });
});

fastify.get("/", async (request, reply) => {
  reply.send({
    info: "T.C. Ticaret Bakanlığı Hal Kayıt Sistemi Sebze ve Meyve Fiyat İstatistikleri - Web Scraper Tool API",
  });
});

fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at: ${address}`);
});
