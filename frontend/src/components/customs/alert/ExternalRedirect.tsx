
import React, { useEffect } from 'react';

// ========================================================================
// Export APP_URLS และ AppUrlKeys เพื่อให้ component อื่นนำไปใช้ได้
export const APP_URLS = {
  DRIVE_SERVICE_NGROK: 'https://4e5c-2405-9800-b661-12c3-a266-8b9d-17b6-1d3f.ngrok-free.app/',
  // ... other URLs
} as const;

export type AppUrlKeys = keyof typeof APP_URLS;

interface ExternalRedirectProps {
  to: AppUrlKeys;
}

// ✅ ประกาศ type สำหรับคอมโพเนนต์ที่มี static property
interface ExternalRedirectComponent extends React.FC<ExternalRedirectProps> {
  APP_URLS: typeof APP_URLS;
}

// ✅ สร้างคอมโพเนนต์ตาม type ที่กำหนดไว้
const ExternalRedirect: ExternalRedirectComponent = ({ to }) => {
  const destinationUrl = APP_URLS[to];

  useEffect(() => {
    if (destinationUrl) {
      window.location.href = destinationUrl;
    } else {
      console.error(`URL key "${String(to)}" not found.`);
    }
  }, [to, destinationUrl]);

  if (!destinationUrl) return <p>Error: Invalid redirect key.</p>;
  return <p>Redirecting to {String(to)}...</p>;
};

// ✅ แนบ static property
ExternalRedirect.APP_URLS = APP_URLS;

export default ExternalRedirect;
