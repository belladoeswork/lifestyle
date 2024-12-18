// import { useState } from "react";
// import { Slider } from "@nextui-org/react";

// const IconSlider = () => {
//   const [sliderValue, setSliderValue] = useState(0);

//   const handleSliderChange = (value: number | number[]) => {
//     setSliderValue(Array.isArray(value) ? value[0] : value);
//   };

//   const iconsMap: Record<number, string[]> = {
//     0: ["🙎"],
//     25: ["🙎", "🧑‍🤝‍🧑"],
//     50: ["🙎", "🧑‍🤝‍🧑", "✈️"],
//     75: ["🙎", "🧑‍🤝‍🧑", "✈️", "🌳"],
//   };

//   const visibleIcons = iconsMap[sliderValue] || [];

//   return (
//     <div className="flex items-center justify-center w-full mb-8">
//       <div className="w-64 h-64 p-4 overflow-auto flex flex-wrap items-center justify-center">
//         {visibleIcons.map((icon: string, index: number) => (
//           <div
//             key={index}
//             className={`mx-2 ${
//               index === visibleIcons.length - 1 ? "text-9xl" : "text-3xl"
//             } transition-all duration-500 ease-in-out`}
//           >
//             {icon}
//           </div>
//         ))}
//       </div>
//       <div className="h-64 flex items-center ml-4">
//         <Slider
//           step={25}
//           maxValue={75}
//           minValue={0}
//           defaultValue={0}
//           orientation="vertical"
//           showSteps={true}
//           showTooltip={false}
//           showOutline={true}
//           disableThumbScale={true}
//           value={sliderValue}
//           onChange={handleSliderChange}
//           className="max-w-md"
//           color="warning"
//           classNames={{
//             base: "w-2 relative z-10",
//             track: " !bg-[#FEECBA] h-full rounded-full",
//             filler: "!bg-[#FEECBA] h-full rounded-full",
//             thumb: "w-6 h-6 !bg-[#FEECBA] shadow-md",
//             step: "data-[in-range=true]:!bg-[#FEECBA]",
//             mark: "hidden",
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default IconSlider;




import React, { useState} from "react";
import { useRive, Layout, Fit, Alignment} from "@rive-app/react-canvas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";


const IconSlider = () => {
  const [userText, setUserText] = useState("");
  const [showInput, setShowInput] = useState(true);

  const TEXT_RUNS = ['user_input1', 'user_input2', 'user_input3', 'user_input4'];

  const { rive, RiveComponent } = useRive({
    src: "/animations/z38_slider_backup2.riv",
    artboard: "Artboard",
    stateMachines: "State Machine 1",
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center
    }),
    autoplay: true,
    onStateChange: (event) => {
      if (userText) {
        updateAllTextRuns(userText);
      }
    },
  });

  const updateAllTextRuns = (text: string) => {
    if (!rive) return;

    TEXT_RUNS.forEach((runName) => {
      try {
        rive.setTextRunValueAtPath(
          runName,
          text,
          "Slider_Artboard"
        );
      } catch (error) {
        console.error(`Failed to update ${runName}:`, error);
        try {
          rive.setTextRunValue(runName, text);
        } catch (fallbackError) {
          console.error(`Fallback update failed for ${runName}:`, fallbackError);
        }
      }
    });
  };

  // input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setUserText(newText);
  };

  // submit
  const handleSubmit = () => {
    if (userText.trim()) {
      updateAllTextRuns(userText);
      setUserText("");
      setShowInput(false);
    }
  };


  return (
    <div className="relative w-full h-[60vh] flex  flex-col">
       <div className="relative flex-1 min-h-0"> 
      <div className="absolute inset-0">
        <RiveComponent />
      </div>
      
      {showInput && (
          <div className="absolute top-[58%] left-1/2 -translate-x-1/2 w-full px-4">
            <div className="relative max-w-[260px] mx-auto flex items-center bg-white/90 backdrop-blur-sm rounded-full border-2 border-purple-200 overflow-hidden">

          <Input
            type="text"
            value={userText}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
            placeholder="Enter text here"
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent h-8 text-sm px-3"
            />
          <Button
            onClick={handleSubmit}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-transparent hover:bg-purple-50 p-1.5 h-6 w-6 rounded-full"
            >
            <Send className="h-3 w-3 text-purple-400" />
          </Button>
        </div>
        </div>
        )}
      </div>
   </div>
  );
};

export default IconSlider;


