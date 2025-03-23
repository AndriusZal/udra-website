"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { DM_Sans } from "next/font/google";
import { useEffect, useRef, useState } from "react";

interface Dimensions {
    width: number;
    height: number;
}

const dm_sans = DM_Sans({
    weight: ["400", "700"],
    style: "normal",
});

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
    const componentHeight: number = height > 560 ? 550 : 500;
    const componentWidth: number = width > 700 ? 700 : width < 350 ? 350 : width;
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
    const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
    const dynamicTextBox = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            setDimensions({ width, height });
        });
        if (dynamicTextBox.current) {
            resizeObserver.observe(dynamicTextBox.current);
        }
        return () => {
            if (dynamicTextBox.current) {
                resizeObserver.unobserve(dynamicTextBox.current);
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
                        {dimensions.width > 400 && (
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
                        <div className={styles.subscribe}>
                            <input className={styles.subscribeInput} title="email" placeholder="Jūsų el. paštas"></input>
                            <button className={`${styles.subscribeButton} ${dm_sans.className}`}>PRENUMERUOTI</button>
                        </div>
                    </div>
                </div>
            </main>
            <footer className={`${styles.footer} ${dm_sans.className}`}>
                {dimensions.width < 740 && (
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
                <p>© Udra Van, 2025</p>
            </footer>
        </div>
    );
}
