import Fastify from "fastify";
import puppeteer from "puppeteer";
const APP_PORT = process.env.APP_PORT || 3000;
const fastify = Fastify({});
import fastifyStatic from "@fastify/static";
import path from "path";

const __dirname = path.resolve(path.dirname(""));

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "dist"),
  prefix: "/"
});
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "screenshots"),
  prefix: "/screens",
  decorateReply: false
});

const browser = await puppeteer.launch({
  headless: true,
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox"]
});
const screenShotSite = async (slug, title, description) => {
  console.log(`[screenShotSite]`, { slug, title, description });
  const page = await browser.newPage();
  const url = `http://0.0.0.0:${APP_PORT}/?title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(description)}`;
  await page.goto(url, { waitUntil: "networkidle0" });
  console.log(`Loaded page: ${url}`);
  await page.setViewport({ width: 1200, height: 630 });
  await page.screenshot({
    path: `./screenshots/${slug}.jpg`,
    quality: 75
  });
  console.log("screenshoted");
  return `${slug}.jpg`;
};

fastify.post("/", async (req, rep) => {
  console.log(req.body.title);
  let file = await screenShotSite(
    req.body.slug,
    req.body.title,
    req.body.description
  );
  rep.send({ file: file });
});

/**
 * Run the server!
 */
fastify
  .listen({ port: APP_PORT, host: "0.0.0.0" })
  .then((_) => {
    console.log("listening");
  })
  .catch((reason) => {
    console.log(reason);
    process.exit(1);
  });
