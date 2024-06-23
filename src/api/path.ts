import axios from 'axios';

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
