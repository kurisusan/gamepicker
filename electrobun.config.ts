export default {
  app: {
    name: "GamePicker",
    identifier: "dev.my.app",
    version: "0.0.1",
  },
  build: {
    bun: {
      entrypoint: "src/index.ts",
    },
    views: {
      gui: {
        entrypoint: "src/gui/index.tsx",
      },
    },
    copy: {
      "src/gui/index.html": "views/gui/index.html",
    },
    // linux: {
    //   bundleCEF: true,
    // },
  },
};
