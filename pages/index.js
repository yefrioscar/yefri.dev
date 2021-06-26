import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import {
    motion,
    AnimateSharedLayout,
    useAnimation,
    transform,
} from "framer-motion";
import { useEffect, useState } from "react";;

export default function Home() {
    const [isFocus, setFocus] = useState(false);

    const onFocus = (e) => {
        setFocus(true);
        console.log("FOCUS", e);
    };

    const onUnFocus = (e) => {
        setFocus(false);
        console.log("OFF FOCUS", e);
    };

    const sendResume = (e) => {
        setFocus(false);
        console.log("OFF FOCUS", e);
    };

    const variants = {
        open: {
            opacity: 1,
            scale: 1,
        },
        closed: {
            opacity: 0,
            scale: 0,
        },
    };

    return (
        <div className="wrapper-container">
            <div className="w-full flex justify-center items-center h-screen">
                <div className=" my-20 space-y-2">
                    <h1 className="font-bold text-2xl text-primary-500 text-center">
                        Hi, Im Yefri
                    </h1>
                    <AnimateSharedLayout>
                        <div className="flex space-y-4 md:space-x-4 justify-center flex-col md:flex-row">
                            <motion.span
                                style={{ color: "white" }}
                                initial={false}
                                animate={
                                    isFocus
                                        ? { height: 'auto', opacity: 1 }
                                        : { height: 0, opacity: 0 }
                                }
                            >
                                I will send you my updated resume.
                            </motion.span>
                            <input
                                type="text"
                                placeholder="Type your email"
                                className="input-container"
                                onFocus={(e) => onFocus(e)}
                                onBlur={(e) => onUnFocus(e)}
                            />

                            <motion.button
                                variants={variants}
                                initial={false}
                                animate={isFocus ? "open" : "closed"}
                                type="submit"
                                className="w-full md:w-auto group flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 space-x-2"
                                onClick={() => sendResume()}
                            >
                                <span className="flex items-center">
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

                                <span>Send resume</span>
                            </motion.button>
                        </div>
                    </AnimateSharedLayout>
                </div>
            </div>
        </div>
    );
}
