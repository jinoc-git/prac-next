'use client';

import React from 'react';
import {
  Map,
  MapMarker,
  MapTypeControl,
  Polyline,
  ZoomControl,
} from 'react-kakao-maps-sdk';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';

import type { PinContentsType } from '@/types/supabase';

interface Props {
  pins: PinContentsType[];
}

const KakaoMap = ({ pins }: Props) => {
  const style = {};
  return (
    <div className="flex justify-center sm:w-[286px] sm:ml-0 md:w-[650px] md:ml-[25px]">
      <Map
        center={{
          lat:
            pins !== undefined && pins.length !== 0
              ? (pins[0].lat as number)
              : 37.566826004661,
          lng:
            pins !== undefined && pins.length !== 0
              ? (pins[0].lng as number)
              : 126.978652258309,
        }}
        level={4}
        style={style}
      >
        {pins?.map((pin) => {
          return (
            <MapMarker
              key={uuid()}
              position={{
                lat: pin?.lat as number,
                lng: pin?.lng as number,
              }}
            ></MapMarker>
          );
        })}
        {pins !== undefined && pins.length !== 0 && (
          <Polyline
            path={pins.map((pin) => {
              return {
                lat: pin.lat as number,
                lng: pin.lng as number,
              };
            })}
            strokeWeight={5}
            strokeColor={'#162F70'}
            strokeOpacity={0.7}
            strokeStyle={'solid'}
          />
        )}
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        <ZoomControl position={kakao.maps.ControlPosition.RIGHT} />
      </Map>
    </div>
  );
};

export default KakaoMap;
