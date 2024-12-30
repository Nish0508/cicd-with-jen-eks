import { FC, FormEvent } from "react";
import InputField from "../Widgets/InputField/InputField";
import PersistentLink from "../PersistentLink";
import Button from "../ui/Button";


type LoginFormProps = {
  onSubmitLogin: (e: FormEvent) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  email: string;
  password: string;
  loading: boolean;
  setShowRecoveryEmailForm: (show: boolean) => void;
  onGoogleLogin: (token: string) => void;
  onMicrosoftLogin: (response: any) => void;
};

const LoginForm: FC<LoginFormProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  setShowRecoveryEmailForm,
  onSubmitLogin,
  loading,
  onGoogleLogin,
  onMicrosoftLogin
}) => {
  return (
    <div className="login-content">
      <div className="login-header">
        <h1 className="welcome-text">Welcome back</h1>
        <div className="welcome-text-sub-text">
          Effortless Notes for Mental Health Providers: Save Time, Enhance Care & Compliance
        </div>
      </div>
      <div className="login-form">
        <form onSubmit={onSubmitLogin}>
          <div className="tw-grid tw-gap-2 tw-mb-4">
            <InputField
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              label="Email address"
              placeholder="Enter your email"
              shouldValidate={true}
              value={email}
              inputAttrs={{
                required: true
              }}
              className={{
                inputContainer: "ad-input__container"
              }}
            />
            <InputField
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter your password"
              shouldValidate={false}
              value={password}
              inputAttrs={{
                required: true
              }}
              className={{
                inputContainer: "ad-input__container"
              }}
            />
          </div>
          <div className="tw-flex tw-items-center tw-justify-between tw-gap-4">
            <button
              type="button"
              onClick={() => setShowRecoveryEmailForm(true)}
              className="btn-reset tw-text-base tw-text-primary-500 tw-font-light tw-whitespace-nowrap">
              Forgot Password?
            </button>
            <div className="">
              <Button
                color="purple"
                type="submit"
                isLoading={loading}
                style={{
                  width: "160px"
                }}>
                Sign in
              </Button>
            </div>
          </div>
          <div className="tw-text-sm tw-mt-6  tw-text-center">
            <span className="mr-1">Don't have an account?</span>
            <PersistentLink data-testid="signup-link" className="link" to="/register">
              Sign Up
            </PersistentLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
