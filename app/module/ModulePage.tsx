"use client";

import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Pointer, Volume2 } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion"
import { useSwipeable } from "react-swipeable"
import IconSlider from "@/components/iconSlider";
import RiveAnimation from "@/components/riveAnim";


export interface ModulePageProps {
  module: string;
  moduleIcon: React.ReactNode;
  title: string;
  subtitle: string | string[];
  showWelcome: boolean;
  showOverlay: boolean;
  handleOverlayDismiss: () => void;
  setShowWelcome: (show: boolean) => void;
  onNextPage: () => void;
  isLastPage: boolean;
  onPreviousPage: () => void;
  isFirstPage: boolean;
  progress: number;
  onNextModule: () => void;
  isLastModule: boolean;
  onStartOver: () => void;
  username: string;
  content: string | string[] | React.ReactNode;
  showModuleCompleted: boolean;
  setShowModuleCompleted: (show: boolean) => void;
  interactiveElement?: "IconSlider" | "RiveAnimation" | null;
  showTextToSpeech?: boolean

}

const ModulePage: React.FC<ModulePageProps> = ({
  module,
  moduleIcon,
  title,
  subtitle,
  content,
  showWelcome,
  setShowWelcome,
  showOverlay,
  handleOverlayDismiss,
  onNextPage,
  onPreviousPage,
  isFirstPage,
  progress,
  onNextModule,
  isLastModule,
  onStartOver,
  username,
  showModuleCompleted,
  setShowModuleCompleted,
  // showTextToSpeech = true,
}) => {
  const replacePlaceholders = (text: string) => {
    return text.replace(/{{userName}}/g, username || "User");
  };

  const renderContent = (content: string | string[] | React.ReactNode) => {
    if (typeof content === "string") {
      return <p>{replacePlaceholders(content)}</p>;
    } else if (Array.isArray(content)) {
      return content.map((paragraph, index) => (
        <p key={index}>{replacePlaceholders(paragraph)}</p>
      ));
    } else {
      return content;
    }
  };

  const [isSpeaking, setIsSpeaking] = useState(false)
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null)


  const contentRef = useRef<HTMLDivElement>(null)

  const initSpeechSynthesis = useCallback(() => {
    if (typeof window !== "undefined" && !speechSynthesisRef.current) {
      speechSynthesisRef.current = window.speechSynthesis
    }
  }, [])

  const handleSpeak = useCallback(() => {
    initSpeechSynthesis()
    
    if (!speechSynthesisRef.current || !contentRef.current) return

    if (isSpeaking) {
      speechSynthesisRef.current.cancel()
      setIsSpeaking(false)
      return
    }

    const text = contentRef.current.textContent || ""
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onend = () => setIsSpeaking(false)
    
    speechSynthesisRef.current.speak(utterance)
    setIsSpeaking(true)
  }, [isSpeaking, initSpeechSynthesis])

  const swipeHandlers = useSwipeable({
    onSwipedLeft: onNextPage,
    onSwipedRight: onPreviousPage,
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  // const renderInteractiveElement = () => {
  //   switch (interactiveElement) {
  //     case "IconSlider":
  //       return <IconSlider />
  //     case "RiveAnimation":
  //       return <RiveAnimation />
  //     default:
  //       return null
  //   }
  // }


  return (
    <div {...swipeHandlers} className="flex flex-col min-h-screen p-1 !border-0 !mb-0">
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Program is ready !</DialogTitle>
            <DialogDescription>
              Litle steps to change your life
            </DialogDescription>
          </DialogHeader>
          <Button
            className="custom-start w-40 mx-auto"
            size="sm"
            onClick={() => setShowWelcome(false)}
          >
            Start
          </Button>
        </DialogContent>
      </Dialog>

      {showOverlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50"
          onClick={handleOverlayDismiss}
        >
          <div className="relative flex justify-center items-center w-full h-full">
            <div className="pointer-container animate-swipeLeft ">
              <Pointer className="text-white h-12 w-12" />
              <div className="trailing-effect absolute top-6 left-16 w-16 h-2 bg-gradient-to-r from-white to-transparent"></div>
            </div>
          </div>
          <div className="flex flex-col items-center absolute top-1/3">
            <p className="text-white mt-16">Swipe</p>
          </div>
          <div className="flex flex-col items-center absolute top-1/2">
            <p className="text-white mt-12"> - Tap anywhere to dismiss - </p>
          </div>
        </div>
      )}

      <Dialog open={showModuleCompleted} onOpenChange={setShowModuleCompleted}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Module Completed!</DialogTitle>
            <DialogDescription>Congratulations !</DialogDescription>
          </DialogHeader>
          {!isLastModule ? (
            <Button
              className="custom-start w-40 mx-auto"
              size="sm"
              onClick={() => {
                setShowModuleCompleted(false);
                onNextModule();
              }}
            >
              Next Module
            </Button>
          ) : (
            <Button
              className="custom-start w-40 mx-auto"
              size="sm"
              onClick={onStartOver}
            >
              Start Over
            </Button>
          )}
        </DialogContent>
      </Dialog>

      <Card  className="min-h-screen mb-3 p-4 !border-0 !mb-0 rounded-none">
        <CardHeader className="pb-7 pt-0 -mt-2 ">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="flex items-center custom-icon  ml-1 mr-5">
                {moduleIcon}
              </div>
              <div>
                <CardTitle className=" ml-4 custom-moduletitle pt-0">
                  {module}
                </CardTitle>
              </div>
            </div>
            <div className="ml-auto">
              <UserButton />
            </div>
          </div>
          <Progress value={progress} className="w-full custom-progress mb-6" />
        </CardHeader>
        <CardHeader className="pt-0">
          <CardTitle className=" custom-cardtitle">{title}</CardTitle>
          {Array.isArray(subtitle) ? (
            subtitle.map((paragraph, index) => (
              <p className="text-muted-foreground" key={index}>
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-muted-foreground">{subtitle}</p>
          )}
        </CardHeader>
        <CardContent className="custom-card-content">
          {renderContent(content)}
        </CardContent>
        <div className="fixed bottom-4 left-1 -ml-0">
          <Button
            onClick={onPreviousPage}
            disabled={isFirstPage}
            className="custom-button"
          >
            <ArrowLeft />
          </Button>
        </div>

        <div className="fixed bottom-4 right-1 -mr-0">
          <Button onClick={onNextPage} className="custom-button ">
            <ArrowRight />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ModulePage;
