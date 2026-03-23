'use dom';

import { SplineViewer } from "@repo/utils/hana"; // registers <hana-viewer> custom element
import type { EventsTargetType } from "@repo/utils/hana";
import { createComponent } from '@lit/react';
import * as React from 'react';

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "hana-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url?: string;
        width?: number;
        height?: number;
        loading?: "lazy" | "eager";
        unloadable?: boolean;
        eventsTarget?: EventsTargetType;
      };
    }
  }
}

type HanaViewerProps = { dom?: import('expo/dom').DOMProps } & {
  url: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  unloadable?: boolean;
  eventsTarget?: EventsTargetType;
};

const HanaSplineViewer = createComponent({
  tagName: 'hana-viewer',
  elementClass: SplineViewer,
  react: React
});

const HanaViewer = ({
  url,
  width,
  height,
  loading = "lazy",
  unloadable = false,
  eventsTarget = "local",
}: HanaViewerProps) => {
  return (
    <HanaSplineViewer
      url={url}
      width={width}
      height={height}
      loading={loading}
      unloadable={unloadable}
      eventsTarget={eventsTarget}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default HanaViewer;
