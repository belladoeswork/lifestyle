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
    src: "/animations/z38_slider2.riv",
    artboard: "Artboard",
    stateMachines: "State Machine 1",
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center
    }),
    autoplay: true,
    onStateChange: (event: any) => {
      console.log('State changed:', event);
      if (event.data?.state === 'Click_1' || event.data?.state === 'Click_2') {
        updateAllTextRuns(userText);
      }
    }
  });

  const updateAllTextRuns = (text: string) => {
    if (!rive) return;
    console.log('Attempting to update text with:', text);

    TEXT_RUNS.forEach((runName) => {
      try {
        console.log(`Trying to update ${runName}`);
        rive.setTextRunValue(runName, text);
        console.log(`Direct update succeeded for ${runName}`);
      } catch (directError) {
        try {
          rive.setTextRunValueAtPath(runName, text, "Slider_Artboard");
          console.log(`Path update succeeded for ${runName}`);
        } catch (pathError) {
          console.error(`All updates failed for ${runName}:`, { directError, pathError });
        }
      }
    });
  };

  // Handle submit
  const handleSubmit = () => {
    if (!userText.trim()) return;
    
    console.log('Submit clicked with text:', userText);
    
    try {
      // Try immediate text update first
      updateAllTextRuns(userText);
      
      // Then trigger state machine
      if (rive) {
        const inputs = rive.stateMachineInputs("State Machine 1");
        console.log('Available inputs:', inputs);
        
        const clickInput = inputs.find(i => i.name === "Click_1" || i.name === "Click_2");
        if (clickInput) {
          clickInput.fire();
          console.log('Fired click input:', clickInput.name);
        } else {
          console.log('No click input found');
        }
      }
      
      setUserText("");
      setShowInput(false);
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserText(e.target.value);
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