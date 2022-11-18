import { ProgressIndicator } from "@fluentui/react";
import React from "react";
import { VsColors } from "./themeColors";

export function renderPercentage(percentage: number | null, vsColors: VsColors) {
  const { EnvironmentColors, HeaderColors } = vsColors;
  const backgroundColor = percentage === null ? "transparent" : EnvironmentColors.VizSurfaceGreenMedium; //HeaderColors.SeparatorLine
  return <ProgressIndicator barHeight={5} percentComplete={percentage === null ? 1 : percentage / 100} styles={{
    progressBar: {
      backgroundColor,
      color: "transparent"
    },
    progressTrack: {
      backgroundColor: "transparent",
      color: "transparent"
    },
    root: {
      width: '100px',
      color: "transparent"
    },
  }} />;
}
