export const jsonFetch = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options
  });
  try {
    const jsonResponse = await response.json();
    if (response.status >= 400) {
      return {
        ...jsonResponse,
        success: false
      };
    }
    return {
      data: jsonResponse,
      success: true
    };
  } catch (error) {
    if (response.status === 200) {
      return {
        success: true
      };
    }
    return {
      success: false,
      message: "Server Error!"
    };
  }
};

export const fetchTrailers = async () => {
  const trailerUrl = `https://cors-anywhere.herokuapp.com/https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs`;
  return await jsonFetch(trailerUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
};
