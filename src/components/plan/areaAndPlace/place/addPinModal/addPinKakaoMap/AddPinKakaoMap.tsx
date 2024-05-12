'use client';

import React, { useEffect } from 'react';

import type { LatLng, MakeMapArgs } from '@/types/aboutKakaoMap.type';
import type { PinContentsType } from '@/types/supabase';

interface Props {
  pin: PinContentsType | null;
  makeMap: (args: MakeMapArgs) => Promise<any>;
  makeMarker: ({ lat, lng }: LatLng, originMap?: any) => void;
}

const AddPinKakaoMap = (props: Props) => {
  const { pin, makeMap, makeMarker } = props;

  useEffect(() => {
    const init = async () => {
      const center = {
        lat: pin !== null ? pin.lat : 37.566826,
        lng: pin !== null ? pin.lng : 126.9786567,
      };

      const map = await makeMap({
        containerId: 'add-pin-kakao-map',
        center,
        level: 4,
        zoom: 'TOPRIGHT',
      });

      if (pin && map) {
        makeMarker(center, map);
      }
    };

    init();
  }, []);

  return (
    <div className="flex justify-center">
      <div id="add-pin-kakao-map" className="w-[420px] h-[160px] rounded-lg"></div>
    </div>
  );
};

export default AddPinKakaoMap;
