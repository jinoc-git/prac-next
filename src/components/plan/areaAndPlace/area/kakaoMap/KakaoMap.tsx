'use client';

import React, { useEffect } from 'react';

import useKakaoMap from '@/hooks/useKakaoMap';

import type { PinContentsType } from '@/types/supabase';

interface Props {
  pins: PinContentsType[];
}

const KakaoMap = ({ pins }: Props) => {
  const { map, makeMap, makeMarker, makePolyline } = useKakaoMap();

  useEffect(() => {
    makeMap({
      containerId: 'add-plan-kakao-map',
      center: { lat: 37.566826, lng: 126.9786567 },
      level: 4,
      zoom: 'TOPRIGHT',
      mapType: 'RIGHT',
    });
  }, []);

  useEffect(() => {
    if (map && pins?.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      const path: any[] = [];

      pins.forEach(({ lat, lng }) => {
        const position = new window.kakao.maps.LatLng(lat, lng);
        bounds.extend(position);

        makeMarker({ lat, lng });
        path.push(position);
      });

      map.setBounds(bounds);

      makePolyline({
        map,
        path,
        strokeWeight: 5,
        strokeColor: '#162F70',
        strokeOpacity: 0.7,
        strokeStyle: 'solid',
      });
    }
  }, [pins, map]);

  return (
    <div className="flex justify-center sm:w-[286px] sm:ml-0 md:w-[650px] md:ml-[25px]">
      <div id="add-plan-kakao-map" className=" w-full h-[400px]"></div>
    </div>
  );
};

export default KakaoMap;
