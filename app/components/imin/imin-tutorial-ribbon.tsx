"use client";

import { CheckCircle2, ImageIcon, LayoutGrid, Palette, Sparkles, Type } from "lucide-react";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

import {
  palettePresets,
  tutorialTabs,
  type PalettePreset,
  type TutorialTab,
  type TutorialTool,
} from "./imin-tutorial-model";

function getToolIcon(tool: TutorialTool) {
  if (tool === "texto") {
    return Type;
  }

  if (tool === "imagenes" || tool === "multimedia") {
    return ImageIcon;
  }

  if (tool === "iconos" || tool === "animacion") {
    return Sparkles;
  }

  if (tool === "agregar-bloque") {
    return LayoutGrid;
  }

  if (
    tool === "neutral" ||
    tool === "grafito" ||
    tool === "oceano" ||
    tool === "bosque" ||
    tool === "terracota"
  ) {
    return Palette;
  }

  return CheckCircle2;
}

type IminTutorialRibbonProps = {
  activeTab: TutorialTab;
  activeTool: TutorialTool;
  onTabChange: (tab: TutorialTab) => void;
  onToolChange: (tool: TutorialTool) => void;
};

export default function IminTutorialRibbon({
  activeTab,
  activeTool,
  onTabChange,
  onToolChange,
}: IminTutorialRibbonProps) {
  const currentTab = tutorialTabs.find((tab) => tab.id === activeTab) ?? tutorialTabs[0];
  const paletteTab = activeTab === "paleta";

  return (
    <header className="border-b border-white/8 bg-[#060c18]/94 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.38em] text-[#f2c665]">
            IMIN Demo
          </p>
          <h2 className="mt-2 text-2xl font-light tracking-[0.08em] text-white sm:text-3xl">
            IMIN - Edita tus contenidos
          </h2>
        </div>

        <Badge variant="outline" className="border-white/12 text-white/62">
          Opciones
        </Badge>
      </div>

      <div className="border-t border-white/8 px-4 py-3 sm:px-6">
        <div className="overflow-x-auto">
          <div className="flex min-w-max items-center gap-2 rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-1">
            {tutorialTabs.map((tab) => (
              <Button
                key={tab.id}
                variant={tab.id === activeTab ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "h-10 rounded-[0.95rem] px-4 text-[0.62rem]",
                  tab.id !== activeTab && "text-white/64 hover:bg-white/[0.05]",
                )}
                onClick={() => onTabChange(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 px-4 py-3 sm:px-6">
        <div className="overflow-x-auto">
          <div className="flex min-w-max items-stretch gap-3">
            {currentTab.tools.map((tool) => {
              const Icon = getToolIcon(tool.id);

              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => onToolChange(tool.id)}
                  className={cn(
                    "min-w-[15rem] rounded-[1.15rem] border px-4 py-3 text-left transition",
                    activeTool === tool.id
                      ? "border-[#FF8904]/38 bg-[#FF8904]/8"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/72">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[#f2c665]">
                        {currentTab.label}
                      </p>
                      <p className="mt-2 text-sm tracking-[0.04em] text-white">{tool.label}</p>
                    </div>
                  </div>
                  {paletteTab ? (
                    <div className="mt-4 flex items-center gap-2">
                      {palettePresets[tool.id as PalettePreset].swatches.map((swatch: string) => (
                        <span
                          key={swatch}
                          className="h-6 w-6 rounded-full border border-white/12"
                          style={{ backgroundColor: swatch }}
                        />
                      ))}
                    </div>
                  ) : null}
                  <p className="mt-3 text-xs leading-5 text-white/56">{tool.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
