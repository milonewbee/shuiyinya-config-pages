#!/usr/bin/env node

import { readFile } from "node:fs/promises";

const FIXED_XUNLEI_URL = "https://pan.xunlei.com/s/VOxegxfzh7rDnjeHMZoMRG5DA1?pwd=9sjd#";
const configPaths = process.argv.slice(2);

if (configPaths.length === 0) configPaths.push("version.json");

for (const configPath of configPaths) {
  const config = JSON.parse(await readFile(configPath, "utf8"));
  const channel = config.downloadChannels?.find((item) => item.name === "迅雷网盘");

  if (!channel) throw new Error(`${configPath}: missing 迅雷网盘 download channel`);
  if (channel.url !== FIXED_XUNLEI_URL) {
    throw new Error(`${configPath}: 迅雷网盘 must use the fixed revenue link`);
  }

  console.log(`PASS ${configPath}: fixed 迅雷网盘 link`);
}
