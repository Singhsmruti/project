// <model-viewer> is a custom element, so TypeScript has no idea it exists in
// JSX until it is declared. React 19 moved the JSX namespace under the "react"
// module, so the augmentation goes there rather than in a bare global one.
//
// Only the attributes ProductViewer.tsx actually passes are typed. Adding the
// element's full surface would be a large lie about what has been checked.
import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src: string;
        alt?: string;
        poster?: string;
        /** Absent rather than false when off: the element treats any present
         *  boolean attribute as true, so `camera-controls={false}` still
         *  enables it. ProductViewer passes `undefined` deliberately. */
        "camera-controls"?: boolean;
        "touch-action"?: string;
        "shadow-intensity"?: string;
        "environment-image"?: string;
        "interaction-prompt"?: string;
        exposure?: string;
        loading?: "auto" | "lazy" | "eager";
      };
    }
  }
}
