import React, { useState, useEffect } from 'react';
import { Text } from '@radix-ui/themes';


const ManualFeature = () => {

  return (
    <>
      <div className="flex flex-col items-center">
        <Text className="text-3xl font-bold text-gray-700 text-center mb-4 ">คู่มือการใช้งาน</Text>
      </div>

      <div>
        <Text className="text-xl text-gray-700 text-center mb-4">🤖การสั่งการ🤖</Text>

      </div>
      <div>
        <Text className="text-xl text-gray-700 text-center mb-4">✅การเช็คสถานะ✅</Text>

      </div>
      <Text className="text-xl text-gray-700 text-center mb-4">🚗การดูแลรถ🚗</Text>
      <div className=" flex-col items-center space-y-2  grid grid-cols-3 m-4">
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
        <div>
          <img
            src="/images/5555.png"
            alt=""
            className="justify-center "
          />
          <Text className="text-base text-gray-700 text-center mb-4">1.</Text>
        </div>
      </div>

    </>
  );
};

export default ManualFeature;
