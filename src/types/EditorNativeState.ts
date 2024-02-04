import type { RefObject } from 'react';
import type WebView from 'react-native-webview';
import type TenTapBridge from '../bridges/base';

export interface EditorNativeState {
  isFocused: boolean;
  isReady: boolean;
}

type Subscription<T> = (cb: (val: T) => void) => () => void;

export interface EditorInstance {
  focus: (pos?: 'start' | 'end' | 'all' | number | boolean | null) => void;
  initialContent?: string;
  webviewRef: RefObject<WebView>;
  updateScrollThresholdAndMargin: (offset: number) => void;
  getEditorState: () => EditorNativeState;
  _updateEditorState: (state: EditorNativeState) => void;
  _subscribeToEditorStateUpdate: Subscription<EditorNativeState>;
  plugins?: TenTapBridge<unknown, unknown, unknown>[];
}