module.exports = {
  apps: [
    {
      name: "ZENTRIX",
      script: "./src/core/zentrix.js",
      env: { PORT: 3000 }
    },
    {
      name: "CYBERTRON",
      script: "./src/agents/cybertron.js",
      env: { CYBERTRON_PORT: 3001 }
    },
    {
      name: "VYTRON",
      script: "./src/agents/vytron.js",
      env: { VYTRON_PORT: 3002 }
    },
    {
      name: "NEXARON",
      script: "./src/agents/nexaron.js",
      env: { NEXARON_PORT: 3003 }
    },
    {
      name: "SYNTRON",
      script: "./src/agents/syntron.js",
      env: { SYNTRON_PORT: 3004 }
    },
    {
      name: "QUANTIX",
      script: "./src/agents/quantix.js",
      env: { QUANTIX_PORT: 3005 }
    },
    {
      name: "GAMORA",
      script: "./src/agents/gamora.js",
      env: { GAMORA_PORT: 3006 }
    }
  ]
};
