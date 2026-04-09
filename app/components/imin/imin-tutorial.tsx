"use client";

import { useState } from "react";

import IminTutorialRibbon from "./imin-tutorial-ribbon";
import {
  defaultHomeIcons,
  defaultHomeImages,
  defaultHomeTexts,
  getDefaultTool,
  isPaletteTool,
  type HomeIconId,
  type HomeIconMap,
  type HomeImageId,
  type HomeImageMap,
  type HomeTextId,
  type HomeTextMap,
  type IconOptionId,
  type PalettePreset,
  type TutorialElement,
  type TutorialTab,
  type TutorialTool,
} from "./imin-tutorial-model";
import IminTutorialWorkspace from "./imin-tutorial-workspace";

type AnimationPreset = "fade" | "lift" | "spotlight";

const initialElements: TutorialElement[] = [];

export default function IminTutorial() {
  const [activeTab, setActiveTab] = useState<TutorialTab>("editar");
  const [activeTool, setActiveTool] = useState<TutorialTool>("texto");
  const [elements, setElements] = useState<TutorialElement[]>(initialElements);
  const [homeTexts, setHomeTexts] = useState<HomeTextMap>(defaultHomeTexts);
  const [homeImages, setHomeImages] = useState<HomeImageMap>(defaultHomeImages);
  const [homeIcons, setHomeIcons] = useState<HomeIconMap>(defaultHomeIcons);
  const [selectedTextId, setSelectedTextId] = useState<HomeTextId | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<HomeImageId | null>(null);
  const [selectedIconId, setSelectedIconId] = useState<HomeIconId | null>(null);
  const [palettePreset, setPalettePreset] = useState<PalettePreset>("neutral");
  const animationPreset: AnimationPreset = "fade";
  const publishReady = false;

  const handleTabChange = (tab: TutorialTab) => {
    setActiveTab(tab);
    setActiveTool(tab === "paleta" ? palettePreset : getDefaultTool(tab));

    if (tab !== "editar") {
      setSelectedTextId(null);
      setSelectedImageId(null);
      setSelectedIconId(null);
    }
  };

  const handleToolChange = (tool: TutorialTool) => {
    setActiveTool(tool);

    if (isPaletteTool(tool)) {
      setPalettePreset(tool);
    }

    if (tool !== "texto") {
      setSelectedTextId(null);
    }

    if (tool !== "imagenes") {
      setSelectedImageId(null);
    }

    if (tool !== "iconos") {
      setSelectedIconId(null);
    }
  };

  const handleRemoveElement = (id: string) => {
    setElements((current) => current.filter((element) => element.id !== id));
  };

  const handleSelectText = (id: HomeTextId) => {
    if (activeTab !== "editar" || activeTool !== "texto") {
      return;
    }

    setSelectedTextId(id);
  };

  const handleTextChange = (id: HomeTextId, value: string) => {
    setHomeTexts((current) => ({
      ...current,
      [id]: value,
    }));
  };

  const handleSelectImage = (id: HomeImageId) => {
    if (activeTab !== "editar" || activeTool !== "imagenes") {
      return;
    }

    setSelectedImageId(id);
  };

  const handleImageChange = (id: HomeImageId, value: string) => {
    setHomeImages((current) => ({
      ...current,
      [id]: value,
    }));
  };

  const handleSelectIcon = (id: HomeIconId) => {
    if (activeTab !== "editar" || activeTool !== "iconos") {
      return;
    }

    setSelectedIconId(id);
  };

  const handleIconChange = (id: HomeIconId, value: IconOptionId) => {
    setHomeIcons((current) => ({
      ...current,
      [id]: value,
    }));
    setSelectedIconId(null);
  };

  const handleClearSelectedText = () => {
    setSelectedTextId(null);
  };

  const handleClearSelectedImage = () => {
    setSelectedImageId(null);
  };

  const handleClearSelectedIcon = () => {
    setSelectedIconId(null);
  };

  return (
    <section className="relative left-1/2 min-h-[100svh] w-screen -translate-x-1/2 border-y border-white/8 bg-[linear-gradient(180deg,#040915_0%,#07101f_100%)] text-white">
      <div className="flex min-h-[100svh] flex-col">
        <IminTutorialRibbon
          activeTab={activeTab}
          activeTool={activeTool}
          onTabChange={handleTabChange}
          onToolChange={handleToolChange}
        />

        <IminTutorialWorkspace
          activeTab={activeTab}
          activeTool={activeTool}
          elements={elements}
          homeTexts={homeTexts}
          homeImages={homeImages}
          homeIcons={homeIcons}
          selectedTextId={selectedTextId}
          selectedImageId={selectedImageId}
          selectedIconId={selectedIconId}
          palettePreset={palettePreset}
          animationPreset={animationPreset}
          publishReady={publishReady}
          onRemoveElement={handleRemoveElement}
          onSelectText={handleSelectText}
          onTextChange={handleTextChange}
          onSelectImage={handleSelectImage}
          onImageChange={handleImageChange}
          onSelectIcon={handleSelectIcon}
          onIconChange={handleIconChange}
          onClearSelectedText={handleClearSelectedText}
          onClearSelectedImage={handleClearSelectedImage}
          onClearSelectedIcon={handleClearSelectedIcon}
        />
      </div>
    </section>
  );
}
