import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import {
    motion,
    AnimateSharedLayout,
    useAnimation,
    transform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { screens } from "tailwindcss/defaultTheme";
import useWindowSize from "../utils/hooks/useWindowSize";
import clsx from "clsx";
const fetcher = (url, email) =>
    fetch(url, { method: "POST", body: JSON.stringify({ email }) }).then((r) =>
        r.json()
    );

const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default function Home() {
    const { width } = useWindowSize();

    const [isFocus, setFocus] = useState(false);
    const [valueInput, setValueInput] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    const [isLoading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [success, setSuccess] = useState(false);

    const onFocus = (e) => {
        setFocus(true);
        console.log("FOCUS", e);
    };

    const handleChange = (e) => {
        setValueInput(e.target.value);
    };

    const sendResume = async (e) => {
        if (!validateEmail(valueInput)) {
            setErrorText("Please, put a valid email.");
            return;
        }

        setLoading(true);
        try {
            const { error } = await fetcher("/api/sendResume", valueInput);

            if (error === "duplicate_parameter") {
                setErrorText("Alredy send you my resume, check your email.");

                setTimeout(() => {
                    setErrorText('')
                    setValueInput('')
                }, 3000);
            } else {
                setSuccess(true)
                setValueInput('')

                setTimeout(() => {
                    setSuccess(false)
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const variants = {
        open: {
            opacity: 1,
            scale: 1,
            width: screens.md > width ? "auto" : "100%",
        },
        closed: {
            opacity: 0,
            scale: 0,
            width: 0,
        },
    };

    const handleKeys = (e) => {
        if (e.key === "Enter") {
            sendResume();
        } else {
            setErrorText("");
        }
    };

    screens.md;

    return (
        <div className="wrapper-container">
            <div className="w-full flex justify-center items-center h-screen">
                <div className=" my-20 space-y-2">
                    <h1 className="font-bold text-2xl text-primary-500 text-center">
                        Hi, Im Yefri
                    </h1>
                    <AnimateSharedLayout>
                        <div
                            className={clsx(
                                "flex justify-center items-end flex-col md:flex-row",
                                isFocus ? "md:space-x-4 space-y-4" : ""
                            )}
                        >
                            <div className="flex flex-col space-y-4 w-full md:w-80">
                                <motion.span
                                    style={{ color: "white" }}
                                    initial={false}
                                    animate={
                                        isFocus
                                            ? { height: "auto", opacity: 1 }
                                            : { height: 0, opacity: 0 }
                                    }
                                >
                                    I will send you my updated resume.
                                </motion.span>
                                <input
                                    type="email"
                                    required
                                    placeholder="Type your email"
                                    className="input-container"
                                    value={valueInput}
                                    onKeyDown={(e) => handleKeys(e)}
                                    onChange={(e) => handleChange(e)}
                                    onFocus={(e) => onFocus(e)}
                                />
                            </div>

                            <motion.button
                                variants={variants}
                                initial={false}
                                animate={isFocus ? "open" : "closed"}
                                type="submit"
                                className={clsx(
                                    "w-full md:w-auto group flex justify-center border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none space-x-2 h-10 relative",
                                    isFocus ? "px-4 py-2 border" : ""
                                )}
                                onClick={() => sendResume()}
                            >
                                <div
                                    className={clsx(
                                        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity ease-in-out duration-200",
                                        isLoading ? "opacity-100" : "opacity-0"
                                    )}
                                >

                                    <svg
                                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 animate-spin"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                </div>

                                <span
                                    className={clsx(
                                        "flex items-center transition-opacity ease-in-out duration-200",
                                        isLoading ? "opacity-0" : "opacity-100"
                                    )}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="NONE"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    >
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line
                                            x1="12"
                                            y1="15"
                                            x2="12"
                                            y2="3"
                                        ></line>
                                    </svg>
                                </span>

                                <span
                                    className={clsx(
                                        "transition-opacity ease-in-out duration-200",
                                        isLoading ? "opacity-0" : "opacity-100"
                                    )}
                                >
                                    Send resume
                                </span>
                            </motion.button>
                        </div>
                        <div>
                            <motion.p
                                className="text-red-400"
                                initial={false}
                                animate={
                                    errorText
                                        ? { height: "auto", opacity: 1 }
                                        : { height: 0, opacity: 0 }
                                }
                            >
                                {errorText}
                            </motion.p>
                        </div>
                        <div>
                            <motion.p
                                className="text-green-500"
                                initial={false}
                                animate={
                                    success
                                        ? { height: "auto", opacity: 1 }
                                        : { height: 0, opacity: 0 }
                                }
                            >
                                Just send an email with my resume. Thanks.
                            </motion.p>
                        </div>
                    </AnimateSharedLayout>
                </div>
            </div>
        </div>
    );
}
