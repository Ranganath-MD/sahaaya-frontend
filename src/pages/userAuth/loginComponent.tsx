import React, { useContext, useEffect } from "react";
import { Seo, DevButton, FormInput, MessageBox } from "components";
import { Grid, Container } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "context";
import "./index.scss";
import { useForm, Controller } from "react-hook-form";
import { VscEyeClosed, VscEye, VscMail } from "react-icons/vsc";
import Logo from "assets/logo.svg";

interface IProps {
 email?: string;
}

export const Login: React.FC<IProps> = (props) => {
  const context = useContext(AuthContext);
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const location = useLocation();

  useEffect(() => {
    if (location?.state !== null && location?.state.email !== undefined){
      reset({ email: location?.state.email });
    }else {
      reset();
    }
  }, []);

  const onSubmit = (data: any) => {
    const formData = {
      email: data.email,
      password: data.password
    };
    context.login(formData, reset);
  };

  const renderMessageBox = () => {
    return (
      <MessageBox
        open={context.showMessageBox}
        message={context.message}
        handleClose={() => context.setShowMessageBox(false)}
      />
    );
  };
  return (
    <>
      <Seo title="Login to Sahaaya" />
      <Container>
        <Grid container>
          <Grid item xs={12} sm={3} md={3}></Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div className="reg-form">
              <div className="logo">
                <img src={Logo} alt="logo-in-login-page" />
              </div>
              <h1>Login</h1>
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }: any) => {
                    return (
                      <FormInput
                        name="email"
                        value={value}
                        autoFocus
                        error={!!errors?.email}
                        type="email"
                        placeholder="Email"
                        errorMsg={errors.email?.message as string}
                        icon={<VscMail size="1.3em" />}
                        width="95%"
                        onChange={(e) => onChange(e)}
                      />
                    );
                  }}
                  rules={{
                    required: "This field is required",
                    pattern: {
                      value:
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }: any) => {
                    return (
                      <FormInput
                        name="password"
                        value={value}
                        error={!!errors?.password}
                        type={
                          context.showPassword
                            ? "text"
                            : "password"
                        }
                        errorMsg={errors.password?.message as string}
                        placeholder="Password"
                        icon={
                          context.showPassword ? (
                            <VscEye
                              size="1.3em"
                              onClick={() =>
                                context.setShowPassword(
                                  !context.showPassword
                                )
                              }
                            />
                          ) : (
                            <VscEyeClosed
                              size="1.3em"
                              onClick={() =>
                                context.setShowPassword(
                                  !context.showPassword
                                )
                              }
                            />
                          )
                        }
                        width="95%"
                        onChange={(e) => onChange(e)}
                      />
                    );
                  }}
                  rules={{
                    required: "This field is required",
                  }}
                />
                <div className="reg-button">
                  <DevButton
                    primary
                    isloading={
                      context.isLoading ? true : false
                    }
                    loadingText={"Logging In..."}
                    submit
                    fullWidth
                    minHeight="2.4rem"
                  >
                    Sign In
                  </DevButton>
                </div>
                <div className="sign-in-link">
                  <Link to="/">Forgot password?</Link>
                </div>
                <div className="sign-in-link">
                  Do not have an account?{"  "}
                  <Link to="/register">Sign up Now</Link>
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
        {renderMessageBox()}
        <div className="demo-creds">
          <p>Admin credentials:</p>
          <p>email: admin@sahaaya.com</p>
          <p>password: ssa@2022</p>
        </div>
      </Container>
    </>
  );
};

