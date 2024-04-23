import { create } from 'zustand';

interface State {
  modifyState: 'modify' | 'readOnly';
  requiredDates: {
    start: boolean;
    end: boolean;
  };
}

interface Actions {
  setModify: () => void;
  setReadOnly: () => void;
  setRequiredDates: (type: 'start' | 'end') => void;
  clearRequiredDates: () => void;
}

interface Store {
  state: State;
  actions: Actions;
}

export const modifyPlanStore = create<Store>((set, get) => ({
  state: {
    modifyState: 'readOnly',
    requiredDates: {
      start: false,
      end: false,
    },
  },
  actions: {
    setModify: () => {
      set(({ state }) => ({
        state: {
          ...state,
          modifyState: 'modify',
        },
      }));
    },
    setReadOnly: () => {
      set(({ state }) => ({
        state: {
          ...state,
          modifyState: 'readOnly',
        },
      }));
    },
    setRequiredDates: (type: 'start' | 'end') => {
      const state = get().state;
      if (type === 'start') {
        set({
          state: {
            modifyState: state.modifyState,
            requiredDates: {
              ...state.requiredDates,
              start: true,
            },
          },
        });
      } else {
        set({
          state: {
            modifyState: state.modifyState,
            requiredDates: {
              ...state.requiredDates,
              end: true,
            },
          },
        });
      }
    },
    clearRequiredDates: () => {
      const state = get().state;
      set({
        state: {
          modifyState: state.modifyState,
          requiredDates: {
            start: false,
            end: false,
          },
        },
      });
    },
  },
}));

export const useModifyPlanStoreState = () =>
  modifyPlanStore((store) => store.state);
export const useModifyPlanStoreActions = () =>
  modifyPlanStore((store) => store.actions);
