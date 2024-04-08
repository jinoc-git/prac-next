'use client';

import React, { useEffect } from 'react';

import type { LatLng, MakeMapArgs } from '@/types/aboutKakaoMap';
import type { PinContentsType } from '@/types/supabase';

interface Props {
  pin: PinContentsType | null;
  makeMap: (args: MakeMapArgs) => void;
  makeMarker: ({ lat, lng }: LatLng) => void;
}

const AddPinKakaoMap = (props: Props) => {
  const { pin, makeMap, makeMarker } = props;

  useEffect(() => {
    const center = {
      lat: pin !== null ? pin.lat : 37.566826,
      lng: pin !== null ? pin.lng : 126.9786567,
    };

    makeMap({
      containerId: 'add-pin-kakao-map',
      center,
      level: 4,
      zoom: 'TOPRIGHT',
    });

    if (pin) {
      makeMarker(center);
    }
  }, []);

  return (
    <div className="flex justify-center">
      <div
        id="add-pin-kakao-map"
        className="w-[420px] h-[160px] rounded-lg"
      ></div>
    </div>
  );
};

export default AddPinKakaoMap;
