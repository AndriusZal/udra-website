"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { DM_Sans } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/../types/database.types";

interface Dimensions {
    width: number;
    height: number;
}

const dm_sans = DM_Sans({
    weight: ["400", "700"],
    style: "normal",
    subsets: ["latin"],
});

const supabase = createClient<Database>(
    "https://gwuruokcvssgnrlmetvj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3dXJ1b2tjdnNzZ25ybG1ldHZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MDYzNTAsImV4cCI6MjA1ODM4MjM1MH0.EpZWiZACI2KjK2c3AH0vSjObm8Kwjv_fx2jlRtOaRqc"
);

const placeholder = "Jūsų el. paštas";

const getDynamicWidth = function ({ width }: Dimensions): number {
    const firstDecrease = (x: number) => 0.7 + 0.3 * (1 - (x - 630) / 270);
    const secondDecrease = (x: number) => firstDecrease(700) + (1 - firstDecrease(700)) * (1 - (x - 350) / 350);
    if (width > 900) {
        return width * 0.7 > 700 ? 700 : width * 0.7;
    } else if (width <= 900 && width > 700) {
        return width * firstDecrease(width);
    } else {
        return width * secondDecrease(width);
    }
};

const getPath = function (width: number, height: number): string {
    const componentHeight = height > 560 ? 550 : 500;
    const componentWidth = width > 700 ? 700 : width < 350 ? 350 : width;
    return `path("M 20 0 L ${componentWidth - 180} 0 A 20 20 0 0 1 ${componentWidth - 160} 20 L ${componentWidth - 160} 60 A 20 20 0 0 0 ${
        componentWidth - 140
    } 80 L ${componentWidth - 100} 80 A 20 20 0 0 1 ${componentWidth - 80} 100 L ${componentWidth - 80} ${
        componentHeight - 100
    } A 20 20 0 0 0 ${componentWidth - 60} ${componentHeight - 80} L ${componentWidth - 20} ${
        componentHeight - 80
    } A 20 20 0 0 1 ${componentWidth} ${componentHeight - 60} L ${componentWidth} ${componentHeight - 20} A 20 20 0 0 1 ${
        componentWidth - 20
    } ${componentHeight} L ${componentWidth - 60} ${componentHeight} A 20 20 0 0 1 ${componentWidth - 80} ${componentHeight - 20} L ${
        componentWidth - 80
    } ${componentHeight - 60} A 20 20 0 0 0 ${componentWidth - 100} ${componentHeight - 80} L 20 ${componentHeight - 80} A 20 20 0 0 1 0 ${
        componentHeight - 100
    } L 0 20 A 20 20 0 0 1 20 0 Z")`;
};

export default function Home() {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [subscribed, setSubscription] = useState<boolean>(false);
    const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
    const dynamicTextBox = useRef<HTMLDivElement>(null);

    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) {
            setError("Būtina užpildyti laukelį");
        } else if (!validateEmail(email)) {
            setError("Neteisingai įvestas el. pašto adresas");
        } else {
            setSubscription(true);
            setError("");
            await supabase.from("subscribers").insert({ email: email });
        }
    };

    const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (subscribed) {
            setSubscription(false);
        }
        if (error) {
            setError("");
        }
        setEmail(event.target.value);
    };

    useEffect(() => {
        const element = dynamicTextBox.current;
        const resizeObserver = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            setDimensions({ width, height });
        });
        if (element) {
            resizeObserver.observe(element);
        }
        return () => {
            if (element) {
                resizeObserver.unobserve(element);
            }
        };
    }, []);
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Image
                    src="/logo.svg"
                    alt="Udra logo"
                    width={dimensions.width < 500 ? 200 : 250}
                    height={dimensions.width < 500 ? 60 : 80}
                    priority
                />
                {dimensions.width > 740 && (
                    <div className={`${styles.socialMedia} ${dm_sans.className}`}>
                        <p>Sekite mus: </p>
                        <Image
                            style={{ cursor: "pointer" }}
                            onClick={() => open("https://www.instagram.com/udra_van/")}
                            src="/instaLogo.svg"
                            alt="Instagram link"
                            width={42}
                            height={41}
                            priority
                        />
                        <Image
                            style={{ cursor: "pointer" }}
                            onClick={() => open("https://www.facebook.com/profile.php?id=61571981373934")}
                            src="/fbLogo.svg"
                            alt="Facebook Link"
                            width={42}
                            height={41}
                            priority
                        />
                    </div>
                )}
            </header>
            <main ref={dynamicTextBox} className={styles.main}>
                <div
                    className={styles.mainFrame}
                    style={{
                        clipPath: getPath(getDynamicWidth(dimensions), dimensions.height),
                        height: dimensions.height > 560 ? 550 : 500,
                        width: getDynamicWidth(dimensions) < 350 ? 350 : getDynamicWidth(dimensions),
                    }}
                >
                    <div className={styles.tagline}>
                        {dimensions.width > 420 && (
                            <div className={styles.flag}>
                                <div className={styles.yellow} />
                                <div className={styles.green} />
                                <div className={styles.red} />
                            </div>
                        )}
                        <h1 className={styles.slogan}>NUOTYKIAI TIK PRASIDEDA</h1>
                    </div>
                    <div className={styles.subscribeContainer}>
                        <p className={`${styles.description} ${dm_sans.className}`}>
                            Naujas projektas kemperių entuziastams Lietuvoje. Prenumeruokite mūsų naujienlaiškį ir gaukite naujienas apie
                            Udros startą pirmi!
                        </p>
                        <form className={styles.subscribe} onSubmit={handleSubmit}>
                            <div className={styles.tooltipWrapper}>
                                <input
                                    className={`${styles.subscribeInput} ${error ? styles.error : ""}`}
                                    title="email"
                                    value={email}
                                    onChange={updateEmail}
                                    placeholder={placeholder}
                                    style={{ color: error ? "rgba(184, 0, 0, 1)" : "rgba(255, 255, 255, 1)" }}
                                ></input>
                                {error && <div className={`${styles.tooltip} ${dm_sans.className}`}>{error}</div>}
                            </div>
                            <button
                                type="submit"
                                className={`${styles.subscribeButton} ${dm_sans.className}`}
                                style={subscribed ? { background: "rgba(107, 143, 107, 1)" } : {}}
                            >
                                {subscribed ? "AČIŪ" : "PRENUMERUOTI"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <footer className={`${styles.footer} ${dm_sans.className}`}>
                {dimensions.width < 740 && (
                    <div className={`${styles.socialMedia} ${dm_sans.className}`}>
                        <p>Sekite mus: </p>
                        <a target="_blank" rel="noopener" href="https://www.instagram.com/udra_van/">
                            <Image
                                style={{ cursor: "pointer" }}
                                src="/instaLogo.svg"
                                alt="Instagram link"
                                width={42}
                                height={41}
                                priority
                            />
                        </a>
                        <a target="_blank" rel="noopener" href="https://www.facebook.com/profile.php?id=61571981373934">
                            <Image style={{ cursor: "pointer" }} src="/fbLogo.svg" alt="Facebook Link" width={42} height={41} priority />
                        </a>
                    </div>
                )}
                <p>© Udra Van, 2025</p>
            </footer>
        </div>
    );
}
