"use client";

// import Image from "next/image";
import './globals.css';
import ModulePage from './modules/ModulePage';
import { SignIn } from "@clerk/nextjs";
// import { Brain } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalking } from '@fortawesome/free-solid-svg-icons'; 
import { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
// import { getOrCreateUser } from './utils/user';

export const dynamic = "force-dynamic";


interface UserProfile {
  id: string;
  username: string;
  phone_number: string;
}

const modules = [
  {
    name: "Distanced Self-Talk",
    // icon: <Brain className="h-6 w-6" />,
    icon: <FontAwesomeIcon icon={faPersonWalking} className="h-6 w-6"/>,
    pages: [
      {
        title: "How changing your perspective in self-talk can improve your mental health.",
        subtitle: "#mental health",
        content: ["Self-talk is your inner dialogue - the ongoing mental narrative you have with yourself throughout the day, reflecting your thoughts and beliefs.", "And by using a simple trick in your inner dialouge you can improve your mental health."," Research shows that using third-person self-talk can reduce anxiety and improve emotional regulation."]

        // "
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
];

export default function Home()  {

  const {isSignedIn, isLoaded } = useUser();
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showModuleCompleted, setShowModuleCompleted] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);


  useEffect(() => {
    if (isSignedIn) {
      setShowWelcome(true);
      fetchUserProfile();
    }
  }, [isSignedIn]);
  // useEffect(() => {
  //   // Check if we've reached the last page of the current module
  //   if (currentPageIndex === modules[currentModuleIndex].pages.length - 1) {
  //     setShowModuleCompleted(true);
  //   } else {
  //     setShowModuleCompleted(false);
  //   }
  // }, [currentPageIndex, currentModuleIndex]);



  const fetchUserProfile = async () => {
    try {
      console.log('Fetching user profile...');
      const response = await fetch('/api/user');
          console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error:', errorData);
        throw new Error(errorData.error ||'Failed to fetch user profile');
      }
      const profile = await response.json();
      console.log('Fetched profile:', profile);
      setUserProfile(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const currentModule = modules[currentModuleIndex];
  const currentPage = currentModule.pages[currentPageIndex];
  const progress = ((currentPageIndex + 1) / currentModule.pages.length) * 100;

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // const handleNextPage = () => {
  //   if (currentPageIndex < currentModule.pages.length - 1) {
  //     setCurrentPageIndex(currentPageIndex + 1);
  //   }
  // };

  const handleNextPage = () => {
    if (currentPageIndex < currentModule.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else {
      setShowModuleCompleted(true);
    }
  };

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

  const handleStartOver = () => {
    setCurrentModuleIndex(0);
    setCurrentPageIndex(0);
    setShowModuleCompleted(false);
    setShowWelcome(true);
  };

  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === currentModule.pages.length - 1;
  const isLastModule = currentModuleIndex === modules.length - 1;

  return (
    <main className="min-h-screen w-full">
      {!isSignedIn ? (
        <div className="flex items-center justify-center h-screen">
          <SignIn routing="hash" />
          </div>
          
          ) : (
        <ModulePage
            module={currentModule.name}
            moduleIcon={currentModule.icon}
            title={currentPage.title}
            subtitle={Array.isArray(currentPage.subtitle) ? currentPage.subtitle.join(' ') : currentPage.subtitle}

            // subtitle={currentPage.subtitle}
            // content={currentPage.content}
            content={Array.isArray(currentPage.content) ? currentPage.content.join(' ') : currentPage.content}

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
            onStartOver={handleStartOver}
            username={userProfile?.username || ''}
        
        />)
      }
    </main>
  );
}
