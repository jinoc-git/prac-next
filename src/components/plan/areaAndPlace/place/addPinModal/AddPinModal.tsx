'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import _ from 'lodash';

import ModalButton from '@/components/common/button/ModalButton';
import TitleInput from '@/components/common/input/TitleInput';
import ModalLayout from '@/components/common/layout/ModalLayout';
import useConfirm from '@/hooks/useConfirm';
import useKakaoMap from '@/hooks/useKakaoMap';
import useKakaoMapServices from '@/hooks/useKakaoMapServices';
import { addPinSchema } from '@/schema/addPinModalSchema';
import { usePinStoreActions, usePinStoreState } from '@/store/pinStore';
import { addCommas, removeCommas } from '@/utils/numberFormat';

import AddPinKakaoMap from './addPinKakaoMap/AddPinKakaoMap';

import type { PinContentsType } from '@/types/supabase';

export interface AddPinInputType {
  placeName: string;
  address: string;
  cost: string;
}

interface Props {
  isAnimate: boolean;
  currentPage: number;
  setPins: React.Dispatch<React.SetStateAction<PinContentsType[][]>>;
  closeModal: () => void;
}

const AddPinModal = (props: Props) => {
  const { isAnimate, currentPage, setPins, closeModal } = props;

  const { pin, idx } = usePinStoreState();
  const { resetPin } = usePinStoreActions();

  const confirm = useConfirm();
  const { map, makeMap, makeLatLng, makeMarker, makeBounds } = useKakaoMap();
  const { getAddress, searchKeyword } = useKakaoMapServices();

  const [position, setPosition] = React.useState({
    lat: pin !== null ? (pin.lat as number) : 0,
    lng: pin !== null ? (pin.lng as number) : 0,
  });
  const [roadAddress, setRoadAddress] = React.useState('');

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
      address: pin !== null ? pin.address : '',
      cost: pin?.cost ? pin.cost : '0',
    },
  });

  const searchAddress = async (keyWord: string) => {
    if (keyWord === '') return;
    const coord = await searchKeyword(keyWord);
    setPosition(coord);

    const bounds = makeBounds();
    const markerPosition = makeLatLng(coord);
    bounds.extend(markerPosition);

    if (map) {
      makeMarker(coord);
      map.setBounds(bounds);
    }

    const address = await getAddress(coord);
    setRoadAddress(address);
  };

  const debouncedSearchAddress = _.debounce(searchAddress, 500);

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearchAddress(e.target.value);
  };

  const onChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 8) val = val.substring(0, 8);

    setValue('cost', addCommas(+val));
  };

  const handleAddPin: SubmitHandler<AddPinInputType> = (data) => {
    const { placeName, cost } = data;
    const removeCommaCost = cost ? removeCommas(cost) : '0';

    const newPin: PinContentsType = {
      id: uuid(),
      lat: position.lat,
      lng: position.lng,
      placeName,
      address: roadAddress,
      cost: removeCommaCost,
    };

    if (pin !== null) {
      const confTitle = '장소 수정';
      const confDesc = '이대로 수정하시겠습니까?';
      const confFunc = () => {
        setPins((state) => {
          return state.map((item, i) => {
            if (i === currentPage) {
              item[idx] = newPin;
              return [...item];
            }

            return item;
          });
        });

        closeModal();
        resetPin();
      };

      confirm.default(confTitle, confDesc, confFunc);
    } else {
      const confTitle = '장소 추가';
      const confDesc = '이대로 추가하시겠습니까?';
      const confFunc = () => {
        setPins((state) => {
          return state.map((item, i) => {
            if (i === currentPage) return [...item, newPin];

            return item;
          });
        });

        closeModal();
        resetPin();
      };

      confirm.default(confTitle, confDesc, confFunc);
    }
  };

  const shouldBlockSubmit =
    position.lat === 0 || position.lng === 0 || isSubmitting || watch('placeName').length === 0;

  React.useEffect(() => {
    return () => {
      resetPin();
    };
  }, []);

  return (
    <ModalLayout isAnimate={isAnimate}>
      <form onSubmit={handleSubmit(handleAddPin)} className="space-y-3">
        <div>
          <h4 className="mb-[8px] text-navy text-lg font-bold">방문할 장소</h4>
          <p className="text-[16px] font-normal mb-[16px]">
            방문할 장소와 관련된 정보를 저장하세요.
          </p>
        </div>
        <TitleInput
          title="장소 이름"
          name="placeName"
          placeholder="장소 이름을 입력하세요."
          register={register('placeName')}
          showErrorText={true}
          errors={errors}
        />
        <TitleInput
          title="주소"
          name="address"
          placeholder="주소를 검색하세요."
          register={register('address', { onChange: onChangeAddress })}
        />
        <AddPinKakaoMap pin={pin} makeMap={makeMap} makeMarker={makeMarker} />
        <TitleInput
          title="지출 비용"
          name="cost"
          placeholder="지출 비용을 입력하세요."
          defaultValue="0"
          register={register('cost', { onChange: onChangeCost })}
        />
        <div className="flex gap-2 h-[44px] items-center">
          <ModalButton
            value="취소"
            fill={false}
            type="button"
            name="add-pin-modal-cancle-button"
            onClick={closeModal}
          />
          <ModalButton
            value="새 장소 추가"
            fill={true}
            type="button"
            name="add-pin-modal-submit-button"
            disabled={shouldBlockSubmit}
            onClick={handleSubmit(handleAddPin)}
          />
        </div>
      </form>
    </ModalLayout>
  );
};

export default AddPinModal;
