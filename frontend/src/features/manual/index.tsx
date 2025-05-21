import React, { useState } from 'react';
import { Button, Grid, Text, Card, Heading, Table, Strong, Em } from '@radix-ui/themes';
import { FaCarSide, FaKeyboard, FaMicrophone, FaTools, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import ExternalRedirect, { AppUrlKeys } from "@/components/customs/alert/ExternalRedirect";

const OBSTACLE_THRESHOLD_CM = 10;
const FORCED_STOP_DURATION_S = 2.0;
const SENSOR_READ_PAUSE_DURATION_S = 3.0;
const PI_INTERPRETATION_LANG_IS_THAI = true;

const ManualFeature = () => {
  const [isDriving, setIsDriving] = useState(false);
  const [redirectToKey, setRedirectToKey] = useState<AppUrlKeys | null>(null);

  const triggerDriveRedirect = () => {
    setIsDriving(true);
    setTimeout(() => {
      setRedirectToKey("DRIVE_SERVICE_NGROK");
    }, 1500);
  };

  if (redirectToKey) {
    return <ExternalRedirect to={redirectToKey} />;
  }

  return (
    // ปรับ div หลักให้เป็น flex column และยืดเต็มความสูง (หรืออย่างน้อยเต็ม viewport)
    <div className='flex flex-col min-h-screen w-full bg-gray-50'>
      {/* ส่วนเนื้อหาหลักของหน้า */}
      <div className="flex-grow p-4 md:p-8 space-y-6 w-full"> {/* <--- เพิ่ม flex-grow และย้าย padding มาที่นี่ */}
        <div className="flex flex-col items-center">
          <Heading as="h1" size="8" className="text-red-700 mb-6">
            คู่มือการใช้งานรถบังคับอัจฉริยะ Diddy
          </Heading>
        </div>

        {/* Section: ภาพรวมและการเริ่มต้น */}
        <Card>
          <Heading as="h2" size="6" className="mb-3 text-red-600 flex items-center">
            <FaInfoCircle className="mr-2" /> ภาพรวมและการเริ่มต้น
          </Heading>
          <Text as="p" className="mb-2">
            ยินดีต้อนรับสู่คู่มือการใช้งานรถบังคับ Diddy! รถคันนี้ควบคุมได้ทั้งผ่านคีย์บอร์ดและคำสั่งเสียงด้วยระบบ AI อัจฉริยะ (Gemini)
            เพื่อให้ได้ประสบการณ์ที่ดีที่สุด โปรดอ่านคู่มือนี้ให้ละเอียดก่อนเริ่มใช้งาน
          </Text>
          <Text as="p">
            <Strong>การเตรียมตัว:</Strong> ตรวจสอบให้แน่ใจว่ารถบังคับเปิดอยู่และเชื่อมต่อกับเครือข่ายเรียบร้อยแล้ว
            คุณสามารถเข้าหน้าควบคุมหลักได้โดยการคลิกปุ่ม "ลองขับตอนนี้!!"
          </Text>
        </Card>

        {/* Section: การควบคุมด้วยคีย์บอร์ด */}
        <Card>
          <Heading as="h2" size="6" className="mb-3 text-blue-600 flex items-center">
            <FaKeyboard className="mr-2" /> การควบคุมด้วยคีย์บอร์ด
          </Heading>
          <Text as="p" className="mb-3">
            คุณสามารถควบคุมรถได้โดยตรงจากหน้าเว็บผ่านคีย์บอร์ดคอมพิวเตอร์ของคุณ:
          </Text>
          <div className="overflow-x-auto">
            <Table.Root variant="surface" size="2">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>ปุ่มคีย์บอร์ด (Key)</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>คำสั่ง (Action)</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell><Strong>ลูกศรขึ้น (↑)</Strong></Table.Cell>
                  <Table.Cell>เดินหน้า</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Strong>ลูกศรลง (↓)</Strong></Table.Cell>
                  <Table.Cell>ถอยหลัง</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Strong>ลูกศรซ้าย (←)</Strong></Table.Cell>
                  <Table.Cell>เลี้ยวซ้าย / เคลื่อนที่ไปทางซ้าย</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Strong>ลูกศรขวา (→)</Strong></Table.Cell>
                  <Table.Cell>เลี้ยวขวา / เคลื่อนที่ไปทางขวา</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </div>
        </Card>

        {/* Section: การควบคุมด้วยเสียง */}
        <Card>
          <Heading as="h2" size="6" className="mb-3 text-green-600 flex items-center">
            <FaMicrophone className="mr-2" /> การควบคุมด้วยเสียง (AI Gemini)
          </Heading>
          <Text as="p" className="mb-2">
            รถ Diddy รองรับการสั่งงานด้วยเสียงผ่านเทคโนโลยี AI Gemini จาก Google
            ระบบสามารถเข้าใจคำสั่งได้ทั้งภาษา{PI_INTERPRETATION_LANG_IS_THAI ? <Strong>ไทย</Strong> : <Strong>อังกฤษ</Strong>}.
          </Text>
          <Text as="p" className="mb-2">
            <Strong>วิธีใช้งาน:</Strong>
            <ol className="list-decimal list-inside ml-4">
              <li>ไปที่หน้าควบคุมหลัก (คลิก "ลองขับตอนนี้!!")</li>
              <li>คลิกปุ่ม "<span>🎙️</span> Listen" (หรือปุ่มไมโครโฟน)</li>
              <li>รอจนสถานะเปลี่ยนเป็น "Listening..."</li>
              <li>พูดคำสั่งของคุณให้ชัดเจน (เช่น "เดินหน้า", "ถอยหลัง 2 เมตร", "เลี้ยวซ้าย 1 วินาที")</li>
              <li>ระบบ AI จะประมวลผลคำสั่งและรถจะเคลื่อนที่ตาม (ถ้าคำสั่งถูกต้องและปลอดภัย)</li>
              <li>รถอาจมีการตอบสนองด้วยเสียงเพื่อยืนยันคำสั่งหรือแจ้งสถานะ</li>
            </ol>
          </Text>
          <Text as="p" className="mb-2">
            <Strong>ตัวอย่างคำสั่งเสียง:</Strong>
            <ul className="list-disc list-inside ml-4">
              <li>"เดินหน้า"</li>
              <li>"ถอยหลัง"</li>
              <li>"เลี้ยวซ้าย"</li>
              <li>"เลี้ยวขวา"</li>
              <li>"หยุด"</li>
              <li>"ไปข้างหน้า 3 เมตร" (AI จะพยายามแปลงเป็นระยะเวลาการเคลื่อนที่)</li>
              <li>"หมุนซ้าย 2 วินาที"</li>
            </ul>
          </Text>
          <Text as="p">
            <Em>หมายเหตุ: ความแม่นยำในการตีความคำสั่งขึ้นอยู่กับความชัดเจนของเสียงและสภาพแวดล้อม
            หาก AI ไม่เข้าใจ หรือคำสั่งอาจก่อให้เกิดอันตราย รถจะไม่เคลื่อนที่หรือแจ้งข้อผิดพลาด</Em>
          </Text>
        </Card>

        {/* Section: การทำงานของเซ็นเซอร์ */}
        <Card>
          <Heading as="h2" size="6" className="mb-3 text-purple-600 flex items-center">
            <FaCarSide className="mr-2" /> การทำงานของเซ็นเซอร์ (HC-SR04)
          </Heading>
          <Text as="p" className="mb-2">
            รถ Diddy ติดตั้งเซ็นเซอร์วัดระยะทาง HC-SR04 เพื่อตรวจจับสิ่งกีดขวางด้านหน้า:
          </Text>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <Strong>การตรวจจับสิ่งกีดขวาง:</Strong> หากเซ็นเซอร์ตรวจพบสิ่งกีดขวางในระยะใกล้กว่า <Strong>{OBSTACLE_THRESHOLD_CM} เซนติเมตร</Strong> ขณะที่รถกำลัง <Em>เดินหน้า</Em>:
              <ul className="list-circle list-inside ml-6">
                <li>รถจะ<Strong>หยุด</Strong>การเคลื่อนที่ไปข้างหน้า</li>
                <li>จากนั้นรถจะ<Strong>ถอยหลังเล็กน้อย</Strong> (ประมาณ 0.3 วินาที) แล้วหยุดสนิท</li>
                <li>ระบบจะเข้าสู่โหมด <Strong>Forced Stop</Strong> เป็นเวลา <Strong>{FORCED_STOP_DURATION_S} วินาที</Strong> ซึ่งในช่วงนี้จะไม่สามารถสั่งให้รถเดินหน้าได้ (เพื่อความปลอดภัย)</li>
                <li>เซ็นเซอร์จะ<Strong>หยุดอ่านค่าชั่วคราว</Strong> (Sensor Pause) เป็นเวลา <Strong>{SENSOR_READ_PAUSE_DURATION_S} วินาที</Strong> หลังจากตรวจพบสิ่งกีดขวางและรถหยุดแล้ว เพื่อป้องกันการอ่านค่าที่ผิดพลาดจากการเคลื่อนไหวของรถเอง</li>
              </ul>
            </li>
            <li>
              <Strong>การหยุดเมื่อมีสิ่งกีดขวาง (ไม่ว่าจะเคลื่อนที่ทางไหน):</Strong> หากตรวจพบสิ่งกีดขวางในระยะใกล้กว่า <Strong>{OBSTACLE_THRESHOLD_CM} ซม.</Strong> และรถกำลังเคลื่อนที่ (ไม่จำเป็นต้องเดินหน้า) รถจะ<Strong>หยุด</Strong> และเซ็นเซอร์จะ<Strong>หยุดอ่านค่าชั่วคราว</Strong>.
            </li>
            <li>
              <Strong>ข้อผิดพลาดของเซ็นเซอร์:</Strong> หากมีปัญหาในการอ่านค่าจากเซ็นเซอร์ (เช่น สายหลุดหรือเซ็นเซอร์เสียหาย) สถานะบนหน้าจอจะแสดง "Sensor Error"
              ในกรณีนี้ ควรใช้ความระมัดระวังในการควบคุมรถด้วยตนเอง เนื่องจากระบบป้องกันสิ่งกีดขวางอัตโนมัติอาจทำงานไม่ถูกต้อง
            </li>
          </ul>
        </Card>

        {/* Section: สถานะและการแจ้งเตือน */}
        <Card>
          <Heading as="h2" size="6" className="mb-3 text-teal-600 flex items-center">
            <FaInfoCircle className="mr-2" /> สถานะและการแจ้งเตือนบนหน้าจอควบคุม
          </Heading>
          <Text as="p" className="mb-3">
            บนหน้าจอควบคุม คุณจะเห็นข้อมูลสถานะต่างๆ ของรถ ซึ่งช่วยให้คุณทราบถึงการทำงานปัจจุบัน:
          </Text>
          <div className="overflow-x-auto">
            <Table.Root variant="surface" size="2">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>สถานะ (Status Message)</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>ความหมาย</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell><span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">Ready (Path Clear)</span></Table.Cell>
                  <Table.Cell>รถพร้อมทำงาน ไม่มีสิ่งกีดขวาง</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">Running (forward/backward/etc.)</span></Table.Cell>
                  <Table.Cell>รถกำลังเคลื่อนที่ตามคำสั่งล่าสุด</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">MOTOR STOP (Obstacle ...)</span></Table.Cell>
                  <Table.Cell>รถหยุดอัตโนมัติเนื่องจากตรวจพบสิ่งกีดขวาง และอยู่ในช่วง Forced Stop ({FORCED_STOP_DURATION_S} วินาที)</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">STOPPED (Obstacle ...)</span></Table.Cell>
                  <Table.Cell>รถหยุดเนื่องจากมีสิ่งกีดขวาง (อาจไม่อยู่ใน Forced Stop)</Table.Cell>
                </Table.Row>
                 <Table.Row>
                  <Table.Cell><span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-purple-500 rounded-full">SENSOR PAUSED (...)</span></Table.Cell>
                  <Table.Cell>เซ็นเซอร์หยุดอ่านค่าชั่วคราว ({SENSOR_READ_PAUSE_DURATION_S} วินาที) จะกลับมาทำงานอัตโนมัติ</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><span className="inline-block px-2 py-1 text-xs font-semibold text-black bg-yellow-400 rounded-full">Sensor Error - Manual Control Advised</span></Table.Cell>
                  <Table.Cell>มีปัญหาในการอ่านค่าจากเซ็นเซอร์ ควรควบคุมด้วยตนเองอย่างระมัดระวัง</Table.Cell>
                </Table.Row>
                 <Table.Row>
                  <Table.Cell><span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-gray-500 rounded-full">Initializing... / Status Unknown</span></Table.Cell>
                  <Table.Cell>ระบบกำลังเริ่มต้น หรือสถานะยังไม่แน่นอน</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </div>
           <Text as="p" className="mt-3">
            <Strong>ข้อมูลเพิ่มเติมใน Debug Info:</Strong>
            <ul className="list-disc list-inside ml-4">
              <li><Strong>Last Command:</Strong> คำสั่งล่าสุดที่รถได้รับ</li>
              <li><Strong>Movement:</Strong> สถานะการอนุญาตให้เคลื่อนที่ (Enabled/Disabled)</li>
              <li><Strong>Motor Forced Stop:</Strong> รถอยู่ในโหมด Forced Stop หรือไม่ (Yes/No)</li>
              <li><Strong>Sensor Paused:</Strong> เซ็นเซอร์หยุดอ่านค่าชั่วคราวหรือไม่ (Yes/No)</li>
              <li><Strong>Sensor Error:</Strong> เซ็นเซอร์มีปัญหาหรือไม่ (Yes/No)</li>
            </ul>
          </Text>
        </Card>

        {/* Section: การแก้ไขปัญหาเบื้องต้น */}
        <Card>
          <Heading as="h2" size="6" className="mb-3 text-orange-600 flex items-center">
            <FaTools className="mr-2" /> การแก้ไขปัญหาเบื้องต้น
          </Heading>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><Strong>รถไม่เคลื่อนที่:</Strong>
              <ul className="list-circle list-inside ml-6">
                <li>ตรวจสอบสถานะบนหน้าจอ หากเป็น "MOTOR STOP" หรือ "Sensor Paused" ให้รอสักครู่</li>
                <li>ตรวจสอบว่ารถไม่ได้อยู่ในโหมด Forced Stop</li>
                <li>หากสถานะเป็น "Movement: Disabled" และไม่ใช่เพราะสิ่งกีดขวาง อาจต้องตรวจสอบการเชื่อมต่อหรือ Log ของระบบ</li>
                <li>ลองกดปุ่ม "Stop" บนหน้าเว็บ แล้วลองสั่งงานใหม่อีกครั้ง</li>
              </ul>
            </li>
            <li><Strong>คำสั่งเสียงไม่ทำงาน:</Strong>
              <ul className="list-circle list-inside ml-6">
                <li>ตรวจสอบว่าไมโครโฟนเชื่อมต่อและได้รับอนุญาตให้เข้าถึงใน Browser</li>
                <li>พูดให้ชัดเจนและใกล้ไมโครโฟน</li>
                <li>ตรวจสอบสถานะ "Voice Status" บนหน้าจอควบคุม</li>
                <li>หากใช้ Gemini API อาจมีปัญหาการเชื่อมต่ออินเทอร์เน็ต หรือ API key (ส่วนนี้สำหรับผู้ดูแลระบบ)</li>
              </ul>
            </li>
            <li><Strong>สถานะ "Sensor Error":</Strong>
              <ul className="list-circle list-inside ml-6">
                <li>ตรวจสอบการเชื่อมต่อสายของเซ็นเซอร์ HC-SR04 กับ Raspberry Pi</li>
                <li>อาจจำเป็นต้องรีสตาร์ทโปรแกรมควบคุมบน Raspberry Pi</li>
              </ul>
            </li>
          </ul>
        </Card>

        {/* Section: ข้อควรระวัง */}
        <Card>
          <Heading as="h2" size="6" className="mb-3 text-red-700 flex items-center">
            <FaExclamationTriangle className="mr-2" /> ข้อควรระวังและคำแนะนำ
          </Heading>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>ใช้งานในพื้นที่โล่งและปลอดภัย เพื่อหลีกเลี่ยงการชนหรือตกหล่น</li>
            <li>ถึงแม้จะมีเซ็นเซอร์ป้องกัน แต่ควรดูแลการเคลื่อนที่ของรถอยู่เสมอ</li>
            <li>ระวังอย่าให้รถเปียกน้ำหรือสัมผัสความชื้นสูง</li>
            <li>หากไม่ได้ใช้งานเป็นเวลานาน ควรปิดสวิตช์รถเพื่อประหยัดพลังงาน</li>
            <li>การแปลง "เมตร" เป็น "วินาที" ในคำสั่งเสียงเป็นการประมาณค่า อาจไม่แม่นยำ 100%</li>
          </ul>
        </Card>

        {/* Section: ตัวอย่างรูปรถ Diddy */}
        <Card className="mt-2"> {/* ลด mt-8 เหลือ mt-2 หรือตามชอบ */}
          <Heading as="h2" size="6" className="mb-4 text-center text-gray-700">
            ตัวอย่างรถบังคับอัจฉริยะ Diddy
          </Heading>
          <div className="flex flex-col sm:flex-row justify-around items-center gap-4">
            <div className="w-full sm:w-1/3 flex flex-col items-center">
              <img
                src="/images/4.jpg"
                alt="ตัวอย่างรถ Diddy มุมมองด้านหน้า"
                className="rounded-lg shadow-lg object-contain max-h-60 w-auto hover:scale-105 transition-transform duration-300"
              />
              <Text as="p" size="2" className="mt-2 text-center text-gray-600">
                มุมมองด้านหน้าของ Diddy
              </Text>
            </div>
            <div className="w-full sm:w-1/3 flex flex-col items-center">
              <img
                src="/images/3.jpg"
                alt="ตัวอย่างรถ Diddy มุมมองด้านข้าง"
                className="rounded-lg shadow-lg object-contain max-h-60 w-auto hover:scale-105 transition-transform duration-300"
              />
              <Text as="p" size="2" className="mt-2 text-center text-gray-600">
                Diddy กับเซ็นเซอร์ด้านหน้า
              </Text>
            </div>
            <div className="w-full sm:w-1/3 flex flex-col items-center">
              <img
                src="/images/1.jpg"
                alt="ตัวอย่างรถ Diddy ขณะใช้งาน"
                className="rounded-lg shadow-lg object-contain max-h-60 w-auto hover:scale-105 transition-transform duration-300"
              />
              <Text as="p" size="2" className="mt-2 text-center text-gray-600">
                Diddy พร้อมลุย!
              </Text>
            </div>
          </div>
          <Text as="p" size="3" className="mt-6 text-center text-gray-700">
            นี่คือภาพตัวอย่างของรถ Diddy ที่คุณจะได้สัมผัสประสบการณ์การขับขี่สุดล้ำ!
          </Text>
        </Card>
      </div> {/* ปิด div ของ flex-grow (ส่วนเนื้อหาหลัก) */}

      {/* ส่วนท้าย (Footer) ที่จะมีปุ่มและ Copyright */}
      <footer className="w-full p-4 md:p-8 mt-auto bg-gray-100 dark:bg-gray-800"> {/* <--- เพิ่ม mt-auto */}
        {/* ปุ่มไปที่หน้าควบคุม */}
        <div className="flex flex-col items-center">
          <Text className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">พร้อมที่จะควบคุม Diddy แล้วหรือยัง?</Text>
          <div className="relative w-full max-w-[250px] mx-auto h-[100px]">
            <div
              className={`absolute top-1/2 -translate-y-1/2 text-6xl transition-transform duration-[1000ms] ${isDriving ? "translate-x-[250px] translate-y-[-45px]" : "translate-x-[-50px] translate-y-[-45px]"}`}
            >
              <FaCarSide className="text-red-600 drop-shadow-lg hover:text-red-700 cursor-pointer" onClick={triggerDriveRedirect} />
            </div>
            <Button
              size="4"
              className="font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md w-full transition-all duration-300 "
              onClick={triggerDriveRedirect}
              disabled={isDriving}
            >
              ลองขับตอนนี้!!
            </Button>
          </div>
        </div>

        <Text className="text-xs text-gray-500 dark:text-gray-400 text-center mt-8">Copyright ©2025 Diddy</Text>
      </footer>
    </div> // ปิด div หลัก (min-h-screen)
  );
};

export default ManualFeature;