import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:5000/api/Course",
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config: any) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Validation failed, ...
      if (err.response.status === 400 && err.response.data) {
        return Promise.reject(err.response.data);
      }
      // Access Token was expired
      if (
        err.response.status === 401 &&
        !originalConfig._retry &&
        getAccessToken() != null
      ) {
        originalConfig._retry = true;
        try {
          const rs = await refreshAccessToken();
          const { accessToken, refreshToken } = rs.data;
          setRefreshToken(refreshToken);
          setAccessToken(accessToken);
          instance.defaults.headers.common["Authorization"] =
            "Bearer " + accessToken;
          return instance(originalConfig);
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
      if (err.response.status === 404) {
        if (axios.isAxiosError(err)) {
          return Promise.reject(err.response.data);
        }
        return;
      }
    }
    return Promise.reject(err);
  }
);

function refreshAccessToken() {
  console.log("refreshAccessToken");
  return instance.post("/refresh-token", {
    token: getAccessToken(),
    refreshToken: getRefreshToken(),
  });
}

const responseBody: any = (response: any) => response.data;

const request = {
  get: (url: string) => instance.get(url).then().then(responseBody),
  post: (url: string, body?: any) =>
    instance.post(url, body).then().then(responseBody),
};

const Course = {
  GetAll: () => request.get("/get-all"),
  Insert: (course: any) => request.post("/create", course),
  Update: (course: any) => request.post("/update", course),
  Delete: (id: number) => request.post("/delete", id),
};

export async function GetAll() {
  const data = await Course.GetAll()
    .then((response) => {
      return { response };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function Insert(course: any) {
  const data = await Course.Insert(course)
    .then((response) => {
      return { response };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function Update(course: any) {
  const data = await Course.Update(course)
    .then((response) => {
      return { response };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function Delete(id: number) {
  const data = await Course.Delete(id)
    .then((response) => {
      return { response };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export function setAccessToken(token: string) {
  window.localStorage.setItem("accessToken", token);
}

export function setRefreshToken(token: string) {
  window.localStorage.setItem("refreshToken", token);
}

export function getAccessToken(): null | string {
  const accessToken = window.localStorage.getItem("accessToken");
  return accessToken;
}

export function getRefreshToken(): null | string {
  const refreshToken = window.localStorage.getItem("refreshToken");
  return refreshToken;
}

export function removeTokens() {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
}

export function removeSelectedCourse() {
  window.localStorage.removeItem("selectedCourse");
}
