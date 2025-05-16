import React, { useState, useEffect } from 'react';
import { Button, Grid, Table, Text } from '@radix-ui/themes';
import { FaCarSide } from "react-icons/fa";

const ManualFeature = () => {
  const [isDriving, setIsDriving] = useState(false);

  const handleClick = () => {
    setIsDriving(true);
    setTimeout(() => {
      handleToDrive();
    }, 1500);
  };

  const handleToDrive = () => {
    window.location.href = "/drive";
  };
  return (
    <div className='flex flex-col w-full space-y-4'>
      <div className="flex flex-col items-center space-y-4">
        <Text className="text-3xl font-boldtext-center mb-2 font-bold text-red-700">คู่มือการใช้งาน</Text>
      </div>
      {/* การสั่งการ */}
      <div className=" flex-col flex items-center space-y-4 w-full">
        <Text className="text-2xl font-bold text-gray-700 text-center  bg-red-50 w-full">🤖การสั่งการ🤖<br /></Text>
        <Text className="text-gray-700 text-center w-full font-bold text-lg">การสั่งการผ่านหน้าเว็บด้วยคีย์บอร์ด</Text>
        <div className="overflow-x-auto w-full flex justify-center pl-8">
          <table className="border-collapse border border-gray-400  text-center">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-300 p-2">Key</th>
                <th className="border border-gray-300 p-2">ทางเลือก</th>
                <th className="border border-gray-300 p-2">การกระทำ</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-300 p-2">w,ไ,⬆️</td><td className="border border-gray-300 p-2">ArrowUp, ไ</td><td className="border border-gray-300 p-2">เดินหน้า</td></tr>
              <tr><td className="border border-gray-300 p-2">s,ห,⬇️</td><td className="border border-gray-300 p-2">ArrowDown, ห</td><td className="border border-gray-300 p-2">ถอยหลัง</td></tr>
              <tr><td className="border border-gray-300 p-2">a,ฟ,⬅️</td><td className="border border-gray-300 p-2">ArrowLeft, ฟ</td><td className="border border-gray-300 p-2">ไปทางซ้าย</td></tr>
              <tr><td className="border border-gray-300 p-2">d,ก,➡️</td><td className="border border-gray-300 p-2">ArrowRight, ก</td><td className="border border-gray-300 p-2">ไปทางขวา</td></tr>
              <tr><td className="border border-gray-300 p-2">กดปุ่มอื่นๆ</td><td className="border border-gray-300 p-2">Esc, กดปุ่มอื่นๆ</td><td className="border border-gray-300 p-2">หยุด</td></tr>
            </tbody>
          </table>
        </div>

        <Text className="text-gray-700 text-center w-full font-bold text-lg">การสั่งการผ่านหน้าเว็บด้วยเสียง</Text>
        <Text className="text-gray-700 text-center w-full">พูดผ่านไมค์ที่หน้าควบคุม โดยการกดเปิดให้เป็นสีเขียวและพูดคำสั่งที่ต้องการ จากนั้นรอเวลาประมาลผล เมื่อรถได้ทำตามคำสั่งของคุณแล้วจึงสามารถพูดคำสั่งอื่นได้ <br />เมื่อไม่ต้องการใช้ ให้กดปุ่มปิดไมค์ ถ้าผิดแล้วจะมีสถานะเป็นสีแดง</Text>
        {/* ปุ่มไปที่หน้าควบคุม*/}
        <div className="relative w-full mt-4 max-w-[120px] mx-auto h-[80px]">
          <div
            className={`
            absolute top-1/2 -translate-y-1/2 text-5xl transition-transform duration-[1000ms]
            ${isDriving ? "translate-x-[120px] translate-y-[-35px]" : "translate-x-[-40px] translate-y-[-35px]"}
          `}
          >
            <FaCarSide className="text-red drop-shadow-lg hover:text-red-600" onClick={handleClick} />
          </div>
          <Button
            className=" text-xl font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md min-w-32 transition-all duration-300 "
            onClick={handleClick}
            disabled={isDriving}
          >
            เริ่มเลย!!
          </Button>
        </div>

      </div>
      {/* การเช็คสถานะ */}
      <div className=" flex-col flex items-center space-y-4 w-full">
        <Text className="text-2xl font-bold text-gray-700 text-center  bg-red-50 w-full">✅การเช็คสถานะ✅</Text>
        <Text className="text-gray-700 text-center w-full">ดูสถานะของรถที่แรงดันไฟ+++</Text>
      </div>
      {/* การดูแล */}
      <div className=" flex-col flex items-center space-y-4 w-full">
        <Text className="text-2xl font-bold text-black text-center  bg-red-50 w-full">🚗การดูแลรถ🚗</Text>


        <Grid
          columns={{ initial: "1", md: "1", sm: "3", lg: "3", xl: "3" }}
          gap="3"
          rows="repeat(1, auto)"
          width="auto"
        >
          <div>
            <img
              src="/images/5555.png"
              alt=""
              className="justify-center "
            />
            <Text className="text-base text-gray-700 text-center mb-4">1.เริ่มจากการเช็คสถานะของรถ โดยสามารถสังเกตสถานะของรถได้จากหน้าควบคุม</Text>
          </div>

          <div>
            <img
              src="/images/5555.png"
              alt=""
              className="justify-center "
            />
            <Text className="text-base text-gray-700 text-center mb-4">1.</Text>
          </div>
          <div>
            <img
              src="/images/5555.png"
              alt=""
              className="justify-center "
            />
            <Text className="text-base text-gray-700 text-center mb-4">1.</Text>
          </div>
          <div>
            <img
              src="/images/5555.png"
              alt=""
              className="justify-center "
            />
            <Text className="text-base text-gray-700 text-center mb-4">1.</Text>
          </div>
        </Grid>
        {/* ปุ่มไปที่หน้าควบคุม*/}
        <div className="relative w-full mt-4 max-w-[120px] mx-auto h-[80px]">
          <div
            className={`
            absolute top-1/2 -translate-y-1/2 text-5xl transition-transform duration-[1000ms]
            ${isDriving ? "translate-x-[120px] translate-y-[-35px]" : "translate-x-[-40px] translate-y-[-35px]"}
          `}
          >
            <FaCarSide className="text-red drop-shadow-lg hover:text-red-600" onClick={handleClick} />
          </div>
          <Button
            className=" text-xl font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md min-w-32 transition-all duration-300 "
            onClick={handleClick}
            disabled={isDriving}
          >
            เริ่มเลย!!
          </Button>
        </div>
      </div>
      <Text className="text-xs text-gray-200 text-center">Copyright ©2025 Diddy</Text>

    </div>
  );
};

export default ManualFeature;
