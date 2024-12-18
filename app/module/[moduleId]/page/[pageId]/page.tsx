"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import ModulePage from "@/app/module/ModulePage";
import { supabase } from "@/lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalking } from "@fortawesome/free-solid-svg-icons";
import IconSlider from "@/components/iconSlider";
import RiveAnimation from "@/components/riveAnim";

interface PageProps {
  params: {
    moduleId: string;
    pageId: string;
  };
}

interface Module {
  id: number;
  name: string;
  icon: string;
  total_pages: number;
}

interface RiveConfig {
  fileName: string;
  artboard?: string;
  animation?: string;
}

interface Page {
  id: number;
  module_id: number;
  title: string;
  subtitle: string;
  content: string;
  interactive_element: string | null;
  rive_animation: RiveConfig | string | null;
}

interface CompletedModule {
  module_id: number;
}

export default function DynamicModulePage({ params }: PageProps) {
  const router = useRouter();
  const { isSignedIn, isLoaded, user } = useUser();
  const [module, setModule] = useState<Module | null>(null);
  const [page, setPage] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showModuleCompleted, setShowModuleCompleted] = useState(false);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  // const [isSpeaking, setIsSpeaking] = useState(false)
  // const speechSynthesisRef = useRef<SpeechSynthesis | null>(null)


  // const contentRef = useRef<HTMLDivElement>(null)

  // const initSpeechSynthesis = useCallback(() => {
  //   if (typeof window !== "undefined" && !speechSynthesisRef.current) {
  //     speechSynthesisRef.current = window.speechSynthesis
  //   }
  // }, [])

  // const handleSpeak = useCallback(() => {
  //   initSpeechSynthesis()
    
  //   if (!speechSynthesisRef.current || !contentRef.current) return

  //   if (isSpeaking) {
  //     speechSynthesisRef.current.cancel()
  //     setIsSpeaking(false)
  //     return
  //   }

  //   const text = contentRef.current.textContent || ""
  //   const utterance = new SpeechSynthesisUtterance(text)
  //   utterance.onend = () => setIsSpeaking(false)
    
  //   speechSynthesisRef.current.speak(utterance)
  //   setIsSpeaking(true)
  // }, [isSpeaking, initSpeechSynthesis])


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


  useEffect(() => {
    if (params.pageId === "1") {
      setShowWelcome(true);
      setShowOverlay(true);
    } else {
      setShowWelcome(false);
      setShowOverlay(false);
    }
  }, [params.moduleId, params.pageId]);

  const fetchModuleAndPage = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: moduleData, error: moduleError } = await supabase
        .from("modules")
        .select("* , pages(count)")
        .eq("id", params.moduleId)
        .single();

      if (moduleError) throw moduleError;
      const total_pages = moduleData.pages[0].count;
      setModule({ ...moduleData, total_pages });

      const { data: pageData, error: pageError } = await supabase
        .from("pages")
        .select("*, rive_animation")
        .eq("module_id", params.moduleId)
        .eq("id", params.pageId)
        .single();

      if (pageError) throw pageError;
      setPage(pageData);

      const userResponse = await fetch("/api/user");
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await userResponse.json();
      const completedModuleIds = userData.completed_modules.map(
        (cm: CompletedModule) => cm.module_id
      );
      setCompletedModules(completedModuleIds);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, [params.moduleId, params.pageId]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    } else if (isLoaded && isSignedIn) {
      fetchModuleAndPage();
    }
  }, [isLoaded, isSignedIn, fetchModuleAndPage, router]);

  const handleNextPage = useCallback(() => {
    if (module && module.total_pages) {
      const currentPageId = parseInt(params.pageId);
      console.log(
        `Current page: ${currentPageId}, Total pages: ${module.total_pages}`
      );

      if (currentPageId < module.total_pages) {
        const nextPageId = currentPageId + 1;
        console.log(`Navigating to next page: ${nextPageId}`);
        router.push(`/module/${params.moduleId}/page/${nextPageId}`);
      } else {
        console.log("Module completed");
        setShowModuleCompleted(true);
      }
    } else {
      console.error("Module data or total pages is not available");
    }
  }, [params.moduleId, params.pageId, module, router]);

  const handlePreviousPage = useCallback(() => {
    const currentPageId = parseInt(params.pageId);
    if (currentPageId > 1) {
      const prevPageId = currentPageId - 1;
      router.push(`/module/${params.moduleId}/page/${prevPageId}`);
    } else {
      router.push("/module");
    }
  }, [params.moduleId, params.pageId, router]);

  const handleOverlayDismiss = () => {
    setShowOverlay(false);
  };

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case "faPersonWalking":
        return <FontAwesomeIcon icon={faPersonWalking} className="h-6 w-6" />;
      default:
        return null;
    }
  };

  // was okay already!
  // const getPageContent = (page: Page) => {
  //   if (page.interactive_element === "IconSlider") {
  //     return <IconSlider />;
  //   }
  //   return page.content;
  // };
  
  const getPageContent = (page: Page) => {
    const content: React.ReactNode[] = [];
  
    // Add regular content if it exists
    if (page.content) {
      content.push(
        <div key="regular-content" className="mb-4">
          {page.content}
        </div>
      );
    }
  
    // Add interactive element if it exists
    if (page.interactive_element === "IconSlider") {
      content.push(
        <div key="interactive-element" className="mb-4">
          <IconSlider />
        </div>
      );
    }
  
    // Add Rive animation if it exists
    if (page.rive_animation) {
      try {
        // Handle both string and object formats
        // const riveConfig = typeof page.rive_animation === 'string' 
        //   ? JSON.parse(page.rive_animation)
        //   : page.rive_animation;
  
        content.push(
          <div key="rive-animation" className="w-full h-64 mb-4">
            <RiveAnimation 
              // rivFile={`/animations/${riveConfig.fileName}`}
              // artboard={riveConfig.artboard}
              // animation={riveConfig.animation}
            />
          </div>
        );
      } catch (error) {
        console.error('Error handling Rive animation:', error);
      }
    }
  
    // Return all content wrapped in a container
    return (
      <div className="space-y-4">
        {content}
      </div>
    );
  };

  const handleNextModule = useCallback(async () => {
    if (completedModules.includes(parseInt(params.moduleId))) {
      console.log("Module already completed, navigating to modules page");
      router.push("/module");
      return;
    }
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ moduleId: params.moduleId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to mark module as completed");
      }

      console.log("Module marked as completed:", data);
      setCompletedModules((prev) => [...prev, parseInt(params.moduleId)]);
      router.push("/module");
    } catch (error) {
      console.error("Error marking module as completed:", error);
      setError("Failed to mark module as completed. Please try again.");
    } finally {
      setShowModuleCompleted(false);
    }
  }, [params.moduleId, router, completedModules]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!module || !page) {
    return <div>Module or page not found</div>;
  }

  return (
    <ModulePage
      module={module.name}
      moduleIcon={getModuleIcon(module.icon)}
      title={page.title}
      subtitle={page.subtitle}
      content={getPageContent(page)}
      showWelcome={showWelcome}
      setShowWelcome={setShowWelcome}
      showOverlay={showOverlay}
      handleOverlayDismiss={handleOverlayDismiss}
      onNextPage={handleNextPage}
      isLastPage={
        module ? parseInt(params.pageId) === module.total_pages : false
      }
      progress={
        module && module.total_pages
          ? (parseInt(params.pageId) / module.total_pages) * 100
          : 0
      }
      onPreviousPage={handlePreviousPage}
      isFirstPage={params.pageId === "1"}
      onNextModule={handleNextModule}
      isLastModule={false}
      onStartOver={() => {}}
      username={user?.username || ""}
      showModuleCompleted={showModuleCompleted}
      setShowModuleCompleted={setShowModuleCompleted}
      // interactiveElement={content.interactiveElement}
      // showTextToSpeech={content.showTextToSpeech}
    />
  );
}
