'use client';

import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';

import TitleInput from '@/components/common/input/TitleInput';
import ModalLayout from '@/components/common/layout/ModalLayout';
import { addPinSchema } from '@/schema/addPinModalSchema';
import { pinStore } from '@/store/pinStore';
import { addCommas } from '@/utils/numberFormat';

import AddPinKakaoMap from './addPinKakaoMap/AddPinKakaoMap';

import type { PinContentsType } from '@/types/supabase';

export interface AddPinInputType {
  placeName: string;
  address: string;
  cost?: string;
}

interface Props {
  isAnimate: boolean;
  currentPage: number;
  setPins: React.Dispatch<React.SetStateAction<PinContentsType[][]>>;
  closeModal: () => void;
}

const AddPinModal = (props: Props) => {
  const { isAnimate, currentPage, setPins, closeModal } = props;
  const { pin, idx, resetPin } = pinStore();

  const [position, setPosition] = useState({
    lat: pin !== null ? (pin.lat as number) : 0,
    lng: pin !== null ? (pin.lng as number) : 0,
  });
  const [address, setAddress] = useState('');
  const [map, setMap] = useState<any>(null);

  const resolver = yupResolver(addPinSchema);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddPinInputType>({
    mode: 'onChange',
    resolver,
    defaultValues: {
      placeName: pin !== null ? pin.placeName : '',
      cost: pin !== null && typeof pin.cost === 'string' ? pin.cost : '0',
    },
  });

  const searchCallback = useCallback((result: any) => {
    const RoadAddress = result[0]?.road_address?.address_name;
    const Address = result[0]?.address?.address_name;
    setAddress(RoadAddress !== undefined ? RoadAddress : Address);
  }, []);

  const searchAddress = useCallback(
    (keyWord: string) => {
      if (keyWord === '') return;

      const ps = new window.kakao.maps.services.Places();
      const geocoder = new window.kakao.maps.services.Geocoder();

      ps.keywordSearch(keyWord, (data: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const bounds = new window.kakao.maps.LatLngBounds();
          const { x, y } = data[0];

          geocoder.coord2Address(+x, +y, searchCallback);
          const markerPosition = new window.kakao.maps.LatLng(+y, +x);
          bounds.extend(markerPosition);
          setPosition({ lat: +y, lng: +x });
          if (map) {
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
            });

            map.setBounds(bounds);
            marker.setMap(map);
          }
        }
      });
    },
    [map],
  );

  const debouncedSearchAddress = _.debounce(searchAddress, 500);

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearchAddress(e.target.value);
  };

  const onChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 8) val = val.substring(0, 8);

    setValue('cost', addCommas(+val));
  };

  return (
    <ModalLayout isAnimate={isAnimate}>
      <TitleInput
        title="장소 이름"
        name="placeName"
        placeholder="장소 이름을 입력하세요."
        register={register('placeName')}
        errors={errors}
      />
      <TitleInput
        title="주소"
        name="address"
        placeholder="주소를 검색하세요."
        register={register('address', { onChange: onChangeAddress })}
        errors={errors}
      />
      <AddPinKakaoMap pin={pin} setMap={setMap} />
      <TitleInput
        title="지출 비용"
        name="cost"
        placeholder="지출 비용을 입력하세요."
        defaultValue="0"
        register={register('cost', { onChange: onChangeCost })}
        errors={errors}
      />
    </ModalLayout>
  );
};

export default AddPinModal;
