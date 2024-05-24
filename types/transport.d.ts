type MESSAGE_TYPE_EVENT = string;
type MESSAGE_TYPE_REQUEST = string;
type MESSAGE_TYPE_RESPONSE = string;

type RequestErrorDetails = {
  name: string;
  message: string;
};
type RequestErrorCallback = (props: { error: RequestErrorDetails }) => void;
type RequestSuccessCallback = (props: { result: object }) => void;

type TransportEventHandlerProps = {
  event: string;
  payload?: object;
};

type TransportRequestHandlerProps = {
  request: string;
  payload?: object;
  onComplete: RequestErrorCallback | RequestSuccessCallback;
};

interface TransportProps {
  scope: string;
  window: Window;
  eventHandler: (props: TransportEventHandlerProps) => void;
  requestHandler?: (props: TransportRequestHandlerProps) => void;
}

declare class Transport {
  constructor(props: TransportProps);
  destroy(): void;
  sendEvent(event: string, payload?: object): void;
  sendRequest(request: string, payload?: object): Promise<object>;
}
