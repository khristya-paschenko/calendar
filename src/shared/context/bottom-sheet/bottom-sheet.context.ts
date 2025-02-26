import { createContext, RefObject, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { ERepeat } from '~/shared/context/calendar/calendar.types';

export interface BottomSheetContext {
  showDrawer: () => void;
  closeDrawer: () => void;
  option: ERepeat;
  setOption: (content: ERepeat) => void;
}

export const BottomSheetContext = createContext<BottomSheetContext>({});

export const useBottomSheet = (
  bottomSheetRef: RefObject<BottomSheet>,
): BottomSheetContext => {
  const showDrawer = () => {
    bottomSheetRef.current?.expand();
  };

  const closeDrawer = () => {
    bottomSheetRef.current?.close();
  };

  const [option, setOption] = useState<ERepeat>(ERepeat.ONCE);

  return {
    showDrawer,
    option,
    setOption,
    closeDrawer,
  };
};
