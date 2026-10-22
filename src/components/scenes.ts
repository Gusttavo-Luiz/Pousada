/**
 * Ilustrações em traço (120×120) exibidas nas molduras enquanto não há
 * fotografia oficial. Indicam o tipo de ambiente, sem representá-lo.
 */
export const scenes = {
  house:
    '<path d="M22 94V54l38-28 38 28v40"/><path d="M14 60 60 26l46 34"/><path d="M50 94V70h20v24"/><path d="M32 62h10v10H32zM78 62h10v10H78z"/><path d="M10 94h100"/>',
  bed:
    '<path d="M16 38v56M16 74h88v12H16M104 86v8"/><path d="M104 74v-8a10 10 0 0 0-10-10H52v18"/><rect x="24" y="58" width="22" height="12" rx="6"/>',
  bath:
    '<path d="M12 62h96v8a20 20 0 0 1-20 20H32a20 20 0 0 1-20-20v-8Z"/><path d="M24 62V34a9 9 0 0 1 18 0"/><path d="M38 90l-4 8M82 90l4 8"/><circle cx="64" cy="52" r="3"/><circle cx="76" cy="46" r="4"/><circle cx="88" cy="54" r="2.5"/>',
  balcony:
    '<path d="M10 62l24-20 16 12 22-24 26 22 12-8"/><circle cx="92" cy="22" r="6"/><path d="M8 70h104M8 96h104M18 70v26M34 70v26M50 70v26M66 70v26M82 70v26M98 70v26"/>',
  armchair:
    '<path d="M32 58V46a10 10 0 0 1 10-10h36a10 10 0 0 1 10 10v12"/><path d="M22 60a8 8 0 0 1 16 0v14h44V60a8 8 0 0 1 16 0v22H22Z"/><path d="M30 82v8M90 82v8"/><path d="M104 30v48M96 30h16l-4-12h-8Z"/>',
  vase:
    '<path d="M46 96h28l4-26a16 16 0 0 0-8-14V48H50v8a16 16 0 0 0-8 14Z"/><path d="M60 48V22"/><path d="M60 40c-8 0-14-6-16-14 8 0 14 6 16 14ZM60 32c6-1 12-6 13-14-7 1-12 6-13 14Z"/><path d="M36 96h48"/>',
  table:
    '<path d="M34 58h52M60 58v30M48 88h24"/><path d="M60 58c-8-6-8-14 0-20 8 6 8 14 0 20"/><path d="M18 44v44M18 70h14v18M102 44v44M102 70H88v18"/>',
  mountains:
    '<path d="M8 92l30-40 18 22 22-34 34 52Z"/><path d="M62 64l8 6 8-8"/><circle cx="92" cy="26" r="8"/>',
} as const;

export type SceneName = keyof typeof scenes;
