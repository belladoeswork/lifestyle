import React, { useState, useRef, useEffect } from "react";
import ModulePage, { ModulePageProps } from "./module/ModulePage";

type OmittedProps =
  | "onNextPage"
  | "onPreviousPage"
  | "isFirstPage"
  | "isLastPage"
  | "onNextModule"
  | "isLastModule"
  | "onStartOver";

interface SwipeableModulePageProps extends ModulePageProps {
  prevPageContent?: Omit<ModulePageProps, OmittedProps>;
  nextPageContent?: Omit<ModulePageProps, OmittedProps>;
}

const SwipeableModulePage: React.FC<SwipeableModulePageProps> = ({
  onNextPage,
  onPreviousPage,
  isFirstPage,
  isLastPage,
  prevPageContent,
  nextPageContent,
  ...modulePageProps
}) => {
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isSwiping) return;
    const x = e.touches[0].clientX;
    const diff = startX - x;
    setCurrentX(diff);
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    setIsSwiping(false);
    const threshold = window.innerWidth / 4;
    if (currentX > threshold && !isLastPage) {
      onNextPage();
    } else if (currentX < -threshold && !isFirstPage) {
      onPreviousPage();
    }
    setCurrentX(0);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.transform = `translateX(${-currentX}px)`;
    }
  }, [currentX]);

  return (
    <div
      className="swiper-container overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div ref={containerRef} className="swipeable-page-container flex">
        {!isFirstPage && prevPageContent && (
          <div className="swipeable-page trailing-page prev-page">
            <ModulePage
              {...prevPageContent}
              onNextPage={() => {}}
              onPreviousPage={() => {}}
              isFirstPage={false}
              isLastPage={false}
              onNextModule={() => {}}
              isLastModule={false}
              onStartOver={() => {}}
            />
          </div>
        )}
        <div className={`swipeable-page ${isSwiping ? "swiping" : ""}`}>
          <ModulePage
            {...modulePageProps}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
          />
        </div>
        {!isLastPage && nextPageContent && (
          <div className="swipeable-page trailing-page next-page">
            <ModulePage
              {...nextPageContent}
              onNextPage={() => {}}
              onPreviousPage={() => {}}
              isFirstPage={false}
              isLastPage={false}
              onNextModule={() => {}}
              isLastModule={false}
              onStartOver={() => {}}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SwipeableModulePage;
