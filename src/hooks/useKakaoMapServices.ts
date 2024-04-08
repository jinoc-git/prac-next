import type { LatLng } from '@/types/aboutKakaoMap.type';

const useKakaoMapServices = () => {
  const ps = new window.kakao.maps.services.Places();
  const geocoder = new window.kakao.maps.services.Geocoder();

  const getAddress = async ({ lat, lng }: LatLng): Promise<string> => {
    return new Promise((resolve, reject) => {
      let result = '';

      geocoder.coord2Address(lng, lat, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const roadAddress = result[0]?.road_address?.address_name;
          const address = result[0]?.address?.address_name;

          result = roadAddress ? roadAddress : address;
          resolve(result);
        } else {
          reject(result);
        }
      });

      return result;
    });
  };

  const searchKeyword = async (
    keyWord: string,
  ): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      let lat = 0;
      let lng = 0;

      ps.keywordSearch(keyWord, (data: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const { x, y } = data[0];
          lat = y;
          lng = x;

          resolve({ lat, lng });
        } else {
          reject({ lat, lng });
        }
      });
    });
  };

  return { getAddress, searchKeyword };
};

export default useKakaoMapServices;
