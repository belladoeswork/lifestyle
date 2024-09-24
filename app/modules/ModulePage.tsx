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
  content: string;
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
      {/* <div className="p-4"> */}
              <UserButton />
              {/* </div> */}
        <CardHeader className="pb-9">
        <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">

        <div className="flex items-center custom-icon  ml-1 mr-5">
            {moduleIcon}
            </div>
              {/* <div className="ml-2"> */}
              <div>

              <CardTitle className=" ml-4 custom-moduletitle pt-0">{module}</CardTitle>
              {/* <CardTitle className=" ml-2 custom-moduletitle">Distance</CardTitle>
              <CardTitle className=" ml-2 custom-moduletitle">Self-talk</CardTitle> */}
              </div>
              </div>

          </div>
          <Progress value={progress} className="w-full custom-progress mb-6" />
        </CardHeader>
      {/* </Card> */}

      {/* <Card> */}
        <CardHeader className="pt-0">
          <CardTitle className=' custom-cardtitle'>{title}</CardTitle>
          {Array.isArray(subtitle) ? (
    subtitle.map((paragraph, index) => (
      <p className="text-muted-foreground" key={index}>{paragraph}</p>
    ))
  ) : (
    <p className="text-muted-foreground">{subtitle}</p> // single string case
  )}
          {/* <p className="text-muted-foreground">{subtitle}</p> */}
        </CardHeader>
        <CardContent className="custom-card-content">
        {Array.isArray(content) ? (
    content.map((paragraph, index) => (
      <p key={index}>{replacePlaceholders( paragraph)}</p>
    ))
  ) : (
    <p>{replacePlaceholders( content)}</p> // Handle single string case
  )}
          {/* <p>{content}</p> */}
        </CardContent>
        <div className="flex justify-between mt-4">
      <Button 
          onClick={onPreviousPage}
            disabled={isFirstPage}
            className="custom-button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          
        </Button>
      <Button 
        // className="self-end mt-4"
        onClick={onNextPage}
                  // disabled={isLastPage}
            // disabled={isLastPage || showModuleCompleted}

            className="custom-button "


      >
              <ArrowRight className="mr-2 h-4 w-4" />
              {/* {isLastPage ? "Completed" : "Next"} */}
              </Button>
              </div>
      </Card>
      {/* <div className="flex justify-between mt-4">
      <Button 
          onClick={onPreviousPage}
          disabled={isFirstPage}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
      <Button 
        // className="self-end mt-4"
        onClick={onNextPage}
                  // disabled={isLastPage}
                  disabled={isLastPage ||showModuleCompleted}

      >
              <ArrowRight className="mr-2 h-4 w-4" />
              {/* {isLastPage ? "Completed" : "Next"} 
      // }Next
      //         </Button>
      //         </div> */ }
    </div>
  );
};

export default ModulePage;