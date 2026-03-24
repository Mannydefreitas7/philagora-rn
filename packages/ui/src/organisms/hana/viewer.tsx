"use dom";

import { createComponent } from "@lit/react";
import type { EventsTargetType } from "@repo/hana";
import { SplineViewer } from "@repo/hana"; // registers <hana-viewer> custom element
import * as React from "react";
import type { JSX } from "react/jsx-runtime";

// declare module "react" {
//   namespace JSX {
//     interface IntrinsicElements {
//       "hana-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
//         url?: string;
//         width?: number;
//         height?: number;
//         loading?: "lazy" | "eager";
//         unloadable?: boolean;
//         eventsTarget?: EventsTargetType;
//       };
//     }
//   }
// }

type HanaViewerProps = { dom?: import("expo/dom").DOMProps } & {
  url: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  unloadable?: boolean;
  eventsTarget?: EventsTargetType;
};

const HanaSplineViewer = createComponent<SplineViewer>({
  tagName: "hana-viewer",
  elementClass: SplineViewer,
  react: React,
});

const HanaViewer = ({
  url,
  width,
  height,
  loading = "lazy",
  unloadable = false,
  eventsTarget = "local",
}: HanaViewerProps): JSX.Element => {
  return (
    <div>
      <HanaSplineViewer
        url={url}
        width={width}
        height={height}
        loading={loading}
        unloadable={unloadable}
        eventsTarget={eventsTarget}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

// <script type="module" src="https://cdn.spline.design/@splinetool/hana-viewer@1.2.51/hana-viewer.js"></script><hana-viewer url="https://prod.spline.design/de2BW6nSMDSzw5d7-Im5/scene.hanacode"></hana-viewer>
export default HanaViewer;
