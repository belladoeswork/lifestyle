
import { useState } from 'react';
import { Slider } from "@nextui-org/react";

const IconSlider = () => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value: number | number[]) => {
    setSliderValue(Array.isArray(value) ? value[0] : value);
  };

  const iconsMap: Record<number, string[]> = {
    0: ['🙎'],  
    25: ['🙎', '🧑‍🤝‍🧑'], 
    50: ['🙎', '🧑‍🤝‍🧑', '✈️'],
    75: ['🙎', '🧑‍🤝‍🧑', '✈️', '🌳'],
  };


  const visibleIcons = iconsMap[sliderValue] || [];

  return (
    <div className="flex items-center justify-center w-full mb-8">
      <div className="w-64 h-64 p-4 overflow-auto flex flex-wrap items-center justify-center">
        {visibleIcons.map((icon: string, index: number) => (
          <div key={index} className={`mx-2 ${index === visibleIcons.length - 1 ? 'text-9xl' : 'text-3xl'} transition-all duration-500 ease-in-out`}>
            {icon}
          </div>
        ))}
      </div>
      <div className="h-64 flex items-center ml-4">
          <Slider
            step={25}
            maxValue={75}
            minValue={0}
            defaultValue={0}
            orientation="vertical"
            showSteps={true}
            showTooltip={false}
            showOutline={true}
            disableThumbScale={true}
            value={sliderValue}
            onChange={handleSliderChange}
            className="max-w-md"
          color="warning"


            classNames={{
              base: "w-2 relative z-10",
              track: " !bg-[#FEECBA] h-full rounded-full",
              filler: "!bg-[#FEECBA] h-full rounded-full",
              thumb: "w-6 h-6 !bg-[#FEECBA] shadow-md",
              step: "data-[in-range=true]:!bg-[#FEECBA]",
              mark: "hidden"
            }}
          />
        </div>
    </div>
  );
};

export default IconSlider;
