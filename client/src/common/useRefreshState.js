import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthtokenCredential, setRefreshToken } from "src/stores/auth/auth.reducer";

export const useRefreshState = () => {
  const credential = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const exchangeToken = async (refreshToken) => {
    try {
      return await axios.post(
        `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
        {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      let errorMessage = "Refresh token failed!";
      console.log(err.response.data);
    }
  };
  return {
    exchangeToken,
  };
};
