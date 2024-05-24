export type MESSAGE_TYPE_EVENT = string;
export type MESSAGE_TYPE_REQUEST = string;
export type MESSAGE_TYPE_RESPONSE = string;

export type RequestErrorDetails = {
  name: string;
  message: string;
};
export type RequestErrorCallback = (props: { error: RequestErrorDetails }) => void;
export type RequestSuccessCallback = (props: { result: object }) => void;
export type RequestCallback = RequestErrorCallback | RequestSuccessCallback;

export type TransportEventHandlerProps = {
  event: string;
  payload?: object;
};

export type TransportRequestHandlerProps = {
  request: string;
  payload?: object;
  onComplete: RequestCallback;
};

export interface TransportProps {
  scope: string;
  window: Window;
  eventHandler: (props: TransportEventHandlerProps) => void;
  requestHandler?: (props: TransportRequestHandlerProps) => void;
}

export declare class Transport {
  constructor(props: TransportProps);
  destroy(): void;
  sendEvent(event: string, payload?: object): void;
  sendRequest(request: string, payload?: object): Promise<object>;
}
