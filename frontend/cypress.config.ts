import { defineConfig } from "cypress";

export default defineConfig({
    e2e: { baseUrl: 'http://192.168.15.12:5173' },
});
