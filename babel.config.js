module.exports = {
  plugins: [
    [
      "babel-plugin-root-import",
      {
        rootPathSuffix: "./src/",
        rootPathPrefix: "@/"
      }
    ]
  ],
  "presets": [["env", { "modules": false }]],
  "env": {
    "test": {
      "presets": [["env", { "targets": { "node": "current" } }]]
    }
  }
};
