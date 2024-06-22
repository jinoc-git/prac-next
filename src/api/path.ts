import axios from 'axios';

import type { PinContentsType } from '@/types/supabase';

interface Parameters {
  origin: string;
  destination: string;
}

interface Route {
  result_code: number;
  result_msg: string;
  summary: {
    distance: number;
  };
}

interface Routes {
  routes: Route[];
}

export const getPath = async (params: Parameters) => {
  try {
    const { data } = await axios.get<Routes>('https://apis-navi.kakaomobility.com/v1/directions', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_MOBILITY_KEY}`,
      },
      params,
    });

    if (data.routes[0].result_code === 0) return data.routes[0].summary.distance;
    else return 0;
  } catch (error) {
    throw new Error('카카오 모빌리티 계산 오류');
  }
};

export const calcPath = async (distance: PinContentsType[]) => {
  const convertParameters = distance.map(({ lng, lat }) => {
    if (lat && lng) return `${lng},${lat}`;

    return undefined;
  });

  const newData: string[] = [];

  for (let i = 0; i < convertParameters.length - 1; i++) {
    const data = await getPath({
      origin: convertParameters[i] as string,
      destination: convertParameters[i + 1] as string,
    });

    const distanceInKm = data / 1000;

    newData.push(distanceInKm.toFixed(1));
  }

  return newData;
};
