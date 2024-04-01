'use client';

import React, { useEffect, useState } from 'react';

import type { PinContentsType } from '@/types/supabase';

interface Props {
  pin: PinContentsType | null;
  setMap: React.Dispatch<React.SetStateAction<null>>;
  position: {
    lat: number;
    lng: number;
  };
  setPosition: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

interface KakaoMapPosition {
  latitude: number;
  longitude: number;
  getLat: () => number;
  getLng: () => number;
}

const AddPinKakaoMap = (props: Props) => {
  const { pin, setMap, setPosition, setAddress } = props;
  const [marker, setMarker] = useState(null);

  const geocoder = new window.kakao.maps.services.Geocoder();
  const searchAddr = (position: KakaoMapPosition) => {
    const callback = (result: any) => {
      const RoadAddress = result[0]?.road_address?.address_name;
      const Address = result[0]?.address?.address_name;
      setAddress(RoadAddress !== undefined ? RoadAddress : Address);
    };
    geocoder.coord2Address(position.getLng(), position.getLat(), callback);
  };

  useEffect(() => {
    const mapContainer = document.getElementById('add-pin-kakao-map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(
        pin !== null ? pin.lat : 37.566826,
        pin !== null ? pin.lng : 126.9786567,
      ),
      level: 4,
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.TOPRIGHT);

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
