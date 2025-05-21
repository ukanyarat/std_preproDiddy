// src/components/customs/alert/ExternalRedirect.tsx
import React, { useEffect } from 'react';

// ========================================================================
// Export APP_URLS และ AppUrlKeys เพื่อให้ component อื่นนำไปใช้ได้
export const APP_URLS = {
  DRIVE_SERVICE_NGROK: 'https://f996-2405-9800-b661-12c3-a266-8b9d-17b6-1d3f.ngrok-free.app/',
  // ... other URLs
} as const;

export type AppUrlKeys = keyof typeof APP_URLS;
// ========================================================================

interface ExternalRedirectProps {
  to: AppUrlKeys;
}

const ExternalRedirect: React.FC<ExternalRedirectProps> = ({ to }) => {
  // ... (ส่วนที่เหลือของ component เหมือนเดิม)
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

export default ExternalRedirect;