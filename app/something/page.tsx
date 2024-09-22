"use client";

// import Image from "next/image";
import '../globals.css';
import ModulePage from '../modules/ModulePage';
import { SignIn } from "@clerk/nextjs";
import { Book, Heart, Brain, Smile } from "lucide-react";
import { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";


const modules = [
  {
    name: "Distanced Self-Talk",
    icon: <Brain className="h-6 w-6" />,
    // title: "Learn how self Distance talk can help you",
    // subtitle: "Discover techniques to improve your self-reflection",
    // content: [
    //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    //   "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
    //   "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...",
    //   "Practical exercises to implement distanced self-talk in your daily life..."
    // ]
    pages: [
      {
        title: "Changing your perspective in self-talk can improve your mental health ",
        subtitle: "#mental health",
        content: ["Self-talk is your inner dialogue - the ongoing mental narrative you have with yourself throughout the day, reflecting your thoughts and beliefs.", "And by using a simple trick in your inner dialouge you can improve your mental health."," Research shows that using third-person self-talk can reduce anxiety and improve emotional regulation."]
      },
      {
        title: "The two ways of applying self Distanced Talk",
        subtitle: ["1. Visual self-distancing"," 2. Linguistic self-distancing"],
        content:[ " Visual self-distancing involves mentally viewing situations from an outside perspective, while linguistic self-distancing uses third-person language.","Both methods create psychological distance, allowing for more objective analysis of your thoughts and emotions."]
      },
      {
        title: "Exercise: Visual self-distancing",
        subtitle: "Recall a recent conflict. ",
        content: "Imagine floating above the scene, observing yourself and others involved. Notice details you might have missed in the moment and consider alternative viewpoints."
      },
      {
        title: "Exercise: Linguistic self-distancing",
        subtitle: "Next time you face a challenge, ask yourself advice using your name:",
        content: " {{userName}}, what are three possible solutions to this problem?Notice how this shifts your perspective and potentially reduces emotional charge."
      }
    ]
  }
  // {
  //   name: "Emotional Intelligence",
  //   icon: <Heart className="h-6 w-6" />,
  //   // title: "Developing Your Emotional Intelligence",
  //   // subtitle: "Enhance your ability to understand and manage emotions",
  //   // content: [
  //   //   "Introduction to emotional intelligence and its importance...",
  //   //   "Recognizing and understanding your own emotions...",
  //   //   "Developing empathy and understanding others' emotions...",
  //   //   "Applying emotional intelligence in various life situations..."
  //   // ]
  //   pages: [
  //     {
  //       title: "Developing Your Emotional Intelligence",
  //       subtitle: "An introduction to EQ",
  //       content: "Introduction to emotional intelligence and its importance...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  //     },
  //     {
  //       title: "Self-Awareness",
  //       subtitle: "Understanding your emotions",
  //       content: "Recognizing and understanding your own emotions...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  //     },
  //     {
  //       title: "Empathy",
  //       subtitle: "Connecting with others",
  //       content: "Developing empathy and understanding others' emotions...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  //     },
  //     {
  //       title: "Applying Emotional Intelligence",
  //       subtitle: "EQ in daily life",
  //       content: "Applying emotional intelligence in various life situations...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  //     }
  //   ]
  // },
  // {
  //   name: "Lorem ipsum dolor sit amet",
  //   icon: <Book className="h-6 w-6" />,
  //   pages: [
  //     {
  //       title: "Lorem ipsum dolor sit amet",
  //       subtitle: "Lorem ipsum dolor sit amet",
  //       content: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  //     },
  //     {
  //       title: "Lorem ipsum dolor sit amet",
  //       subtitle: "Lorem ipsum dolor sit amet",
  //       content: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  //     },
  //     {
  //       title: "Lorem ipsum dolor sit amet",
  //       subtitle: "Lorem ipsum dolor sit amet",
  //       content: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  //     },
  //     {
  //       title: "Lorem ipsum dolor sit amet",
  //       subtitle: "Lorem ipsum dolor sit amet",
  //       content: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  //     }
  //   ]
  // },
  // {
  //   name: "Lorem ipsum dolor sit amet",
  //   icon: <Smile className="h-6 w-6" />,
  //   pages: [
  //     {
  //       title: "Lorem ipsum dolor sit amet",
  //       subtitle: "Lorem ipsum dolor sit amet",
  //       content: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  //     },
  //     {
  //       title: "Lorem ipsum dolor sit amet",
  //       subtitle: "Lorem ipsum dolor sit amet",
  //       content: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  //     },
  //     {
  //       title: "Lorem ipsum dolor sit amet",
  //       subtitle: "Lorem ipsum dolor sit amet",
  //       content: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  //     },
  //     {
  //       title: "Lorem ipsum dolor sit amet",
  //       subtitle: "Lorem ipsum dolor sit amet",
  //       content: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  //     }
  //   ]
  // },
];

export default function Home()  {

  const { user, isSignedIn, isLoaded } = useUser();
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showModuleCompleted, setShowModuleCompleted] = useState(false);


  // const moduleContent = [
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  //   "make it sexy. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  // ];

  // const moduleName = [
  //   "Distanced Self-Talk",
  //   "Ut enim ad minim veniam",
  //   "Duis aute irure dolor in",
  //   "make it sexy. Ut enim ad"
  // ];

  // const moduleTitle = [
  //   "Learn how self Distance talk can help you",
  //   "Ut enim ad minim veniam, quis nostrud",
  //   "Duis aute irure dolor in reprehenderit",
  //   "make it sexy. Ut enim ad minim veniam"
  // ];

  // const moduleSubtitle = [
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  // ];

  const userName = isLoaded && isSignedIn ? user?.fullName || "User" : "User"; // "User" if name is not available

  useEffect(() => {
    if (isSignedIn) {
      setShowWelcome(true);
    }
  }, [isSignedIn]);
  useEffect(() => {
    // Check if we've reached the last page of the current module
    if (currentPageIndex === modules[currentModuleIndex].pages.length - 1) {
      setShowModuleCompleted(true);
    } else {
      setShowModuleCompleted(false);
    }
  }, [currentPageIndex, currentModuleIndex]);


  const currentModule = modules[currentModuleIndex];
  const currentPage = currentModule.pages[currentPageIndex];


  const progress = ((currentPageIndex + 1) / currentModule.pages.length) * 100;



  if (!isLoaded) {
    return <div>Loading...</div>;
  }



  // const handleNextPage = () => {
  //   if (currentPageIndex < currentModule.pages.length - 1) {
  //     setCurrentPageIndex(currentPageIndex + 1);
  //   } else if (currentModuleIndex < modules.length - 1) {
  //     setCurrentModuleIndex(currentModuleIndex + 1);
  //     setCurrentPageIndex(0);
  //   }
  // };
  const handleNextPage = () => {
    if (currentPageIndex < currentModule.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  // const handlePreviousPage = () => {
  //   if (currentPageIndex > 0) {
  //     setCurrentPageIndex(currentPageIndex - 1);
  //   } else if (currentModuleIndex > 0) {
  //     setCurrentModuleIndex(currentModuleIndex - 1);
  //     setCurrentPageIndex(modules[currentModuleIndex - 1].pages.length - 1);
  //   }
  // };
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

  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleNextModule = () => {
    if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentPageIndex(0);
      setShowModuleCompleted(false);
    }
  };

  // const isFirstPage = currentModuleIndex === 0 && currentPageIndex === 0;
  const isFirstPage = currentPageIndex === 0;
  // const isLastPage = currentPageIndex === currentModule.pages.length - 1 && currentModuleIndex === modules.length - 1;
  const isLastPage = currentPageIndex === currentModule.pages.length - 1;
  const isLastModule = currentModuleIndex === modules.length - 1;

  // const totalPages = modules.reduce((sum, module) => sum + module.pages.length, 0);
  // const currentPageNumber = modules.slice(0, currentModuleIndex).reduce((sum, module) => sum + module.pages.length, 0) + currentPageIndex + 1;
  // const progress = (currentPageNumber / totalPages) * 100;

  // routing="path" path="/sign-in"  className="min-h-screen flex items-center justify-center"
  return (
    <main className="min-h-screen flex items-center justify-center">
      {!isSignedIn ? (
        <SignIn/> ) : (
        <ModulePage
          // module={moduleName}
          // moduleIcon={<Book className="h-6 w-6" />}
          // title={moduleTitle}
          // subtitle={moduleSubtitle}
          // content={moduleContent}
          // showWelcome={showWelcome}
            // setShowWelcome={setShowWelcome}
            module={currentModule.name}
            moduleIcon={currentModule.icon}
            title={currentPage.title}
            subtitle={currentPage.subtitle}
            content={currentPage.content}
            showWelcome={showWelcome}
            setShowWelcome={setShowWelcome}
            onNextPage={handleNextPage}
            isLastPage={isLastPage}
            onPreviousPage={handlePreviousPage}
          isFirstPage={isFirstPage}
            progress={progress}
          showModuleCompleted={showModuleCompleted}
          onNextModule={handleNextModule}
            isLastModule={isLastModule}
            // replacePlaceholders={replacePlaceholders}
            // currentPageNumber={currentPageIndex + 1}
            // totalPages={currentModule.pages.length}
        
        />)
      }
    </main>
  );
}
