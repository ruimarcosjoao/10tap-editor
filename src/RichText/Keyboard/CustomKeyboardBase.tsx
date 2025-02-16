import React, { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import { CustomKeyboardAndroid } from './CustomKeyboard.android';
import { CustomKeyboardIOS } from './CustomKeyboard.ios';
import type { CustomKeyboardExtension } from './CustomKeyboardExtension';
import type { EditorBridge } from '../../types';
import { useBridgeState } from '../useBridgeState';

interface CustomKeyboardProps {
  rootRef: React.RefObject<any>;
  keyboards: CustomKeyboardExtension[];
  setActiveKeyboardID: (id: string | undefined) => void;
  activeKeyboardID?: string;
  editor: EditorBridge;
}
export const CustomKeyboard = ({
  keyboards,
  activeKeyboardID,
  setActiveKeyboardID,
  rootRef,
  editor,
}: CustomKeyboardProps) => {
  const editorState = useBridgeState(editor);

  useEffect(() => {
    if (editorState.isFocused) {
      setActiveKeyboardID(undefined);
    }
  }, [editorState.isFocused, setActiveKeyboardID]);
  const customKeyboard =
    (activeKeyboardID && keyboards.find((k) => k.id === activeKeyboardID)) ||
    undefined;

  const onKeyboardHideAndroid = useCallback(() => {
    setActiveKeyboardID(undefined);
  }, [setActiveKeyboardID]);

  if (Platform.OS === 'ios') {
    return (
      <CustomKeyboardIOS rootRef={rootRef} customKeyboard={customKeyboard} />
    );
  }
  return (
    <CustomKeyboardAndroid
      rootRef={rootRef}
      customKeyboard={customKeyboard}
      onKeyboardHideAndroid={onKeyboardHideAndroid}
    />
  );
};
