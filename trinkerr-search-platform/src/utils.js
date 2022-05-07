import axios from "axios";

const apiBaseUrl = "http://3.108.244.88:5000";

export const fetchUserAccessToken = async ({ setLoadingUserAccessToken }) => {
  setLoadingUserAccessToken(true);
  const url = `${apiBaseUrl}/api/user-access-token`;
  try {
    const res = await axios.get(url, { mode: "no-cors" });
    localStorage.setItem("token", res?.data?.token);
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingUserAccessToken(false);
  }
};

export const fetchSearchTextOutput = async ({ text, setStockData }) => {
  const url = `${apiBaseUrl}/api/data?search_string=${text}`;
  try {
    const res = await axios.get(url, {
      mode: "no-cors",
      headers: { "user-access-token": `${localStorage.getItem("token")}` },
    });
    if (res.status >= 200 && res.status < 300) {
      setStockData(res.data);
    }
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
