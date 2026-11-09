/* Payload admin root layout (generated shape from the Payload template) plus the Golden Wings theme */
import config from "@payload-config";
import "@payloadcms/next/css";
import "./custom.css";
import type { ServerFunctionClient } from "payload";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import { Cairo } from "next/font/google";
import type React from "react";
import { importMap } from "./admin/importMap.js";

// Same typeface as the public site, for Arabic and English
const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400", "600", "700", "800"], display: "swap" });

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {/* Payload renders <html> itself, so the font is handed to the theme through a CSS variable */}
      <style>{`:root{--gw-font:${cairo.style.fontFamily}}`}</style>
      {children}
    </RootLayout>
  );
}
