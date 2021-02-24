module.exports = {
  apps: [
    {
      name: "admix-dsp-test-server",
      script: "index.js",
      watch: false,
      exec_mode: "cluster",
      instances: "max",
      env: {
        NODE_ENV: "development"
      }
    }
  ]
};
