import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { Button, Input, notification } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { User } from "../../query";
import { login, LoginPayload, loginWithGoogle } from "../../query/Auth";
import { verifyGoogleToken } from "../../query/Auth/verifyGoogleToken";
import { routePaths } from "../../routes/helpers";

const Login = () => {
  const { setUser } = useAuth();
  const [googleAccount, setGoogleAccount] = useState<TokenResponse>();

  const { control, handleSubmit } = useForm<LoginPayload>({
    mode: "onBlur",
  });

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse: TokenResponse) => setGoogleAccount(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleNavigate = (user: User) => {
    if (user.role === "admin")
      window.location.href = routePaths.admin.replace(":tab", "course");
    else window.location.href = "/";
  };

  useEffect(() => {
    if (googleAccount) {
      verifyGoogleToken(googleAccount.access_token)
        .then((res) => {
          loginWithGoogle(res.data.email).then((loginResponse) => {
            notification.success({
              message: `Hi ${loginResponse.data.user.name}`,
            });
            Cookies.set("user", JSON.stringify(loginResponse.data.user), {
              expires: 7,
            });
            setUser(loginResponse.data.user);
            handleNavigate(loginResponse.data.user);
          });
        })
        .catch(() => {
          notification.error({
            message: "Login failed",
          });
        });
    }
  }, [googleAccount]);

  const handleLogin = (data: LoginPayload) => {
    login(data)
      .then((res) => {
        notification.success({
          message: `Hi ${res.data.user._doc.name}`,
        });
        Cookies.set("user", JSON.stringify(res.data.user._doc), {
          expires: 7,
        });
        setUser(res.data.user._doc);
        handleNavigate(res.data.user._doc);
      })
      .catch(() => {
        notification.error({
          message: "Login failed",
        });
      });
  };

  return (
    <div className="py-24 bg-neutral-100 h-full flex justify-center">
      <div className="w-full md:w-4/5 lg:w-3/5 bg-sky-100 rounded-lg flex flex-col sm:flex-row p-6">
        <div className="w-full sm:w-2/3 md:w-1/2 bg-white p-6 rounded-lg">
          <div className="flex flex-col items-center space-y-4">
            <img src="/anish-toeic-logo.jpg" alt="logo" className="w-20 h-20" />
            <h4 className="text-xl font-semibold">Anish Toeic</h4>
          </div>
          <div className="w-full mt-6">
            <p>Tên đăng nhập/ Email</p>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  size="large"
                  placeholder="Username/Email"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit(handleLogin)();
                  }}
                />
              )}
            />
          </div>
          <div className="w-full mt-4">
            <p>Mật khẩu</p>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  size="large"
                  placeholder="Password"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit(handleLogin)();
                  }}
                />
              )}
            />
          </div>
          <Button
            onClick={handleSubmit(handleLogin)}
            className="w-full mt-6"
            type="primary"
            size="large"
          >
            Đăng nhập
          </Button>
          <div className="my-4 flex items-center before:flex-1 before:border-t before:border-neutral-300 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 text-center font-semibold">OR</p>
          </div>
          <Button
            onClick={() => handleLoginWithGoogle()}
            className="w-full border rounded-xl flex items-center justify-center p-4 font-semibold text-base space-x-2"
          >
            <FaGoogle color="red" />
            <span>Login With Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
