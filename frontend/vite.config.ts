import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: { // <--- เพิ่มส่วนนี้
    hmr: { // Optional: ช่วยให้ Hot Module Replacement ทำงานได้ดีขึ้นผ่าน ngrok
      host: 'localhost',
      protocol: 'ws', // หรือ 'wss' ถ้า ngrok ของคุณเป็น https และ HMR มีปัญหา
    },
    // อนุญาต host ทั้งหมด (สำหรับ development เท่านั้น, ใช้ด้วยความระมัดระวัง)
    // host: true, // หรือ 0.0.0.0

    // หรือระบุ allowedHosts ที่ต้องการ (ปลอดภัยกว่า)
    allowedHosts: [
      '.ngrok-free.app', // อนุญาตทุก subdomains ของ ngrok-free.app
      // 'fd66-110-169-30-116.ngrok-free.app', // ถ้าต้องการระบุเจาะจง (แต่ URL นี้จะเปลี่ยนทุกครั้งที่รัน ngrok ใหม่)
      'localhost',
      '127.0.0.1'
    ],
    // อีกทางเลือกคือถ้าคุณต้องการให้ Vite dev server ฟังบน IP อื่นๆ ในเครื่อง
    // host: '0.0.0.0' // จะทำให้ Vite ฟังบนทุก network interface
  }
});