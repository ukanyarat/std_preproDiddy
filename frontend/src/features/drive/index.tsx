import React, { useState, useEffect } from 'react';
import { Mic, MicOff, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Power } from 'lucide-react';

const IoTCarControl = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [lastCommand, setLastCommand] = useState('');
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // ตรวจสอบว่าเป็นอุปกรณ์มือถือหรือไม่
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // ฟังก์ชันควบคุมรถ
  const handleControl = (direction: string) => {
    setLastCommand(direction);
    setActiveButton(direction); // ตั้งค่าปุ่มที่ถูกกด

    // จำลองการเปลี่ยนความเร็ว
    if (direction === 'forward') {
      setSpeed(prev => Math.min(prev + 10, 100));
    } else if (direction === 'backward') {
      setSpeed(prev => Math.max(prev - 5, 0));
    }

    // ตั้งค่า timeout เพื่อคืนสีปุ่มหลังจาก 500ms
    // setTimeout(() => setActiveButton(null), 500);
  };

  // เปิด/ปิดการควบคุมเสียง
  const toggleVoiceControl = () => {
    setIsVoiceActive(!isVoiceActive);
    setLastCommand(isVoiceActive ? 'Voice control deactivated' : 'Listening for voice commands...');
  };

  // เปิด/ปิดเครื่อง
  const togglePower = () => {
    setIsPoweredOn(!isPoweredOn);
    setLastCommand(isPoweredOn ? 'Shutting down...' : 'Powering up...');
    if (!isPoweredOn) {
      setSpeed(0);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      {/* ส่วนควบคุมทิศทาง */}
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={() => handleControl('forward')}
          className={`h-20 w-20 rounded-lg flex items-center justify-center ${
            activeButton === 'forward' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <ArrowUp size={32} />
        </button>

        <div className="flex space-x-4">
          <button
            onClick={() => handleControl('left')}
            className={`h-20 w-20 rounded-lg flex items-center justify-center ${
              activeButton === 'left' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <ArrowLeft size={32} />
          </button>

          <button
            onClick={() => handleControl('stop')}
            className={`h-20 w-20 rounded-lg flex items-center justify-center ${
              activeButton === 'stop' ? 'bg-green-600' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            STOP
          </button>

          <button
            onClick={() => handleControl('right')}
            className={`h-20 w-20 rounded-lg flex items-center justify-center ${
              activeButton === 'right' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <ArrowRight size={32} />
          </button>
        </div>

        <button
          onClick={() => handleControl('backward')}
          className={`h-20 w-20 rounded-lg flex items-center justify-center ${
            activeButton === 'backward' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <ArrowDown size={32} />
        </button>
      </div>

      {/* ปุ่มควบคุมระบบ */}
      <div className="flex space-x-4 mt-20">
        <button
          onClick={toggleVoiceControl}
          className={`p-4 rounded-full ${
            isVoiceActive ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-500 hover:bg-gray-600'
          }`}
        >
          {isVoiceActive ? <MicOff size={24} /> : <Mic size={24} />}
        </button>

        <button
          onClick={togglePower}
          className={`p-4 rounded-full ${
            isPoweredOn ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-600'
          }`}
        >
          <Power size={24} />
        </button>
      </div>

      {/* แสดงคำสั่งล่าสุด */}
      <div className="bg-gray-900 p-2 mt-6 text-center border-t border-gray-700 w-full">
        <p className="text-sm text-gray-300">Last command: {lastCommand || 'None'}</p>
      </div>
    </div>
  );
};

export default IoTCarControl;
