export default defineEventHandler((event) => {
  event.node.res.setHeader("Cache-Control", `max-age=864000`);
});
