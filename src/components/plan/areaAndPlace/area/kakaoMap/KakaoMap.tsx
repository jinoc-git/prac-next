'use client';

import React, { useEffect, useRef } from 'react';

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
  const style = {};
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const kakaoScript = document.createElement('script');
    kakaoScript.src = KAKAO_MAP_URL;
    document.head.appendChild(kakaoScript);

    kakaoScript.onload = () => {
      if (window.kakao && mapRef.current) {
        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById('kakao-map');
          const mapOption = {
            center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
            level: 3,
          };
          const map = new window.kakao.maps.Map(mapContainer, mapOption);
        });
      }
    };
  }, []);

  return (
    <div className="flex justify-center sm:w-[286px] sm:ml-0 md:w-[650px] md:ml-[25px]">
      <div ref={mapRef} id="kakao-map" className=" w-full h-[400px]"></div>
    </div>
  );
};

export default KakaoMap;
