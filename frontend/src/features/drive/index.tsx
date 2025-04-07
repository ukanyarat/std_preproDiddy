import React, { useState, useEffect } from 'react';
import { Mic, MicOff, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Power } from 'lucide-react';
import { Text } from '@radix-ui/themes';
import { CiWarning } from "react-icons/ci";

const IoTCarControl = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [lastCommand, setLastCommand] = useState('');
  const [activeButton, setActiveButton] = useState<string | null>(null);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isPoweredOn) return;
      else if (event.key === 'd' || event.key === 'ArrowRight' || event.key === 'ก') {
        handleControl('right');
        return;
      }
      else if (event.key === 's' || event.key === 'ArrowDown' || event.key === 'ห') {
        handleControl('backward');
        return;
      }
      else if (event.key === 'a' || event.key === 'ArrowLeft' || event.key === 'ฟ') {
        handleControl('left');
        return;
      }
      else if (event.key === 'w' || event.key === 'ArrowUp' || event.key === 'ไ') {
        handleControl('forward');
        return;
      }
      else {
        handleControl('stop');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPoweredOn]);


  const handleControl = (direction: string) => {
    setLastCommand(direction);
    setActiveButton(direction);
  };


  const toggleVoiceControl = () => {
    setIsVoiceActive(!isVoiceActive);
    setLastCommand(isVoiceActive ? 'กำลังฟังคำสั่งด้วยเสียง...' : 'ปิดการควบคุมด้วยเสียง');
  };

  const togglePower = () => {
    setIsPoweredOn(!isPoweredOn);
    setLastCommand(isPoweredOn ? 'ปิดเครื่อง...' : 'เปิดเครื่อง...');
    if (!isPoweredOn) {

    }
    setActiveButton(null);
    setLastCommand('');
  };

  return (
    <div className=" w-full flex flex-col items-center justify-center mt-4 h-full" >
      {isPoweredOn === false ? (
        <p className="text-sm text-gray-900 m-6 flex items-center">
          <CiWarning className="text-red-500 mr-2" />
          ไม่สามารถควบคุมได้ กรุณาเปิดเครื่อง
        </p>
      ) : isVoiceActive === false ? (
        <p className="text-sm text-gray-900 m-6">กำลังฟังคำสั่งด้วยเสียง...</p>
      ) : (
        <p className="text-sm text-gray-900 m-6">ไมค์ถูกปิดการใช้งานอยู่</p>
      )}
      {/* ส่วนควบคุมทิศทาง */}
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={() => handleControl('forward')}
          disabled={!isPoweredOn}
          className={`h-20 w-20 rounded-lg flex items-center justify-center ${activeButton === 'forward' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          <ArrowUp size={32} />
        </button>

        <div className="flex space-x-4">
          <button
            onClick={() => handleControl('left')}
            disabled={!isPoweredOn}
            className={`h-20 w-20 rounded-lg flex items-center justify-center ${activeButton === 'left' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            <ArrowLeft size={32} />
          </button>

          <button
            onClick={() => handleControl('stop')}
            disabled={!isPoweredOn}
            className={`h-20 w-20 rounded-lg flex items-center justify-center ${activeButton === 'stop' ? 'bg-green-600' : 'bg-red-600 hover:bg-red-700'
              }`}
          >
            STOP
          </button>

          <button
            onClick={() => handleControl('right')}
            disabled={!isPoweredOn}
            className={`h-20 w-20 rounded-lg flex items-center justify-center ${activeButton === 'right' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            <ArrowRight size={32} />
          </button>
        </div>

        <button
          onClick={() => handleControl('backward')}
          disabled={!isPoweredOn}
          className={`h-20 w-20 rounded-lg flex items-center justify-center ${activeButton === 'backward' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          <ArrowDown size={32} />
        </button>
      </div>

      {/* ปุ่มควบคุมระบบ */}
      <div className="flex space-x-4 mt-20">
        <button
          onClick={toggleVoiceControl}
          disabled={!isPoweredOn}
          className={`p-4 rounded-full ${isVoiceActive ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-500 hover:bg-gray-600'
            }`}
        >
          {isVoiceActive ? <MicOff size={24} /> : <Mic size={24} />}
        </button>

        <button
          onClick={togglePower}
          className={`p-4 rounded-full ${isPoweredOn ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-600'
            }`}
        >
          <Power size={24} />
        </button>
      </div>

      {/* แสดงคำสั่งล่าสุด */}
      {isPoweredOn ? (
        <div className="bg-gray-900 p-2 mt-6 text-center border-t border-gray-700 w-full">
          <p className="text-sm text-gray-300">คำสั่งล่าสุด : {lastCommand || 'None'}</p>
        </div>
      ) : (
        <div className="bg-gray-900 p-2 mt-6 text-center border-t border-gray-700 w-full">
        <p className="text-sm text-gray-300">ปิดการควบคุมอยู่</p>
      </div>
      )}
      <Text className="text-xs text-gray-200 text-center mt-6">Copyright ©2025 Diddy</Text>

    </div>
  );
};

export default IoTCarControl;
