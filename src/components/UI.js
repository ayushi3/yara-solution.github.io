import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import Logo from "../image/Logo.webp";
import styled from "./UI.module.css";
import { TbRulerMeasure } from "react-icons/tb";

function UI() {
  //State management for isNavbarVisible attribute
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  //Detecting the scroll event and setting the value to isNavbarVisible through setIsNavbarVisible function
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styled.content}>
      <div className={styled.image}>
        <div
          className={`${styled.navbar} ${isNavbarVisible ? "" : styled.hidden}`}
        >
          <nav className={styled.logo}>
            <a href="/">
              <img src={Logo} alt="Yara International Logo" />
              <p>Knowledge grows</p>
            </a>
          </nav>

          <nav>
            <ul>
              <li>
                <a href="https://www.yara.com/crop-nutrition/">What we offer</a>
              </li>
              <li>
                <a href="https://www.yara.com/careers/">Careers</a>
              </li>
              <li>
                <a href="https://www.yara.com/investor-relations/">Investors</a>
              </li>
              <li>
                <a href="https://www.yara.com/news-and-media/">
                  News and media
                </a>
              </li>
              <li>
                <a href="https://www.yara.com/sustainability/transforming-food-system/">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="https://www.yara.com/this-is-yara/yara-at-a-glance/">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styled.header}>
          <header>
            <span>Visual</span>
            <h1>Air Quality in Germany</h1>
            <p>
              Explore interactive charts and graphs to understand the impact of
              environmental factors on different regions.
            </p>
          </header>
        </div>
      </div>
      <div className={styled.container}>
        <div className={styled.chart}>
          <h2>
            Visualize environmental measurements in German cities and gain
            insights into air quality.
          </h2>
          <BarChart />
        </div>
        <div className={styled.constant}>
          <div className={styled.iconContent}>
            <div className={styled.roundBg}>
              <TbRulerMeasure className={styled.iconMeasure} />
            </div>
            <h2>Unit</h2>
            <p>µg/m³</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default UI;
