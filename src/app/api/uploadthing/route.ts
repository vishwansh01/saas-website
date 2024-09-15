import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// console.log("iy", process.env.UPLOADTHING_SECRET);
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN,
  },
});
