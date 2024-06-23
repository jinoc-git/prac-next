import React from 'react';

interface Props {
  planId: string;
  onClickQuitBtn: (id: string) => void;
}

export default function PlanCardQuitButton(props: Props) {
  const { planId, onClickQuitBtn } = props;

  return (
    <button
      className="group sm:mt-[2px] md:mt-[4px] sm:w-[16px] sm:h-[16px] md:w-[24px] md:h-[24px]"
      aria-label="card-quit-plan-btn"
      onClick={(e) => {
        e.stopPropagation();
        onClickQuitBtn(planId);
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="sm:w-[16px] sm:h-[16px] md:w-[24px] md:h-[24px]"
      >
        <path
          d="M10 2H2V22H10V20H4L4 4H10V2Z"
          fill="#FFB979"
          stroke="#FFB979"
          className="group-hover:stroke-orange_dark group-hover:fill-orange_dark normal-transition"
        />
        <path
          d="M6 10H16L16 6L24 12L16 18V14H6V10Z"
          fill="#FFB979"
          stroke="#FFB979"
          className="group-hover:stroke-orange_dark group-hover:fill-orange_dark normal-transition"
        />
      </svg>
    </button>
  );
}
