// React SVG Component

import React from "react";

function Spinner() {
  return (
    // By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL
    <svg
      viewBox="0 0 58 58"
      fill="currentColor"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-16 rounded-full bg-base-300 p-2 text-base-content">
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(2 1)" stroke="currentColor" strokeWidth="1.5">
          <circle
            cx="42.601"
            cy="11.462"
            r="5"
            fill-opacity="1"
            fill="currentColor">
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="1;0;0;0;0;0;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="49.063"
            cy="27.063"
            r="5"
            fill-opacity="0"
            fill="currentColor">
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;1;0;0;0;0;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="42.601"
            cy="42.663"
            r="5"
            fill-opacity="0"
            fill="currentColor">
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;1;0;0;0;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="27"
            cy="49.125"
            r="5"
            fill-opacity="0"
            fill="currentColor">
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;0;1;0;0;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="11.399"
            cy="42.663"
            r="5"
            fill-opacity="0"
            fill="currentColor">
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;0;0;1;0;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="4.938"
            cy="27.063"
            r="5"
            fill-opacity="0"
            fill="currentColor">
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;0;0;0;1;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="11.399"
            cy="11.462"
            r="5"
            fill-opacity="0"
            fill="currentColor">
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;0;0;0;0;1;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="27" cy="5" r="5" fill-opacity="0" fill="currentColor">
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;0;0;0;0;0;1"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
}

export default Spinner;
