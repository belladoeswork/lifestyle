
import { useState } from 'react';
import { Slider } from "@nextui-org/react";

const IconSlider = () => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value: number | number[]) => {
    setSliderValue(Array.isArray(value) ? value[0] : value);
  };

  // Updated icon mapping with correct typing for TypeScript
  const iconsMap: Record<number, string[]> = {
    0: ['🙎'], // Icons for 0 '🌱', '🌿', 
    25: ['🙎', '🧑‍🤝‍🧑'], // Icons for 25
    50: ['🙎', '🧑‍🤝‍🧑', '✈️'], // Icons for 50
      75: ['🙎', '🧑‍🤝‍🧑', '✈️', '🌳'], // Icons for 75
      100: ['🙎', '🧑‍🤝‍🧑', '✈️', '🌳', '☁️'], // Icons for 100
  };

  const visibleIcons = iconsMap[sliderValue] || [];

  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      {/* Icon Display */}
      <div className="flex items-center justify-center w-64 h-64 border-2 border-gray-300 rounded-lg p-4">
        {visibleIcons.map((icon: string, index: number) => (
          <div key={index} className="mx-2 text-9xl">
            {icon}
          </div>
        ))}
      </div>

      {/* Slider */}
      <div className="w-full max-w-md">
        <div className="relative">
          {/* Slider Track */}
          <div className="absolute top-1/2 left-0 w-full h-2 bg-yellow-100 rounded-full -translate-y-1/2">
            <div
              className="absolute top-0 left-0 h-full bg-yellow-300 rounded-full"
              style={{ width: `${(sliderValue / 100) * 100}%` }}
            ></div>
          </div>

          {/* Slider Component */}
          <Slider
            step={25} 
            maxValue={100} 
            minValue={0} 
            defaultValue={[0]}
            showSteps={true}
            showTooltip={false}
            showOutline={true}
            disableThumbScale={true}
            value={[sliderValue]}
            onChange={handleSliderChange}
         

            classNames={{
                base: "max-w-md",
                filler: "bg-gradient-to-r from-primary-500 to-secondary-400",
                labelWrapper: "mb-2",
                label: "font-medium text-default-700 text-medium",
                value: "font-medium text-default-500 text-small",
                thumb: [
                  "transition-size",
                  "bg-gradient-to-r from-secondary-400 to-primary-500",
                  "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                  "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6"
                ],
                step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50"
            }}
            tooltipProps={{
                offset: 10,
                placement: "bottom",
                classNames: {
                  base: [
                    // arrow color
                    "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
                  ],
                  content: [
                    "py-2 shadow-xl",
                    "text-white bg-gradient-to-r from-secondary-400 to-primary-500",
                  ],
                },
              }}
          />

          {/* Custom Steps Display */}

        </div>

        {/* Labels for Slider */}
        <div className="flex justify-between mt-2">
          <span className="text-sm">Set 1</span>
          <span className="text-sm">Set 2</span>
          <span className="text-sm">Set 3</span>
          <span className="text-sm">Set 4</span>
        </div>
      </div>
    </div>
  );
};

export default IconSlider;
