"use client";

import React from 'react';
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { UserButton } from '@clerk/nextjs';


interface ModulePageProps {
  module: string;
  moduleIcon: React.ReactNode;
  title: string;
  subtitle: string;
  showWelcome: boolean;
  setShowWelcome: (show: boolean) => void;
  onNextPage: () => void;
    isLastPage: boolean;
    onPreviousPage: () => void;
    isFirstPage: boolean;
    progress: number;
    showModuleCompleted: boolean;
    onNextModule: () => void;
  isLastModule: boolean;
  onStartOver: () => void;
  username: string;
  content: string | React.ReactNode;

}

// const ModulePage: React.FC<ModulePageProps> = ({ module, moduleIcon, title, subtitle, content,  showWelcome,
//     setShowWelcome, onNextPage,
//     isLastPage, onPreviousPage,
//     isFirstPage,
//     progress,
//     showModuleCompleted,
//     onNextModule,
//     isLastModule}) => {
  const ModulePage: React.FC<ModulePageProps> = ({ module, moduleIcon, title, subtitle, content,  showWelcome,
    setShowWelcome, onNextPage,
    onPreviousPage,
    isFirstPage,
    progress,
    showModuleCompleted,
    onNextModule,
    isLastModule,
    onStartOver, username }) => {
    
      const replacePlaceholders = (text: string) => {
        return text.replace(/{{userName}}/g, username || 'User');
      };
//   const [currentPage, setCurrentPage] = useState(0);
//   const [showPopup, setShowPopup] = useState(true);

//   const progress = ((currentPage + 1) / content.length) * 100;

//   const handleNextPage = () => {
//     if (currentPage < content.length - 1) {
//       setCurrentPage(currentPage + 1);
//     }
  //   };
  
  // const replacePlaceholders = (text: string | string[], placeholders: { [key: string]: string }) => {
  //   const replaceText = (str: string) => {
  //     return Object.keys(placeholders).reduce((acc, key) => {
  //       return acc.replace(new RegExp(`{{${key}}}`, 'g'), placeholders[key]);
  //     }, str);
  //   };

  //   if (Array.isArray(text)) {
  //     return text.map(replaceText);
  //   }
  //   return replaceText(text);
  // };

  return (
    <div className="flex flex-col min-h-screen p-1 !border-0 !mb-0">
      <Dialog open={showWelcome} onOpenChange={setShowWelcome} >
        <DialogContent  >
          <DialogHeader>
            <DialogTitle>Your Program is ready !</DialogTitle>
            <DialogDescription>
             Litle steps to change your life
            </DialogDescription>
          </DialogHeader>
          <Button  className='custom-start w-40 mx-auto' size="sm" onClick={() => setShowWelcome(false)}>Start</Button>
        </DialogContent>
          </Dialog>
          
          <Dialog open={showModuleCompleted} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Module Completed!</DialogTitle>
            <DialogDescription>
              Congratulations !
            </DialogDescription>
          </DialogHeader>
          {!isLastModule ? (
            <Button className='custom-start w-40 mx-auto' size="sm" onClick={onNextModule}>Next Module</Button>
          ) : (
            <Button className='custom-start w-40 mx-auto' size="sm" onClick={onStartOver}>Start Over</Button>
          )}
        </DialogContent>
      </Dialog>

      <Card className="min-h-screen mb-3 p-4 !border-0 !mb-0 rounded-none">
        <CardHeader className="pb-9">
        <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
        <div className="flex items-center custom-icon  ml-1 mr-5">
            {moduleIcon}
            </div>
              <div>
                <CardTitle className=" ml-4 custom-moduletitle pt-0">{module}</CardTitle>
              </div>
            </div>
            <div className="ml-auto">
      <UserButton />
    </div>
          </div>
          <Progress value={progress} className="w-full custom-progress mb-6" />
        </CardHeader>
        <CardHeader className="pt-0">
          <CardTitle className=' custom-cardtitle'>{title}</CardTitle>
          {Array.isArray(subtitle) ? (
    subtitle.map((paragraph, index) => (
      <p className="text-muted-foreground" key={index}>{paragraph}</p>
    ))
  ) : (
    <p className="text-muted-foreground">{subtitle}</p> 
  )}
        </CardHeader>
              <CardContent className="custom-card-content">
        {typeof content === 'string' ? (
          Array.isArray(content) ? (
            content.map((paragraph, index) => (
              <p key={index}>{replacePlaceholders(paragraph)}</p>
            ))
          ) : (
            <p>{replacePlaceholders(content)}</p>
          )
        ) : (
          content 
        )}
      </CardContent>
        <div className="flex justify-between mt-4">
      <Button 
          onClick={onPreviousPage}
            disabled={isFirstPage}
            className="custom-button">
          <ArrowLeft />        
        </Button>
      <Button onClick={onNextPage} className="custom-button ">
              <ArrowRight />
              </Button>
              </div>
      </Card>
    </div>
  );
};

export default ModulePage;