// "use client";

// import "./globals.css";
// import ModulePage from "./modules/ModulePage";
// import { SignIn } from "@clerk/nextjs";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPersonWalking } from "@fortawesome/free-solid-svg-icons";
// import React, { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import IconSlider from "@/components/iconslider";
// import { useSwipeable } from "react-swipeable";
// import { supabase } from "@/lib/supabase";

// export const dynamic = "force-dynamic";

// interface UserProfile {
//   id: string;
//   username: string;
//   phone_number: string;
// }

// interface Page {
//   id: number;
//   title: string;
//   subtitle: string | string[];
//   content: string[] | null;
//   interactive_element: string | null;
// }

// interface Module {
//   id: number;
//   name: string;
//   icon: string;
//   pages: Page[];
// }

// export default function Home() {
//   const { isSignedIn, isLoaded } = useUser();
//   const [showWelcome, setShowWelcome] = useState(false);
//   const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
//   const [currentPageIndex, setCurrentPageIndex] = useState(0);
//   const [showModuleCompleted, setShowModuleCompleted] = useState(false);
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [modules, setModules] = useState<Module[]>([]);
//   const [isLoadingModules, setIsLoadingModules] = useState(true);

//   const handleNextPage = () => {
//     if (
//       modules.length > 0 &&
//       currentPageIndex < modules[currentModuleIndex].pages.length - 1
//     ) {
//       setCurrentPageIndex(currentPageIndex + 1);
//       console.log("swiped right");
//     } else if (modules.length > 0) {
//       setShowModuleCompleted(true);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPageIndex > 0) {
//       setCurrentPageIndex(currentPageIndex - 1);
//       console.log("swiped left");
//     }
//   };

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: handleNextPage,
//     onSwipedRight: handlePreviousPage,
//     preventScrollOnSwipe: true,
//     trackMouse: true,
//     delta: { left: 20, right: 20 },
//     rotationAngle: 0,
//   });

//   useEffect(() => {
//     if (isSignedIn) {
//       setShowWelcome(true);
//       fetchUserProfile();
//       fetchModules();
//     }
//   }, [isSignedIn]);

//   const fetchModules = async () => {
//     setIsLoadingModules(true);

//     try {
//       const { data, error } = await supabase
//         .from("modules")
//         .select(
//           "id, name, icon, pages (id, title, subtitle, content, interactive_element)"
//         )
//         .order("id", { ascending: true })
//         .order("id", { foreignTable: "pages", ascending: true });

//       if (error) throw error;

//       console.log("Fetched modules:", data);

//       if (data) {
//         const processedModules = data.map((module) => ({
//           ...module,
//           pages: module.pages.map((page) => ({
//             ...page,
//             subtitle: Array.isArray(page.subtitle)
//               ? page.subtitle
//               : [page.subtitle],
//             content: Array.isArray(page.content)
//               ? page.content
//               : [page.content],
//           })),
//         }));

//         console.log("Processed modules:", processedModules);

//         setModules(data as Module[]);
//       }
//     } catch (error) {
//       console.error("Error fetching modules:", error);
//     } finally {
//       setIsLoadingModules(false);
//     }
//   };

//   const fetchUserProfile = async () => {
//     try {
//       console.log("Fetching user profile...");
//       const response = await fetch("/api/user");
//       console.log("Response status:", response.status);

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("API error:", errorData);
//         throw new Error(errorData.error || "Failed to fetch user profile");
//       }
//       const profile = await response.json();
//       console.log("Fetched profile:", profile);
//       setUserProfile(profile);
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//     }
//   };

//   const handleNextModule = () => {
//     if (currentModuleIndex < modules.length - 1) {
//       setCurrentModuleIndex(currentModuleIndex + 1);
//       setCurrentPageIndex(0);
//       setShowModuleCompleted(false);
//     }
//   };

//   const handleStartOver = () => {
//     setCurrentModuleIndex(0);
//     setCurrentPageIndex(0);
//     setShowModuleCompleted(false);
//     setShowWelcome(true);
//   };

//   const getModuleIcon = (iconName: string) => {
//     switch (iconName) {
//       case "faPersonWalking":
//         return <FontAwesomeIcon icon={faPersonWalking} className="h-6 w-6" />;
//       // Add more cases for other icons here
//       default:
//         return null;
//     }
//   };

//   const getPageContent = (page: Page) => {
//     if (page.interactive_element === "IconSlider") {
//       return <IconSlider />;
//     }
//     return page.content;
//   };

//   if (!isLoaded || isLoadingModules) {
//     return <div>Loading...</div>;
//   }

