module.exports = {
  apps: [
    {
      name: "almaluz",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3006",
      cwd: "/root/Proyectos/AlmaLuz",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
        PORT: 3006,
      },
    },
  ],
};
