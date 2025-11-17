import { toast as reactToastify } from "react-toastify";

/**
 * Centralized toast utility function
 * Ensures consistent toast behavior across the application
 * Auto-closes after 3 seconds by default
 */

const defaultOptions = {
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  draggable: false,
  position: "bottom-center",
};

export const toast = {
  success: (message, options = {}) => {
    return reactToastify.success(message, {
      ...defaultOptions,
      ...options,
    });
  },

  error: (message, options = {}) => {
    return reactToastify.error(message, {
      ...defaultOptions,
      ...options,
    });
  },

  info: (message, options = {}) => {
    return reactToastify.info(message, {
      ...defaultOptions,
      ...options,
    });
  },

  warning: (message, options = {}) => {
    return reactToastify.warning(message, {
      ...defaultOptions,
      ...options,
    });
  },

  // For custom use cases where you need full control
  custom: (message, options = {}) => {
    return reactToastify(message, {
      ...defaultOptions,
      ...options,
    });
  },
};

export default toast;
