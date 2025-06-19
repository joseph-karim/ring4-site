declare global {
  interface Window {
    gtag?: (
      type: string,
      action: string,
      parameters?: {
        event_category?: string;
        event_label?: string;
        event_value?: number;
        [key: string]: any;
      }
    ) => void;
  }
}

export {};