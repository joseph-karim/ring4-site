import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Tally: {
      openPopup: (
        formId: string,
        options?: {
          key?: string;
          layout?: 'default' | 'modal';
          width?: number;
          alignLeft?: boolean;
          hideTitle?: boolean;
          overlay?: boolean;
          emoji?: {
            text: string;
            animation: 'none' | 'wave' | 'tada' | 'heart-beat' | 'spin' | 'flash' | 'bounce' | 'rubber-band' | 'head-shake';
          };
          autoClose?: number;
          showOnce?: boolean;
          doNotShowAfterSubmit?: boolean;
          customFormUrl?: string;
          hiddenFields?: Record<string, any>;
          onOpen?: () => void;
          onClose?: () => void;
          onPageView?: (page: number) => void;
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
    emoji?: {
      text: string;
      animation: 'none' | 'wave' | 'tada' | 'heart-beat' | 'spin' | 'flash' | 'bounce' | 'rubber-band' | 'head-shake';
    };
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
  const styleInjected = useRef(false);

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

    // Inject custom styles for Tally modal
    if (!styleInjected.current) {
      const style = document.createElement('style');
      style.innerHTML = `
        /* Ring4 Custom Tally Modal Styles */
        .tally-popup {
          border-radius: 24px !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
          overflow: hidden !important;
          border: 1px solid rgba(0, 85, 255, 0.1) !important;
          background: white !important;
        }

        .tally-popup iframe {
          border-radius: 24px !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
        }

        /* Enhanced overlay with Ring4 brand gradient */
        .tally-overlay {
          background: radial-gradient(ellipse at center, rgba(0, 85, 255, 0.08) 0%, rgba(0, 0, 0, 0.4) 100%) !important;
          backdrop-filter: blur(12px) saturate(150%) !important;
          -webkit-backdrop-filter: blur(12px) saturate(150%) !important;
        }

        /* Premium close button design */
        .tally-close-button {
          width: 40px !important;
          height: 40px !important;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%) !important;
          border-radius: 50% !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          border: 1px solid rgba(0, 0, 0, 0.05) !important;
          cursor: pointer !important;
        }

        .tally-close-button:hover {
          transform: scale(1.1) rotate(90deg) !important;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%) !important;
        }

        .tally-close-button svg {
          width: 18px !important;
          height: 18px !important;
          stroke: #475569 !important;
          stroke-width: 2 !important;
          transition: stroke 0.3s ease !important;
        }

        .tally-close-button:hover svg {
          stroke: #0055FF !important;
        }

        /* Smooth entrance animation */
        @keyframes tallySlideIn {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes tallyFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .tally-popup {
          animation: tallySlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }

        .tally-overlay {
          animation: tallyFadeIn 0.3s ease-out !important;
        }

        /* Enhanced mobile responsiveness */
        @media (max-width: 640px) {
          .tally-popup {
            margin: 12px !important;
            width: calc(100% - 24px) !important;
            max-width: none !important;
            height: calc(100vh - 24px) !important;
            max-height: calc(100vh - 24px) !important;
            border-radius: 20px !important;
          }
          
          .tally-popup iframe {
            border-radius: 20px !important;
          }
        }

        /* Custom scrollbar matching Ring4 brand */
        .tally-popup iframe {
          scrollbar-width: thin;
          scrollbar-color: #0055FF #f1f5f9;
        }

        .tally-popup iframe::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .tally-popup iframe::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }

        .tally-popup iframe::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #0055FF 0%, #003399 100%);
          border-radius: 4px;
          border: 1px solid #e2e8f0;
        }

        .tally-popup iframe::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #003399 0%, #002266 100%);
        }

        /* Loading state styles */
        .tally-popup.tally-loading::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border: 3px solid #f3f4f6;
          border-top-color: #0055FF;
          border-radius: 50%;
          animation: tallySpinner 0.8s linear infinite;
        }

        @keyframes tallySpinner {
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        /* Form styling overrides for Tally content */
        .tally-popup iframe body {
          font-family: inherit !important;
        }

        /* Body class for blur effect when modal is open */
        body.tally-modal-open {
          overflow: hidden !important;
        }

        body.tally-modal-open > *:not(.tally-overlay):not(.tally-popup) {
          filter: blur(2px);
          transition: filter 0.3s ease;
        }

        /* Enhanced header area if visible */
        .tally-popup .tally-form-header {
          background: linear-gradient(135deg, #0055FF 0%, #003399 100%) !important;
          color: white !important;
          padding: 24px !important;
          font-weight: 600 !important;
        }

        /* Ring4 branded emoji animation */
        .tally-emoji-animation {
          display: inline-block;
          font-size: 48px;
          margin-bottom: 16px;
        }

        @keyframes ring4Wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
        }

        .tally-emoji-animation.wave {
          animation: ring4Wave 0.8s ease-in-out 3;
        }
      `;
      document.head.appendChild(style);
      styleInjected.current = true;
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
        width: modalOptions.width || 650, // Optimized width for better content display
        hideTitle: modalOptions.hideTitle || false,
        overlay: modalOptions.overlay !== false, // Default to true
        emoji: modalOptions.emoji || {
          text: '📞',
          animation: 'wave'
        },
        hiddenFields: hiddenFields,
        autoClose: 3000, // Auto close after successful submission
        onOpen: () => {
          console.log('Tally form opened');
          // Add body class for additional styling
          document.body.classList.add('tally-modal-open');
          
          // Add smooth scroll prevention
          const scrollY = window.scrollY;
          document.body.style.position = 'fixed';
          document.body.style.top = `-${scrollY}px`;
          document.body.style.width = '100%';
          
          onOpen?.();
        },
        onClose: () => {
          console.log('Tally form closed');
          // Remove body class and restore scroll
          document.body.classList.remove('tally-modal-open');
          
          const scrollY = document.body.style.top;
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.width = '';
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
          
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