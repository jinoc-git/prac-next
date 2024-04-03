'use client';

import React, { useEffect } from 'react';

import type { PinContentsType } from '@/types/supabase';

interface Props {
  pin: PinContentsType | null;
  setMap: React.Dispatch<React.SetStateAction<null>>;
}

interface KakaoMapPosition {
  latitude: number;
  longitude: number;
  getLat: () => number;
  getLng: () => number;
}

const AddPinKakaoMap = (props: Props) => {
  const { pin, setMap } = props;

  useEffect(() => {
    const mapContainer = document.getElementById('add-pin-kakao-map');

    const position = new window.kakao.maps.LatLng(
      pin !== null ? pin.lat : 37.566826,
      pin !== null ? pin.lng : 126.9786567,
    );
    const mapOption = {
      center: position,
      level: 4,
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    if (pin) {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(position),
      });

      marker.setMap(map);
    }

    setMap(map);
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
