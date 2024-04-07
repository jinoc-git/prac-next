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
  const [map, setMap] = useState<any>(null);
  const style = {};

  useEffect(() => {
    const kakaoScript = document.createElement('script');
    kakaoScript.src = KAKAO_MAP_URL;
    document.head.appendChild(kakaoScript);

    kakaoScript.onload = () => {
      if (window.kakao) {
        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById('add-plan-kakao-map');
          const mapOption = {
            center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
            level: 4,
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
    if (map && pins?.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      const boundPosition = new window.kakao.maps.LatLng(
        pins[0].lat,
        pins[0].lng,
      );
      bounds.extend(boundPosition);
      map.setBounds(bounds);

      pins.forEach(({ lat, lng }) => {
        const position = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({ position });
        marker.setMap(map);

        const polyline = new window.kakao.maps.Polyline({
          map,
          path: pins.map(
            ({ lat, lng }) => new window.kakao.maps.LatLng(lat, lng),
          ),
          strokeWeight: 5,
          strokeColor: '#162F70',
          strokeOpacity: 0.7,
          strokeStyle: 'solid',
        });
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
