"use client";
import Link from "next/link";
// import LoginForm from "@/components/partials/auth/login-form";
// import Social from "@/components/partials/auth/social";
import useDarkMode from "@/hooks/useDarkMode";
import Textinput from "@/components/ui/Textinput";
import { useState } from "react";
import { signIn } from 'next-auth/react'

// import Checkbox from "@/components/ui/Checkbox";

// image import

const Login = () => {
  const [isDark] = useDarkMode();
  const [userInput, setUserInput] = useState({ email: '', password: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn('credentials', { email: userInput.email, password: userInput.password, callbackUrl: '/admin' })
  }

  return (
    <>
      <div className="loginwrapper">
        <div className="lg-inner-column">
          <div className="left-column relative z-[1]">
            <div className="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
              <Link href="/">
                <img
                  src={
                    isDark
                      ? "/assets/images/logo/logo-white.svg"
                      : "/assets/images/logo/logo.svg"
                  }
                  alt=""
                  className="mb-10"
                />
              </Link>
              <h4>
                Unlock your Project{" "}
                <span className="text-slate-800 dark:text-slate-400 font-bold">
                  performance
                </span>
              </h4>
            </div>
            <div className="absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]">
              <img
                src="/assets/images/auth/ils1.svg"
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="right-column relative">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link href="/">
                    <img
                      src={
                        isDark
                          ? "/assets/images/logo/logo-white.svg"
                          : "/assets/images/logo/logo.svg"
                      }
                      alt=""
                      className="mx-auto"
                    />
                  </Link>
                </div>
                <div className="text-center 2xl:mb-10 mb-4">
                  <h4 className="font-medium">Sign in</h4>
                  <div className="text-slate-500 text-base">
                    Sign in to your account to start using Dashcode
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 " >
                    <Textinput
                        name="email"
                        label="Username"
                        // defaultValue="dashcode@gmail.com"
                        type="text"
                        placeholder="Enter your username"
                        value={userInput.email}
                        onChange = {(e) => setUserInput({...userInput, email: e.target.value})}                         
                    />
                    <Textinput
                        name="password"
                        label="passwrod"
                        type="password"
                        // defaultValue="dashcode"
                        placeholder="Enter your password"
                        value={userInput.password}
                        onChange = {(e) => setUserInput({...userInput, password: e.target.value})}

                       
                    />
                    {/* <div className="flex justify-between">
                        <Checkbox
                        value={checked}
                        onChange={() => setChecked(!checked)}
                        label="Keep me signed in"
                        />
                        <Link
                        href="/forgot-password"
                        className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
                        >
                        Forgot Password?{" "}
                        </Link>
                    </div> */}

                    <button className="btn btn-dark block w-full text-center">Sign in</button>
                </form>
                {/* <div className="relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6">
                  <div className="absolute inline-block bg-white dark:bg-slate-800 dark:text-slate-400 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm text-slate-500 font-normal">
                    Or continue with
                  </div>
                </div>
                <div className="max-w-[242px] mx-auto mt-8 w-full">
                  <Social />
                </div>
                <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm">
                  Don’t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >
                    Sign up
                  </Link>
                </div> */}
              </div>
              <div className="auth-footer text-center">
                Copyright 2021, Dashcode All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
