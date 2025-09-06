const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
import axios from "axios";

export const forgotPassword = async (
  data,
  setError,
  setIsSuccess,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const response = await axios.post(
      `${BASE_URL}/api/auth/forgot-password`,
      {
        email: data.email,
      }
    );

    const result = response.data;

    if (response.status !== 200) {
      if (result.message) {
        setError("email", { message: result.message });
      } else {
        setError("root", {
          message: "Something went wrong. Please try again.",
        });
      }
      return;
    }

    setIsSuccess(true);
  } catch (error) {
    console.error("Forgot password error:", error);

    // Handle axios error response
    if (error.response && error.response.data && error.response.data.message) {
      setError("email", { message: error.response.data.message });
    } else {
      setError("root", {
        message: "Network error. Please check your connection and try again.",
      });
    }
  } finally {
    setIsLoading(false);
  }
};
