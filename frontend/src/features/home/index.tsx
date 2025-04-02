import { Button, Text } from "@radix-ui/themes";
export default function HomeFeature() {

  const handleToDrive = () => {
    window.location.href = "/drive";
  };
  const handleToManual = () => {
    window.location.href = "/manual";
  };

  return (
    <div className="flex flex-col items-center">
      <Text className="text-3xl font-bold text-gray-700 text-center mb-4 ">Welcome to Diddy</Text>
      <Text className="text-xl text-gray-700 text-center mb-4"> ฉันคือรถบังคับอัจฉริยะ ที่ควบคุมด้วยเสียงและ AI เปลี่ยนประสบการณ์การขับขี่ให้ล้ำยุค!
        ตอบสนองฉับไว ขับเคลื่อนแม่นยำ สนุกได้ทุกวัยกับเทคโนโลยีสุดล้ำเชื่อมต่อโลกดิจิทัล สั่งการง่าย <br /> แค่พูดก็ขับได้!
      </Text>
      <Button className="text-3xl font-bold text-center mb-2 p-6 w-120 hover:bg-green-700 "
        onClick={() => { handleToDrive(); }}>
        start now!!
      </Button>
      <Text className="text-base font-bold text-gray-700 text-center mb-4 underline hover:cursor-pointer hover:text-red-600"
        onClick={() => { handleToManual(); }}>
        คลิกเพื่อดูคู่มือ
      </Text>
      <img
        src="/images/5555.png"
        alt="คลิกเพื่อเดินทาง"
        className="justify-center w-1/2 hover:cursor-pointer hover:opacity-80 opacity-100 transition ease-in-out duration-300"
        onClick={() => { handleToDrive(); }}
      />
    </div>
  );
}
