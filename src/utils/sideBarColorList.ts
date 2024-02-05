export const SIED_CHIP_COLOR = {
  '여행 중': 'bg-blue',
  '여행 예정': 'bg-yellow',
  '여행 없음': 'bg-orange',
} as const;

export const SIDE_ICON_LIST = {
  bookMark: '/images/bookmark.svg',
  planning: '/images/side-planning.svg',
  end: '/images/side-end.svg',
} as const;

export const SIDE_LIST_NAME = {
  bookMark: '즐겨찾기 한 목록',
  planning: '예정된 여행',
  end: '다녀온 여행',
} as const;

export const SIDE_COLOR = {
  hover: {
    bookMark: 'md:hover:bg-red_light_1',
    planning: 'md:hover:bg-yellow_light_1',
    end: 'md:hover:bg-orange_light_1',
  },
  focus: {
    bookMark: 'focus:bg-red_light_1',
    planning: 'focus:bg-yellow_light_1',
    end: 'focus:bg-orange_light_1 ',
  },
  active: {
    bookMark: 'bg-red_light_1',
    planning: 'bg-yellow_light_1',
    end: 'bg-orange_light_1',
  },
} as const;

export const SIDE_INFO_BG = {
  '여행 중': 'bg-blue_light_1',
  '여행 예정': 'bg-yellow_light_1',
  '여행 없음': 'bg-orange_light_2',
} as const;
