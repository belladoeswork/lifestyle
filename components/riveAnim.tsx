import React, { useState} from "react";
import { useRive, Layout, Fit, Alignment} from "@rive-app/react-canvas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const RiveAnimation = () => {
  const [userText, setUserText] = useState("");
  const [isFloating, setIsFloating] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const { rive, RiveComponent } = useRive({
      src: "/animations/z38_clouds_live.riv", 
    stateMachines: "State Machine 1",
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center
    }),
      autoplay: false,
  });
  

const handleSendThought = () => {
  if (userText.trim() && rive) {
    
    try {
      rive.setTextRunValue("user_input", userText);
      setIsFloating(true);
      setShowInput(false);
      
      rive.play();
      
      setTimeout(() => {
        setUserText("");
        setIsFloating(false);
        setIsCompleted(true);
        rive.setTextRunValue("user_input", ""); 
        rive.pause();
        rive.reset();
      }, 10000);
    } catch (error) {
      console.error("Error updating Rive text:", error);
    }
  }
};

return (
  <div className="relative w-full h-64 overflow-hidden">
    <div className="absolute inset-0 bg-[#46E9FF]">
      <RiveComponent />
    </div>
    
    {showInput && !isCompleted && (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="relative flex items-center w-48">
          <Input
            type="text"
            placeholder="What's on your mind?"
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            className="pr-7 bg-white backdrop-blur-sm rounded-sm text-sm"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendThought();
              }
            }}
          />
          <Button
            onClick={handleSendThought}
            className="absolute right-0 text-white  px-1.5 h-full"
            disabled={!userText.trim()}
          >
            <Send className="h-5 w-5 text-[#D6D0FD]" />
          </Button>
        </div>
      </div>
    )}
      {isCompleted && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="px-6 py-0 bg-white w-48 text-center">
            <span className="text-sm text-white-600">Well done! 🎉</span>
          </div>
        </div>
      )}
  </div>
);
};

export default RiveAnimation;

