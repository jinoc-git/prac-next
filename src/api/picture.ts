import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';

import { supabaseClientClient } from './auth';

export const addPictures = async (fileList: File[], planId: string) => {
  const pathList: string[] = [];

  for (const file of fileList) {
    const { data } = await supabaseClientClient.storage
      .from('add-photo')
      .upload(`${planId}/${uuid()}`, file);

    if (data) {
      const URL = `${process.env.REACT_APP_SB_STORAGE_URL}/add-photo/${data.path}`;
      pathList.push(URL);
    }
  }

  return pathList;
};
