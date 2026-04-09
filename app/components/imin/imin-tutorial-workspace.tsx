"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState, type ChangeEvent, type CSSProperties, type MouseEvent } from "react";
import {
  Monitor,
  Sparkles,
  X,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/lib/utils";

import {
  iconOptions,
  galleryImages,
  palettePresets,
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

type AnimationPreset = "fade" | "lift" | "spotlight";

type IminTutorialWorkspaceProps = {
  activeTab: TutorialTab;
  activeTool: TutorialTool;
  elements: TutorialElement[];
  homeTexts: HomeTextMap;
  homeImages: HomeImageMap;
  homeIcons: HomeIconMap;
  selectedTextId: HomeTextId | null;
  selectedImageId: HomeImageId | null;
  selectedIconId: HomeIconId | null;
  palettePreset: PalettePreset;
  animationPreset: AnimationPreset;
  publishReady: boolean;
  onRemoveElement: (id: string) => void;
  onSelectText: (id: HomeTextId) => void;
  onTextChange: (id: HomeTextId, value: string) => void;
  onSelectImage: (id: HomeImageId) => void;
  onImageChange: (id: HomeImageId, value: string) => void;
  onSelectIcon: (id: HomeIconId) => void;
  onIconChange: (id: HomeIconId, value: IconOptionId) => void;
  onClearSelectedText: () => void;
  onClearSelectedImage: () => void;
  onClearSelectedIcon: () => void;
};

const footerIconComponents: Record<IconOptionId, IconType> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  whatsapp: FaWhatsapp,
  tiktok: FaTiktok,
};

function getImageLabel(id: HomeImageId) {
  if (id === "hero-img-1") {
    return "Hero";
  }

  if (id === "gallery-img-1") {
    return "Carrusel 1";
  }

  if (id === "gallery-img-2") {
    return "Carrusel 2";
  }

  return "Carrusel 3";
}

function buildPaletteStyle(palettePreset: PalettePreset) {
  const palette = palettePresets[palettePreset].colors;

  return {
    "--site-preview-bg": palette.previewBg,
    "--site-line": palette.line,
    "--site-surface": palette.surface,
    "--site-surface-alt": palette.surfaceAlt,
    "--site-card": palette.card,
    "--site-text": palette.text,
    "--site-muted": palette.muted,
    "--site-nav-bg": palette.navBg,
    "--site-nav-muted": palette.navMuted,
    "--site-hero-card-bg": palette.heroCardBg,
    "--site-hero-card-line": palette.heroCardLine,
    "--site-hero-eyebrow": palette.heroEyebrow,
    "--site-hero-title": palette.heroTitle,
    "--site-hero-body": palette.heroBody,
    "--site-accent": palette.accent,
    "--site-accent-soft": palette.accentSoft,
    "--site-accent-ink": palette.accentInk,
    "--site-footer-bg": palette.footerBg,
    "--site-footer-text": palette.footerText,
    "--site-footer-muted": palette.footerMuted,
    "--site-icon-border": palette.iconBorder,
    "--site-label-bg": palette.labelBg,
    "--site-label-text": palette.labelText,
  } as CSSProperties;
}

function BlockTag({ label }: { label: string }) {
  return (
    <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-[var(--site-line)] bg-[var(--site-label-bg)] px-3 py-1 text-[0.58rem] uppercase tracking-[0.28em] text-[var(--site-label-text)] backdrop-blur-sm">
      {label}
    </div>
  );
}

function EditableText({
  id,
  value,
  selected,
  editable,
  multiline = false,
  className,
  onSelect,
  onChange,
  onBlur,
}: {
  id: HomeTextId;
  value: string;
  selected: boolean;
  editable: boolean;
  multiline?: boolean;
  className?: string;
  onSelect: (id: HomeTextId) => void;
  onChange: (id: HomeTextId, value: string) => void;
  onBlur: () => void;
}) {
  const isEmpty = value.trim().length === 0;
  const fallbackLabel = "Escribe aqui...";
  const displayValue = isEmpty ? fallbackLabel : value;

  if (!editable) {
    return <span className={cn("whitespace-pre-wrap", className)}>{value}</span>;
  }

  if (selected) {
    return (
      <div
        className={cn(
          "relative rounded-[0.4rem] ring-2 ring-[#FF8904]/55 ring-offset-2 ring-offset-transparent",
          multiline ? "block" : "inline-grid align-baseline",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "invisible whitespace-pre-wrap",
            isEmpty && "italic opacity-55",
            className,
          )}
        >
          {displayValue}
        </span>
        <textarea
          value={value}
          rows={1}
          placeholder={fallbackLabel}
          onChange={(event) => onChange(id, event.target.value)}
          onBlur={onBlur}
          className={cn(
            "absolute inset-0 h-full w-full resize-none overflow-hidden border-0 bg-transparent p-0 outline-none whitespace-pre-wrap placeholder:italic placeholder:text-current/40",
            className,
          )}
        />
        {isEmpty ? (
          <p className="absolute left-0 top-full mt-2 text-[0.62rem] uppercase tracking-[0.2em] text-[#ff8904]">
            recuadro vacio nombralo antes de continuar.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={cn(
        "rounded-[0.7rem] text-left whitespace-pre-wrap transition outline-none",
        selected
          ? "ring-2 ring-[#FF8904]/55 ring-offset-2 ring-offset-transparent"
          : "hover:bg-[#ff8904]/8",
        isEmpty && "italic opacity-55",
        className,
      )}
    >
      {isEmpty ? fallbackLabel : value}
    </button>
  );
}

function EditableImage({
  id,
  label,
  selected,
  editable,
  onSelect,
}: {
  id: HomeImageId;
  label: string;
  selected: boolean;
  editable: boolean;
  onSelect: (id: HomeImageId) => void;
}) {
  if (!editable) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={cn(
        "absolute inset-0 z-10 flex items-end justify-between rounded-[inherit] bg-[linear-gradient(180deg,rgba(8,10,17,0)_0%,rgba(8,10,17,0.42)_100%)] p-4 text-left transition",
        selected ? "ring-2 ring-[#FF8904]/70 ring-inset" : "hover:bg-[linear-gradient(180deg,rgba(8,10,17,0.08)_0%,rgba(8,10,17,0.46)_100%)]",
      )}
    >
      <span className="rounded-full border border-white/14 bg-black/40 px-3 py-1 text-[0.58rem] uppercase tracking-[0.24em] text-white">
        {label}
      </span>
      <span className="rounded-full border border-white/14 bg-black/40 px-3 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-white">
        Cambiar imagen
      </span>
    </button>
  );
}

function BodyElementCard({ element }: { element: TutorialElement }) {
  if (element.kind === "text") {
    return (
      <div className="rounded-[1.5rem] border border-[#ddd8ce] bg-[#fffdf7] px-5 py-5 text-[#171717]">
        <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[var(--site-accent)]">{element.title}</p>
        <p className="mt-3 text-sm leading-7 tracking-[0.04em] text-[var(--site-muted)]">
          {element.description}
        </p>
      </div>
    );
  }

  if (element.kind === "image") {
    return (
      <div className="overflow-hidden rounded-[1.5rem] border border-[var(--site-line)] bg-[var(--site-card)]">
        <div className="relative aspect-[16/8]">
          <Image
            src={galleryImages[1]}
            alt={element.title}
            fill
            sizes="(min-width: 1280px) 900px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="px-5 py-4 text-[var(--site-text)]">
          <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[var(--site-accent)]">{element.title}</p>
          <p className="mt-3 text-sm leading-7 tracking-[0.04em] text-[var(--site-muted)]">
            {element.description}
          </p>
        </div>
      </div>
    );
  }

  if (element.kind === "icon") {
    return (
      <div className="rounded-[1.5rem] border border-[var(--site-line)] bg-[var(--site-surface-alt)] px-5 py-5 text-[var(--site-text)]">
        <div className="grid gap-4 md:grid-cols-3">
          {["Rapido", "Editable", "Visual"].map((label) => (
            <div key={label} className="rounded-[1.1rem] border border-[var(--site-line)] bg-[var(--site-card)] p-4">
              <Sparkles className="h-4 w-4 text-[var(--site-accent)]" />
              <p className="mt-3 text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (element.kind === "media") {
    return (
      <div className="rounded-[1.5rem] border border-[var(--site-line)] bg-[var(--site-card)] px-5 py-5 text-[var(--site-text)]">
        <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[var(--site-accent)]">{element.title}</p>
        <div className="mt-4 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative aspect-video overflow-hidden rounded-[1.2rem] border border-black/6 bg-black">
            <Image
              src={galleryImages[2]}
              alt={element.title}
              fill
              sizes="(min-width: 1280px) 700px, 100vw"
              className="object-cover opacity-84"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full border border-white/16 bg-black/35 px-4 py-2 text-[0.62rem] uppercase tracking-[0.28em] text-white">
                Video preview
              </div>
            </div>
          </div>
          <div className="rounded-[1.2rem] border border-[var(--site-line)] bg-[var(--site-surface-alt)] p-4">
            <p className="text-sm leading-7 tracking-[0.04em] text-[var(--site-muted)]">
              {element.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[1.5rem] border border-[var(--site-line)] bg-[var(--site-surface-alt)] px-5 py-5 text-[var(--site-text)]">
      <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[var(--site-accent)]">{element.title}</p>
      <h4 className="mt-3 text-2xl font-light tracking-[0.08em]">Bloque extra del body</h4>
      <p className="mt-4 text-sm leading-7 tracking-[0.04em] text-[var(--site-muted)]">
        {element.description}
      </p>
    </div>
  );
}

export default function IminTutorialWorkspace({
  activeTab,
  activeTool,
  elements,
  homeTexts,
  homeImages,
  homeIcons,
  selectedTextId,
  selectedImageId,
  selectedIconId,
  palettePreset,
  animationPreset,
  publishReady,
  onRemoveElement,
  onSelectText,
  onTextChange,
  onSelectImage,
  onImageChange,
  onSelectIcon,
  onIconChange,
  onClearSelectedText,
  onClearSelectedImage,
  onClearSelectedIcon,
}: IminTutorialWorkspaceProps) {
  const textEditMode = activeTab === "editar" && activeTool === "texto";
  const imageEditMode = activeTab === "editar" && activeTool === "imagenes";
  const iconEditMode = activeTab === "editar" && activeTool === "iconos";
  const palette = palettePresets[palettePreset];
  const siteStyle = buildPaletteStyle(palettePreset);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const pendingImageIdRef = useRef<HomeImageId | null>(null);
  const [iconMenuPlacement, setIconMenuPlacement] = useState<"top" | "bottom">("top");
  const bodyMotion =
    animationPreset === "fade"
      ? { opacity: [0.98, 1], y: [8, 0] }
      : animationPreset === "lift"
        ? { opacity: [0.98, 1], y: [18, 0], scale: [0.992, 1] }
        : { opacity: [0.98, 1], boxShadow: ["0 0 0 rgba(255,137,4,0)", "0 0 0 rgba(255,137,4,0.08)"] };
  const activeIconOption = selectedIconId ? homeIcons[selectedIconId] : null;

  const handleRequestImageChange = (id: HomeImageId) => {
    onSelectImage(id);
    pendingImageIdRef.current = id;
    imageInputRef.current?.click();
  };

  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const imageId = pendingImageIdRef.current;

    if (!file || !imageId) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;

      if (typeof result === "string") {
        onImageChange(imageId, result);
        onClearSelectedImage();
      }
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleIconButtonClick = (event: MouseEvent<HTMLButtonElement>, iconId: HomeIconId) => {
    if (!iconEditMode) {
      return;
    }

    if (selectedIconId === iconId) {
      onClearSelectedIcon();
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const estimatedMenuHeight = 176;
    const gap = 12;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    setIconMenuPlacement(
      spaceBelow >= estimatedMenuHeight + gap || spaceBelow >= spaceAbove ? "bottom" : "top",
    );
    onSelectIcon(iconId);
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageFileChange}
      />
      <div className="rounded-4xl border border-white/10 bg-white/2 p-3 sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.34em] text-[#f2c665]">Pagina editable</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-white/12 text-white/62">
              <Monitor className="mr-2 h-3.5 w-3.5" />
              Home preview
            </Badge>
            <Badge variant="outline" className="border-white/12 text-white/62">
              {publishReady ? "Listo" : "Borrador"}
            </Badge>
          </div>
        </div>

        <div
          className="mx-auto max-w-[84rem] rounded-[2rem] border border-white/10 bg-[var(--site-preview-bg)] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.3)]"
          style={siteStyle}
        >
          <div className="space-y-4">
            <div className="relative rounded-[1.6rem] border border-[var(--site-line)] bg-[var(--site-nav-bg)] px-5 py-4 text-[var(--site-text)]">
              <BlockTag label="Navbar" />
              <div className="pt-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="relative h-7 w-20">
                    <motion.img
                      src="/IMIN.png"
                      alt="IMIN logo"
                      className="h-full w-full object-contain object-left"
                      loading="eager"
                      decoding="async"
                      draggable={false}
                    />
                  </div>
                  <div className="hidden items-center gap-6 text-xs uppercase tracking-[0.24em] text-[var(--site-nav-muted)] sm:flex">
                    <EditableText
                      id="nav-el-1"
                      value={homeTexts["nav-el-1"]}
                      selected={selectedTextId === "nav-el-1"}
                      editable={textEditMode}
                      onSelect={onSelectText}
                      onChange={onTextChange}
                      onBlur={onClearSelectedText}
                    />
                    <EditableText
                      id="nav-el-2"
                      value={homeTexts["nav-el-2"]}
                      selected={selectedTextId === "nav-el-2"}
                      editable={textEditMode}
                      onSelect={onSelectText}
                      onChange={onTextChange}
                      onBlur={onClearSelectedText}
                    />
                    <EditableText
                      id="nav-el-3"
                      value={homeTexts["nav-el-3"]}
                      selected={selectedTextId === "nav-el-3"}
                      editable={textEditMode}
                      onSelect={onSelectText}
                      onChange={onTextChange}
                      onBlur={onClearSelectedText}
                    />
                    <EditableText
                      id="nav-el-4"
                      value={homeTexts["nav-el-4"]}
                      selected={selectedTextId === "nav-el-4"}
                      editable={textEditMode}
                      onSelect={onSelectText}
                      onChange={onTextChange}
                      onBlur={onClearSelectedText}
                    />
                  </div>
                  {textEditMode ? (
                    <div
                      className={cn(
                        "inline-flex h-9 items-center justify-center rounded-full px-4 text-[0.62rem] uppercase tracking-[0.22em] transition",
                        selectedTextId === "nav-cta-1" && "ring-2 ring-[#FF8904]/55 ring-offset-2 ring-offset-transparent",
                      )}
                      style={{ backgroundColor: palette.colors.accent, color: palette.colors.heroTitle }}
                    >
                      <EditableText
                        id="nav-cta-1"
                        value={homeTexts["nav-cta-1"]}
                        selected={selectedTextId === "nav-cta-1"}
                        editable={textEditMode}
                        className="bg-transparent text-[0.62rem] uppercase tracking-[0.22em]"
                        onSelect={onSelectText}
                        onChange={onTextChange}
                        onBlur={onClearSelectedText}
                      />
                    </div>
                  ) : (
                    <div
                      className="inline-flex h-9 items-center justify-center rounded-full px-4 text-[0.62rem] uppercase tracking-[0.22em]"
                      style={{ backgroundColor: palette.colors.accent, color: palette.colors.heroTitle }}
                    >
                      {homeTexts["nav-cta-1"]}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <motion.section
              key={animationPreset}
              initial={{ opacity: 0.96 }}
              animate={bodyMotion}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative space-y-4 rounded-[1.9rem] border border-[var(--site-line)] bg-[var(--site-surface)] p-4 sm:p-5"
            >
              <BlockTag label="Body" />
              <div className="pt-7">
                <div className="relative overflow-hidden rounded-[1.8rem]">
                  <div className="relative h-[26rem] sm:h-[30rem]">
                    <Image
                      src={homeImages["hero-img-1"]}
                      alt="Hero principal editable"
                      fill
                      sizes="(min-width: 1280px) 1100px, 100vw"
                      className="object-cover"
                    />
                    <EditableImage
                      id="hero-img-1"
                      label={getImageLabel("hero-img-1")}
                      selected={selectedImageId === "hero-img-1"}
                      editable={imageEditMode}
                      onSelect={handleRequestImageChange}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,13,20,0.12),rgba(12,13,20,0.58))]" />
                    <div className="absolute inset-0 flex items-center justify-center px-6">
                      <div className="max-w-2xl rounded-[1.8rem] border border-[var(--site-hero-card-line)] bg-[var(--site-hero-card-bg)] px-6 py-8 text-center backdrop-blur-sm sm:px-10 sm:py-10">
                        <EditableText
                          id="hero-el-1"
                          value={homeTexts["hero-el-1"]}
                          selected={selectedTextId === "hero-el-1"}
                          editable={textEditMode}
                          className="text-[0.68rem] uppercase tracking-[0.42em] text-[var(--site-hero-eyebrow)]"
                          onSelect={onSelectText}
                          onChange={onTextChange}
                          onBlur={onClearSelectedText}
                        />
                        <EditableText
                          id="hero-el-2"
                          value={homeTexts["hero-el-2"]}
                          selected={selectedTextId === "hero-el-2"}
                          editable={textEditMode}
                          className="mt-4 block text-3xl font-light leading-tight tracking-[0.08em] text-[var(--site-hero-title)] sm:text-5xl"
                          onSelect={onSelectText}
                          onChange={onTextChange}
                          onBlur={onClearSelectedText}
                        />
                        <EditableText
                          id="hero-el-3"
                          value={homeTexts["hero-el-3"]}
                          selected={selectedTextId === "hero-el-3"}
                          editable={textEditMode}
                          multiline
                          className="mt-4 block text-sm leading-7 tracking-[0.04em] text-[var(--site-hero-body)] sm:text-base"
                          onSelect={onSelectText}
                          onChange={onTextChange}
                          onBlur={onClearSelectedText}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-[var(--site-line)] bg-[var(--site-surface-alt)] px-5 py-6 text-[var(--site-text)]">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <EditableText
                        id="body-el-1"
                        value={homeTexts["body-el-1"]}
                        selected={selectedTextId === "body-el-1"}
                        editable={textEditMode}
                        className="text-[0.64rem] uppercase tracking-[0.34em] text-[var(--site-accent)]"
                        onSelect={onSelectText}
                        onChange={onTextChange}
                        onBlur={onClearSelectedText}
                      />
                      <EditableText
                        id="body-el-2"
                        value={homeTexts["body-el-2"]}
                        selected={selectedTextId === "body-el-2"}
                        editable={textEditMode}
                        className="mt-2 block text-2xl font-light tracking-[0.08em]"
                        onSelect={onSelectText}
                        onChange={onTextChange}
                        onBlur={onClearSelectedText}
                      />
                    </div>
                    <Badge className="bg-[var(--site-accent-soft)] text-[var(--site-accent-ink)]">
                      {animationPreset}
                    </Badge>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {(
                      [
                        ["gallery-img-1", homeImages["gallery-img-1"]],
                        ["gallery-img-2", homeImages["gallery-img-2"]],
                        ["gallery-img-3", homeImages["gallery-img-3"]],
                      ] as const
                    ).map(([id, src], index) => (
                      <div
                        key={id}
                        className={cn(
                          "relative overflow-hidden rounded-[1.4rem] border border-[var(--site-line)] bg-[var(--site-card)]",
                          selectedImageId === id && imageEditMode && "ring-2 ring-[#FF8904]/70 ring-inset",
                        )}
                      >
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={src}
                            alt={`Vista del producto ${index + 1}`}
                            fill
                            sizes="(min-width: 768px) 33vw, 100vw"
                            className="object-cover"
                          />
                          <EditableImage
                            id={id}
                            label={getImageLabel(id)}
                            selected={selectedImageId === id}
                            editable={imageEditMode}
                            onSelect={handleRequestImageChange}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[1.6rem] border border-[var(--site-line)] bg-[var(--site-card)] px-5 py-6">
                    <EditableText
                      id="body-el-4"
                      value={homeTexts["body-el-4"]}
                      selected={selectedTextId === "body-el-4"}
                      editable={textEditMode}
                      className="text-[0.64rem] uppercase tracking-[0.34em] text-[var(--site-accent)]"
                      onSelect={onSelectText}
                      onChange={onTextChange}
                      onBlur={onClearSelectedText}
                    />
                    <EditableText
                      id="body-el-5"
                      value={homeTexts["body-el-5"]}
                      selected={selectedTextId === "body-el-5"}
                      editable={textEditMode}
                      multiline
                      className="mt-3 block text-3xl font-light leading-tight tracking-[0.08em]"
                      onSelect={onSelectText}
                      onChange={onTextChange}
                      onBlur={onClearSelectedText}
                    />
                    <EditableText
                      id="body-el-3"
                      value={homeTexts["body-el-3"]}
                      selected={selectedTextId === "body-el-3"}
                      editable={textEditMode}
                      multiline
                      className="mt-4 block max-w-3xl text-sm leading-7 tracking-[0.04em] text-[var(--site-muted)] sm:text-base"
                      onSelect={onSelectText}
                      onChange={onTextChange}
                      onBlur={onClearSelectedText}
                    />
                  </div>

                  <div className="mt-5 space-y-4">
                    {elements.map((element) => (
                      <div key={element.id} className="relative">
                        <button
                          type="button"
                          onClick={() => onRemoveElement(element.id)}
                          className="absolute right-3 top-3 z-10 rounded-full border border-[var(--site-line)] bg-[var(--site-card)]/90 p-2 text-[var(--site-muted)] transition hover:text-[var(--site-text)]"
                          aria-label={`Eliminar ${element.title}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <BodyElementCard element={element} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            <div className="relative rounded-[1.8rem] border border-[var(--site-line)] bg-[var(--site-footer-bg)] px-5 py-6 text-[var(--site-footer-text)]">
              <BlockTag label="Footer" />
              <div className="pt-7">
                <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div>
                    <EditableText
                      id="footer-el-1"
                      value={homeTexts["footer-el-1"]}
                      selected={selectedTextId === "footer-el-1"}
                      editable={textEditMode}
                      className="text-[0.64rem] uppercase tracking-[0.34em] text-[var(--site-accent)]"
                      onSelect={onSelectText}
                      onChange={onTextChange}
                      onBlur={onClearSelectedText}
                    />
                    <EditableText
                      id="footer-el-2"
                      value={homeTexts["footer-el-2"]}
                      selected={selectedTextId === "footer-el-2"}
                      editable={textEditMode}
                      className="mt-3 block text-2xl font-light tracking-[0.08em]"
                      onSelect={onSelectText}
                      onChange={onTextChange}
                      onBlur={onClearSelectedText}
                    />
                  </div>
                  <div className="flex items-center gap-3 text-[var(--site-footer-muted)]">
                    {(
                      [
                        "footer-icon-1",
                        "footer-icon-2",
                        "footer-icon-3",
                      ] as const
                    ).map((iconId) => {
                      const Icon = footerIconComponents[homeIcons[iconId]];

                      return (
                        <div key={iconId} className="relative">
                          <button
                            type="button"
                            onClick={(event) => handleIconButtonClick(event, iconId)}
                            className={cn(
                              "rounded-full border border-[var(--site-icon-border)] p-3 transition",
                              iconEditMode && "hover:bg-white/6",
                              selectedIconId === iconId && iconEditMode && "ring-2 ring-[#FF8904]/70 ring-offset-2 ring-offset-transparent",
                            )}
                            disabled={!iconEditMode}
                          >
                            <Icon className="h-4 w-4" />
                          </button>
                          {iconEditMode && selectedIconId === iconId ? (
                            <div
                              className={cn(
                                "absolute left-1/2 z-30 w-44 -translate-x-1/2 rounded-[1.2rem] border border-white/10 bg-[#0b1020] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.35)]",
                                iconMenuPlacement === "bottom" ? "top-full mt-3" : "bottom-full mb-3",
                              )}
                            >
                              <div
                                className={cn(
                                  "pointer-events-none absolute left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border border-white/10 bg-[#0b1020]",
                                  iconMenuPlacement === "bottom"
                                    ? "-top-1.5 border-r-0 border-b-0"
                                    : "-bottom-1.5 border-l-0 border-t-0",
                                )}
                              />
                              <div className="grid grid-cols-4 gap-2">
                                {iconOptions.map((option) => {
                                  const OptionIcon = footerIconComponents[option.id];

                                  return (
                                    <button
                                      key={option.id}
                                      type="button"
                                      onClick={() => onIconChange(selectedIconId, option.id)}
                                      className={cn(
                                        "flex h-10 w-10 items-center justify-center rounded-full border transition",
                                        activeIconOption === option.id
                                          ? "border-[#FF8904]/45 bg-[#FF8904]/10 text-white"
                                          : "border-white/10 bg-white/[0.03] text-white/78 hover:bg-white/[0.06]",
                                      )}
                                      aria-label={option.label}
                                      title={option.label}
                                    >
                                      <OptionIcon className="h-4 w-4" />
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
