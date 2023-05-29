import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:5000/api/User",
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

const User = {
  Insert: (user: any) => request.post("/register", user),
  Login: (user: any) => request.post("/login", user),
  Logout: (id: string) => request.get("logout?userId=" + id),
  GetAll: () => request.get("/get-all"),
  Edit: (user: any) => request.post("/edit", user),
  UpdateProfile: (user: any) => request.post("/update-profile", user),
  ChangePassword: (user: any) => request.post("/change-password", user),
  Select: (id: string | number) => request.post("/select-user", id),
  Delete: (id: string) => request.post("/delete", id), 
  Block: (id: string) => request.post("/block", id),
  Unblock: (id: string) => request.post("/unblock", id),  
};

export async function Insert(user: any) {
  const data = await User.Insert(user)
    .then((response) => {
      return { response };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function Login(user: any) {
  const data = await User.Login(user)
    .then((response) => {
      return { response };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function GetAll() {
  const data = await User.GetAll()
    .then((response) => {
      return { response };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function Logout(id: string) {
  const data = await User.Logout(id)
  .then((response) => {
    return { response };
  })
  .catch((error) => {
    return error.response;
  });
  return data;
}

export async function Edit(user: any){
  const data = await User.Edit(user)
  .then((response) => {
    return { response };
  })
  .catch((error) => {
    return error.response;
  });
  return data;
}

export async function UpdateProfile(user: any){
  const data = await User.UpdateProfile(user)
  .then((response) => {
    return { response };
  })
  .catch((error) => {
    return error.response;
  });
  return data;
}

export async function ChangePassword(user: any){
  const data = await User.ChangePassword(user)
  .then((response) => {
    return { response };
  })
  .catch((error) => {
    return error.response;
  });
  return data;
}

export async function Select(id: string | number) {
  const data = await User.Select(id)
  .then((response) => {
    return { response };
  })
  .catch((error) => {
    return error.response;
  });
  return data;
}

export async function Delete(id: string) {
  const data = await User.Delete(id)
  .then((response) => {
    return { response };
  })
  .catch((error) => {
    return error.response;
  });
  return data;
}

export async function Block(id: string) {
  const data = await User.Block(id)
  .then((response) => {
    return { response };
  })
  .catch((error) => {
    return error.response;
  });
  return data;
}

export async function Unblock(id: string) {
  const data = await User.Unblock(id)
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

export function setSelectedUser(selectedUser: any){
  window.localStorage.setItem("selectedUser", selectedUser);
}

export function removeSelectedUser() {
  window.localStorage.removeItem("selectedUser");
}