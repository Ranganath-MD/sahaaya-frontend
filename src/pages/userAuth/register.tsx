import React, { useContext } from "react";
import { Seo, DevButton, FormInput, MessageBox } from "components";
import { Grid, Button, Divider, Container } from "@material-ui/core";
import { Link, RouteComponentProps } from "@reach/router";
import { AuthContext } from "context";
import "./index.scss";
import { BiUserCircle } from "react-icons/bi";
import { useForm, Controller } from "react-hook-form";
import { VscEyeClosed, VscEye, VscMail } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { AnimateText } from "./animateText";

export const Register: React.FC<RouteComponentProps> = () => {
  const context = useContext(AuthContext);
  const { control, handleSubmit, errors, getValues, reset } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    const formData = {
      username: data.username,
      email: data.email,
      password: data.password
    };
    context.register(formData, reset);
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
      <Seo title="Register and Start a campaign" />
      <div className="background__rect"></div>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={6} md={7}>
            <div className="reg-left">
              <AnimateText />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <div className="reg-form">
              <h1>Welcome to Sahaaya</h1>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => {
                    return (
                      <FormInput
                        name="username"
                        value={value}
                        errorMsg={errors.username?.message}
                        type="text"
                        placeholder="username"
                        error={!!errors?.username}
                        autoFocus
                        icon={
                          <BiUserCircle
                            size="1.3em" />
                        }
                        width="95%"
                        onChange={(e) => onChange(e)}
                      />
                    );
                  }}
                  rules={{ required: "This field is required", maxLength: 64 }}
                />
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => {
                    return (
                      <FormInput
                        name="email"
                        value={value}
                        error={!!errors?.email}
                        type="email"
                        placeholder="Email"
                        errorMsg={errors.email?.message}
                        icon={
                          <VscMail
                            size="1.3em" />
                        }
                        width="95%"
                        onChange={(e) => onChange(e)}
                      />
                    );
                  }}
                  rules={{
                    required: "This field is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  }}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => {
                    return (
                      <FormInput
                        name="password"
                        value={value}
                        error={!!errors?.password}
                        type={context.showPassword ? "text" : "password"}
                        errorMsg={errors.password?.message}
                        placeholder="Password"
                        icon={
                          context.showPassword ?
                            <VscEye
                              size="1.3em"
                              onClick={() => context.setShowPassword(!context.showPassword)}
                            /> :
                            <VscEyeClosed
                              size="1.3em"
                              onClick={() => context.setShowPassword(!context.showPassword)}
                            />
                        }
                        width="95%"
                        onChange={(e) => onChange(e)}
                      />
                    );
                  }}
                  rules={{
                    required: "This field is required"
                  }}
                />
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => {
                    return (
                      <FormInput
                        name="confirmPassword"
                        value={value}
                        error={!!errors?.confirmPassword && errors?.confirmPassword?.message !== ""}
                        errorMsg={errors.confirmPassword?.message}
                        type={context.showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        icon={
                          context.showConfirmPassword ?
                            <VscEye
                              size="1.3em"
                              onClick={() => context.setShowConfirmPassword(!context.showConfirmPassword)}
                            /> :
                            <VscEyeClosed
                              size="1.3em"
                              onClick={() => context.setShowConfirmPassword(!context.showConfirmPassword)}
                            />
                        }
                        width="95%"
                        onChange={(e) => onChange(e)}
                      />
                    );
                  }}
                  rules={{
                    validate: (value) => value !== getValues("password") ? "Password do not match" : undefined,
                    required: "This field is required"
                  }}
                />
                <div className="reg-button">
                  <DevButton
                    primary
                    isloading={context.isLoading ? true : false}
                    loadingText={"Redirecting to Login"}
                    submit
                    fullWidth
                    minHeight="2.4rem"
                  >Sign Up</DevButton>
                </div>
                <div className="sign-in-link">
                  Already have an account?{"  "}<Link to="/login">Sign in</Link>
                </div>
              </form>
              <Divider variant="middle" />
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  className="google-button"
                  startIcon={<FcGoogle />}
                >
                  Sign up with Google
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
        {context.showMessageBox && renderMessageBox()}
      </Container>
    </>
  );
};

