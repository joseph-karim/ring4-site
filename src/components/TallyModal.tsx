import { useEffect } from 'react';

declare global {
  interface Window {
    Tally: {
      openPopup: (
        formId: string,
        options?: {
          layout?: 'default' | 'modal';
          width?: number;
          alignLeft?: boolean;
          hideTitle?: boolean;
          overlay?: boolean;
          autoClose?: number;
          hiddenFields?: Record<string, any>;
          onOpen?: () => void;
          onClose?: () => void;
          onSubmit?: (payload: any) => void;
        }
      ) => void;
      loadEmbeds: () => void;
    };
  }
}

interface TallyModalProps {
  formId?: string;
  buttonText: string;
  buttonClassName?: string;
  modalOptions?: {
    width?: number;
    hideTitle?: boolean;
    overlay?: boolean;
  };
  hiddenFields?: Record<string, any>;
  onOpen?: () => void;
  onClose?: () => void;
  onSubmit?: (payload: any) => void;
}

export default function TallyModal({
  formId = 'mOkko8', // Default Ring4 form ID
  buttonText,
  buttonClassName = '',
  modalOptions = {},
  hiddenFields = {},
  onOpen,
  onClose,
  onSubmit
}: TallyModalProps) {
  useEffect(() => {
    // Load Tally widget script if not already loaded
    if (typeof window.Tally === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      script.onload = () => {
        console.log('Tally widget loaded');
      };
      document.head.appendChild(script);
    }
  }, []);

  const openModal = () => {
    if (typeof window.Tally !== 'undefined') {
      // Track GTM event before opening
      if (window.gtag) {
        window.gtag('event', 'tally_form_open', {
          event_category: 'engagement',
          event_label: buttonText
        });
      }

      window.Tally.openPopup(formId, {
        layout: 'modal',
        width: modalOptions.width || 650,
        hideTitle: modalOptions.hideTitle || true,
        overlay: modalOptions.overlay !== false,
        hiddenFields: hiddenFields,
        autoClose: 3000,
        onOpen: () => {
          console.log('Tally form opened');
          onOpen?.();
        },
        onClose: () => {
          console.log('Tally form closed');
          onClose?.();
        },
        onSubmit: (payload) => {
          console.log('Tally form submitted:', payload);
          // Track GTM conversion event
          if (window.gtag) {
            window.gtag('event', 'tally_form_submit', {
              event_category: 'conversion',
              event_label: 'contact_form',
              value: 1
            });
          }
          onSubmit?.(payload);
        }
      });
    } else {
      console.error('Tally widget not loaded');
      // Fallback to redirect
      window.location.href = `https://tally.so/r/${formId}`;
    }
  };

  return (
    <button
      onClick={openModal}
      className={buttonClassName}
      data-event="tally_cta_click"
      data-label={buttonText}
    >
      {buttonText}
    </button>
  );
}