//   if (!modules.length) {
//     return <div>No modules available.</div>;
//   }

//   const currentModule = modules[currentModuleIndex];
//   const currentPage = currentModule.pages[currentPageIndex];
//   const progress = ((currentPageIndex + 1) / currentModule.pages.length) * 100;

//   const isFirstPage = currentPageIndex === 0;
//   const isLastPage = currentPageIndex === currentModule.pages.length - 1;
//   const isLastModule = currentModuleIndex === modules.length - 1;

//   console.log("Current module:", currentModule);
//   console.log("Current page:", currentPage);

//   return (
//     <main
//       className="min-h-screen w-full relative overflow-hidden"
//       {...swipeHandlers}
//     >
//       {!isSignedIn ? (
//         <div className="flex items-center justify-center h-screen">
//           <SignIn routing="hash" />
//         </div>
//       ) : (
//         <ModulePage
//           module={currentModule.name}
//           moduleIcon={getModuleIcon(currentModule.icon)}
//           title={currentPage.title}
//           subtitle={currentPage.subtitle}
//           content={getPageContent(currentPage)}
//           showWelcome={showWelcome}
//           setShowWelcome={setShowWelcome}
//           onNextPage={handleNextPage}
//           isLastPage={isLastPage}
//           onPreviousPage={handlePreviousPage}
//           isFirstPage={isFirstPage}
//           progress={progress}
//           showModuleCompleted={showModuleCompleted}
//           onNextModule={handleNextModule}
//           isLastModule={isLastModule}
//           onStartOver={handleStartOver}
//           username={userProfile?.username || ""}
//         />
//       )}
//     </main>
//   );
// }

// WAS OKAY

// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useUser } from "@clerk/nextjs";

// export default function Home() {
//   const router = useRouter();
//   const { isSignedIn, isLoaded } = useUser();

//   useEffect(() => {
//     if (isLoaded) {
//       if (isSignedIn) {
//         router.push("/module/2/page/1");
//       } else {
//         router.push("/sign-in");
//       }
//     }
//   }, [isSignedIn, isLoaded, router]);

//   return <div>Loading...</div>;
// }


"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  const slides = [
    {
      title: "Saving Is Now Easier, More Practical, And Safer With AdaKita",
      subtitle: "Storing safely, accurately and reliably, who else if not us, save now!",
      backgroundColor: "#feecba",
    },
    {
      title: "AdaKita Guarantees The Safety Of Money With Double Security",
      subtitle: "You don't have to worry because we are under state surveillance",
      backgroundColor: "#D6D0FD",
    },
    // {
    //   title: "Earn points and spend your points like you use your money",
    //   subtitle: "Every time you shop you will always get points that you can reuse these points",
    //   backgroundColor: "#f0e6db",
    // },
  ];

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/module");
    } else {
      router.push("/");
    }
  }, [isSignedIn, isLoaded, router]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleSkip = () => {
    router.push('/sign-in');
  };

  const handleGetStarted = () => {
    router.push('/sign-in');
  };

  if (isLoaded && isSignedIn) {
    return <div>Redirecting to modules...</div>;
  }

  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: slides[currentSlide].backgroundColor }}>
      <header className="p-4">
        <h1 className="text-[#2F3336] text-2xl font-bold">ooo</h1>
      </header>
      <main className="flex-grow flex flex-col justify-between p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="text-[#2F3336]">
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              {slides[currentSlide].title}
            </h2>
            <p className="text-xl opacity-80">
              {slides[currentSlide].subtitle}
            </p>
          </div>
        </div>
        <div className="w-full max-w-md mx-auto mt-auto">
          {!isLastSlide ? (
            <>
              <Button 
                onClick={handleNext}
                className="w-full mb-4 bg-black text-white hover:bg-gray-800 rounded-xl"
              >
                Next
              </Button>
              <Button 
                onClick={handleSkip}
                variant="ghost"
                className="w-full text-black hover:bg-transparent hover:text-gray-600 rounded-md"
              >
                Skip
              </Button>
            </>
          ) : (
            <Button 
              onClick={handleGetStarted}
              className="w-full bg-black text-white hover:bg-gray-800 rounded-xl"
            >
              Get Started
            </Button>
          )}
        </div>
      </main>
      <footer className="p-4 flex justify-center">
        <div className="space-x-2">
          {slides.map((_, index) => (
            <span 
              key={index} 
              className={`inline-block w-2 h-2 rounded-full ${
                currentSlide === index ? 'bg-[#2F3336]' : 'bg-[#e6d4a8]'
              }`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}