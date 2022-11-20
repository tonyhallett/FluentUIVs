import { ProgressIndicator } from "@fluentui/react";
import { VsColors } from "./themeColors";

export function renderPercentage(percentage: number | null, vsColors: VsColors) {
  const { EnvironmentColors } = vsColors;
  const backgroundColor = percentage === null ? "transparent" : EnvironmentColors.VizSurfaceGreenMedium;
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
