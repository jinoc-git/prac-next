'use client';

import React, { useEffect, useState } from 'react';

import type { PinContentsType } from '@/types/supabase';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  pins: PinContentsType[];
}

const KAKAO_MAP_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false&libraries=services,clusterer`;

const KakaoMap = ({ pins }: Props) => {
  const [map, setMap] = useState(null);
  const style = {};

  useEffect(() => {
    const kakaoScript = document.createElement('script');
    kakaoScript.src = KAKAO_MAP_URL;
    document.head.appendChild(kakaoScript);

    kakaoScript.onload = () => {
      if (window.kakao) {
        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById('kakao-map');
          const mapOption = {
            center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
            level: 3,
          };
          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          const zoomControl = new window.kakao.maps.ZoomControl();
          map.addControl(
            zoomControl,
            window.kakao.maps.ControlPosition.TOPRIGHT,
          );
          const mapTypeControl = new window.kakao.maps.MapTypeControl();

          map.addControl(
            mapTypeControl,
            window.kakao.maps.ControlPosition.RIGHT,
          );

          setMap(map);
        });
      }
    };
  }, []);

  useEffect(() => {
    if (window.kakao && map && pins?.length > 0) {
      pins.forEach(({ lat, lng }) => {
        const position = new window.kakao.maps.LatLng(lat, lng);
        new window.kakao.maps.Marker({ map, position });
      });
    }
  }, [pins, map]);

  return (
    <div className="flex justify-center sm:w-[286px] sm:ml-0 md:w-[650px] md:ml-[25px]">
      <div id="kakao-map" className=" w-full h-[400px]"></div>
    </div>
  );
};

export default KakaoMap;
