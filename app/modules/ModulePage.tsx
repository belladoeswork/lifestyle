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
}

const ModulePage: React.FC<ModulePageProps> = ({ module, moduleIcon, title, subtitle, content,  showWelcome,
    setShowWelcome, onNextPage,
    isLastPage, onPreviousPage,
    isFirstPage,
    progress,
    showModuleCompleted,
    onNextModule,
    isLastModule}) => {
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
    <div className="flex flex-col min-h-screen p-1">
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Program is ready!</DialogTitle>
            <DialogDescription>
              Just a few modules a day can change your life
            </DialogDescription>
          </DialogHeader>
          <Button  className='custom-button ' onClick={() => setShowWelcome(false)}>Get Started</Button>
        </DialogContent>
          </Dialog>
          
          <Dialog open={showModuleCompleted} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Module Completed!</DialogTitle>
            <DialogDescription>
              Congratulations on completing this module!
            </DialogDescription>
          </DialogHeader>
          {!isLastModule ? (
            <Button onClick={onNextModule}>Go to Next Module</Button>
          ) : (
            <Button onClick={() => {}}>Finish Course</Button>
          )}
        </DialogContent>
      </Dialog>


      <Card className="mb-3 p-4 b-0">
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
      <p key={index}>{paragraph}</p>
    ))
  ) : (
    <p>{content}</p> // Handle single string case
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
            disabled={isLastPage || showModuleCompleted}
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