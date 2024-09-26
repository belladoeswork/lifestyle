import React, { useState, useEffect } from 'react';
 import { Slider } from "@/components/ui/slider"
import { PersonStanding, Users, Plane, Trees } from 'lucide-react';
// import {Slider} from "@nextui-org/react";


const ZoomOutExercise = () => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [visibleIcons, setVisibleIcons] = useState<JSX.Element[]>([]);

  useEffect(() => {
    updateVisibleIcons(sliderValue);
  }, [sliderValue]);

  const updateVisibleIcons = (value: number) => {
    const icons: JSX.Element[] = [];
    if (value >= 0) icons.push(<PersonStanding key="person" />);
    if (value >= 25) icons.push(<Users key="users" />);
    if (value >= 50) icons.push(<Plane key="plane" />);
    if (value >= 75) icons.push(<Trees key="tree" />);
    setVisibleIcons(icons);
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
    triggerHapticFeedback();
  };

  const triggerHapticFeedback = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };
// className="min-h-screen mb-3 p-4 !border-0 !mb-0 rounded-none"
//   return (
//     <div className="flex flex-col items-center space-y-8 p-4">
//       <div className="flex items-center p-6 mb-3 border-3 space-x-4">
//         {visibleIcons}
//       </div>
//       <div className="flex items-center w-full max-w-md">
//         <span className="mr-4">Close</span>
//         <Slider
//           min={0}
//           max={100}
//           step={1}
//           value={[sliderValue]}
//           onValueChange={handleSliderChange}
//           className="flex-grow"
//         />
//         <span className="ml-4">Distant</span>
//       </div>
//     </div>
//   );
    // };
    
    return (
        <div className="flex flex-col items-center space-y-8 p-4">
          <div className="flex items-center justify-center w-64 h-64 border-2 border-gray-300 rounded-lg p-4">
            {visibleIcons.map((icon, index) => (
              <div key={index} className="mx-2">
                {icon}
              </div>
            ))}
          </div>
          <div className="w-full max-w-md">
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-2 bg-yellow-100 rounded-full -translate-y-1/2">
                <div 
                  className="absolute top-0 left-0 h-full bg-yellow-300 rounded-full" 
                  style={{ width: `${(sliderValue / 75) * 100}%` }}
                ></div>
              </div>
              <Slider
                min={0}
                max={75}
                step={25}
                value={[sliderValue]}
                onValueChange={handleSliderChange}
                className="custom-slider"
              />
              <div className="absolute top-1/2 left-0 w-full flex justify-between -mt-2 pointer-events-none">
                {[0, 25, 50, 75].map((stop, index) => (
                  <div 
                    key={stop} 
                    className={`bg-white border-2 rounded-full ${sliderValue >= stop ? 'border-yellow-300 bg-yellow-300' : 'border-yellow-200'}`}
                    style={{
                      width: `${12 + index * 4}px`,
                      height: `${12 + index * 4}px`,
                      marginTop: `-${(index * 2)}px`
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm">Close</span>
              <span className="text-sm">Distant</span>
            </div>
          </div>
        </div>
      );
    };

export default ZoomOutExercise;