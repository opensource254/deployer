export default defineEventHandler((event) => {
  const url = event.node.req.url; // Get original URL
  console.log('New request: ' + url);
});
