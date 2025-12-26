// import path from "path";
// import tailwindcss from "@tailwindcss/vite";
// import react from "@vitejs/plugin-react-swc";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   server: {
//     port: 3000,         // 🔁 You can change this to 3000 or any unused port
//     open: true,         // 🚀 This will automatically open the browser
//     strictPort: true,   // ❗ If port is taken, fail instead of switching
//     proxy: {
//       "/api/v1/published-events": {
//         target: "http://localhost:8080",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api\/v1/, ""),
//       },
//       "/api/v1/events": {
//         target: "http://localhost:8080",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api\/v1/, ""),
//       },
//       "/api/v1/tickets": {
//         target: "http://localhost:8080",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api\/v1/, ""),
//       },
//       "/api": {
//         target: "http://localhost:8080",
//         changeOrigin: true,
//       },
//     },
//   },
// });

import path from "path";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 3000,
    open: true,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
