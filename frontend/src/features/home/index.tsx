import { Button, Text } from "@radix-ui/themes";
import { useState } from "react";
import { FaCarSide } from "react-icons/fa";
// Import ExternalRedirect และ types ที่จำเป็น
import ExternalRedirect, { AppUrlKeys } from "@/components/customs/alert/ExternalRedirect";

export default function HomeFeature() {
  const [isDriving, setIsDriving] = useState(false);
  // State ใหม่สำหรับควบคุมการ redirect
  const [redirectToKey, setRedirectToKey] = useState<AppUrlKeys | null>(null);

  // ฟังก์ชันที่ trigger การ redirect ไปยัง "ขับรถ" (ngrok URL)
  const triggerDriveRedirect = () => {
    setIsDriving(true); // สำหรับ animation
    setTimeout(() => {
      // ตั้งค่า key ที่จะ redirect ไป
      setRedirectToKey("DRIVE_SERVICE_NGROK");
    }, 500); // หน่วงเวลาเพื่อให้ animation แสดงผล (ถ้าต้องการ)
  };

  // ฟังก์ชันเดิมที่ใช้ window.location.href โดยตรง (สำหรับ internal link)
  const handleToManual = () => {
    window.location.href = "/manual"; // นี่คือ internal link, ยังใช้แบบเดิมได้
  };

  // ถ้า redirectToKey มีค่า, ให้ render ExternalRedirect component
  if (redirectToKey) {
    return <ExternalRedirect to={redirectToKey} />;
  }

  // ถ้าไม่, render UI ปกติของ HomeFeature
  return (
    <div className="flex flex-col items-center">
      <Text className="text-3xl font-bold text-red-700 text-center mb-4 bg-red-50 w-full">Welcome to Diddy</Text>
      <Text className="text-xl text-gray-700 text-center mb-4"> ฉันคือรถบังคับอัจฉริยะ ที่ควบคุมด้วยเสียงและ AI เปลี่ยนประสบการณ์การขับขี่ให้ล้ำยุค!
        ตอบสนองฉับไว ขับเคลื่อนแม่นยำ สนุกได้ทุกวัยกับเทคโนโลยีสุดล้ำเชื่อมต่อโลกดิจิทัล สั่งการง่าย <br /> แค่พูดก็ขับได้!
      </Text>

      <div className="relative w-full mt-4 max-w-[200px] mx-auto h-[80px]">
        <div
          className={`
            absolute top-1/2 -translate-y-1/2 text-5xl transition-transform duration-[1000ms]
            ${isDriving ? "translate-x-[200px] translate-y-[-35px]" : "translate-x-[-40px] translate-y-[-35px]"}
          `}
        >
          {/* เปลี่ยน onClick ของ FaCarSide ให้เรียก triggerDriveRedirect */}
          <FaCarSide className="text-red drop-shadow-lg hover:text-red-600 cursor-pointer" onClick={triggerDriveRedirect} />
        </div>
        <Button
          className=" text-xl font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md w-full transition-all duration-300 "
          onClick={triggerDriveRedirect} // เรียก triggerDriveRedirect
          disabled={isDriving}
        >
          ลองขับตอนนี้!!
        </Button>
      </div>

      <img
        src="/images/6.jpg"
        alt="คลิกเพื่อเดินทาง"
        className="justify-center w-1/2 hover:cursor-pointer hover:opacity-80 opacity-100 transition ease-in-out duration-300 mb-4"
        onClick={triggerDriveRedirect} // เรียก triggerDriveRedirect
      />
      <Text className="text-base font-bold text-gray-700 text-center mb-4 underline hover:cursor-pointer hover:text-red-600"
        onClick={handleToManual}> {/* onClick นี้ยังคงเดิม เพราะเป็น internal link */}
        คลิกเพื่อดูคู่มือ
      </Text>
      <Text className="text-xs text-gray-200 text-center">Copyright ©2025 Diddy</Text>
    </div>
  );
}