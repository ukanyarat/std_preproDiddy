import { Button, Text } from "@radix-ui/themes";
import { useState } from "react";
import { FaCarSide } from "react-icons/fa";
export default function HomeFeature() {
  const [isDriving, setIsDriving] = useState(false);

  const handleClick = () => {
    setIsDriving(true);
    setTimeout(() => {
      handleToDrive();
    }, 500);
  };
  const handleToDrive = () => {
    window.location.href = "/drive";
  };
  const handleToManual = () => {
    window.location.href = "/manual";
  };

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
          <FaCarSide className="text-red drop-shadow-lg hover:text-red-600" onClick={handleClick} />
        </div>
        <Button
          className=" text-xl font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md w-full transition-all duration-300 "
          onClick={handleClick}
          disabled={isDriving}
        >
          ลองขับตอนนี้!!
        </Button>
      </div>

      <img
        src="/images/5555.png"
        alt="คลิกเพื่อเดินทาง"
        className="justify-center w-1/2 hover:cursor-pointer hover:opacity-80 opacity-100 transition ease-in-out duration-300 mb-4"
        onClick={() => { handleToDrive(); }}
      />
      <Text className="text-base font-bold text-gray-700 text-center mb-4 underline hover:cursor-pointer hover:text-red-600"
        onClick={() => { handleToManual(); }}>
        คลิกเพื่อดูคู่มือ
      </Text>
      <Text className="text-xs text-gray-200 text-center">Copyright ©2025 Diddy</Text>



    </div>
  );
}
