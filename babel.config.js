module.exports = {
  "plugins": [
    [
      "dynamic-import-node",
      {
        "noInterop": true
      }
    ]
  ],
  "env": {
    "test": {
      "presets": ["@vue/cli-plugin-babel/preset",
        [
          "@babel/preset-env",
          {
            "targets": {
              "node": "current"
            }
          }
        ]
      ]
    }
  }
}