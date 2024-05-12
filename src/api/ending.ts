import { addCommas } from '@/utils/numberFormat';

import { supabaseClientClient } from './auth';
import { getPath } from './path';
import { getAllPinsByIdAndDates } from './pins';
import { getPlanDate } from './plan';

import type { Distance, EndingPlanType, PinContentsType } from '@/types/supabase';

export const calcAllPath = async (allPinsContent: PinContentsType[][]) => {
  const distanceArr: Distance = [];

  for (const pinArr of allPinsContent) {
    const oneDay: string[][] = [];

    for (let i = 0; i < pinArr.length - 1; i++) {
      const { lat: originLat, lng: originLng } = pinArr[i];
      const { lat: destinationLat, lng: destinationLng } = pinArr[i + 1];

      try {
        const result = await getPath({
          origin: `${originLng},${originLat}`,
          destination: `${destinationLng},${destinationLat}`,
        });

        const distanceInKm = result / 1000;

        oneDay.push([`${i}`, distanceInKm.toFixed(1)]);
      } catch (err) {
        throw new Error('거리 계산 오류');
      }
    }

    if (oneDay.length === 0) distanceArr.push({ '0': '0' });
    else distanceArr.push(Object.fromEntries(oneDay));
  }

  return distanceArr;
};

export const getCosts = async (planId: string) => {
  const { dates } = await getPlanDate(planId);

  const data = await getAllPinsByIdAndDates(planId, dates);

  const result = data.map(({ contents }) => contents.map(({ cost }) => cost));

  return result;
};

export const calcCostAndInsertPlansEnding = async (planId: string) => {
  const datesCost: string[] = [];

  const response = await getCosts(planId);

  response.forEach((value) => {
    let totalCost = 0;

    value.forEach((cost) => {
      if (cost) totalCost += Number(cost.replaceAll(',', ''));
    });

    datesCost.push(addCommas(totalCost));
  });

  return datesCost;
};

export const insertPlanEnding = async (options: EndingPlanType) => {
  const { error } = await supabaseClientClient.from('plans_ending').insert(options);

  if (error) throw new Error('엔딩 데이터 추가 오류');
};

// export const getEndingData = async (planId: string) => {
//   const { data: distanceData, error: distanceError } = await supabaseClientClient
//     .from('plans_ending')
//     .select('distance')
//     .eq('id', planId);

//   if (distanceError) throw new Error('장소간 거리 불러오기 오류');

//   const { data: costData, error: costError } = await supabaseClientClient
//     .from('plans_ending')
//     .select('dates_cost')
//     .eq('id', planId);

//   if (costError) throw new Error('엔딩 비용 불러오기 오류');

//   const { data: pictureData, error: pictureError } = await supabaseClientClient
//     .from('plans_ending')
//     .select('pictures')
//     .eq('id', planId);

//   if (pictureError) throw new Error('저장한 사진 불러오기 오류');

//   return { distanceData, costData, pictureData };
// };

// export const getPhoto = async (planId: string) => {
//   const { data: endingData, error: endingError } = await supabaseClientClient
//     .from('plans_ending')
//     .select('pictures')
//     .eq('id', planId);

//   if (endingError !== null) {
//     throw new Error('사진 불러오기 오류');
//   }
//   return endingData;
// };

// export const getDates = async (planId: string) => {
//   const { data, error: plansError } = await supabaseClientClient
//     .from('plans')
//     .select('dates')
//     .eq('id', planId);

//   if (plansError !== null || data === null) {
//     console.log(plansError);
//     throw new Error('오류발생');
//   }

//   const datesArray = data[0].dates;

//   return datesArray;
// };

// export const getPlaceWithDate = async (planId: string) => {
//   const planDateList = await getPlanDate(planId);
//   const placeDataList = await getAllPins(planId, planDateList[0].dates);
//   const planDistanceList = await getEndingDistance(planId);

//   const result = placeDataList.map((item, i) => {
//     const day = planDateList[0].dates[i];
//     const mix = {
//       [day]: item.contents,
//       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//       distance: planDistanceList[0].distance![i],
//     };
//     return mix;
//   });

//   return result;
// };

// export const getEndingDistance = async (planId: string) => {
//   const { data: distanceData, error: distanceError } = await supabaseClientClient
//     .from('plans_ending')
//     .select('distance')
//     .eq('id', planId);

//   if (distanceError !== null) {
//     throw new Error('엔딩 거리 데이터 불러오기 오류');
//   }

//   return distanceData;
// };
