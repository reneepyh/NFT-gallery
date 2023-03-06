import React, { useEffect, useState, useRef } from "react";
import "react-slideshow-image/dist/styles.css";
import { Fade } from "react-slideshow-image";

const featurePics = [
  {
    url: "https://i.seadn.io/gae/a9uneRUY2Qp8G-ltOwRnUO9MqxEc2qjHkBbAMbJlpvhS1vYKaF_-tAqRrnalgYX91dKB96BZrQh6u_LZ9cYc1lvm45uybUkz0of9sQ?auto=format&w=1000",
    caption: "Whimsy Sisters Events: Auril",
    marketPlace:
      "https://opensea.io/assets/matic/0xfc23f958c86d944418d7965a5f6582d1e96db1be/1",
    marketIcon: true,
  },
  {
    url: "https://i.seadn.io/gae/rILpFP_W6v8dVE6P1HtystdSOqBiMml5AZAw1rqBTia2FBjVBKUpcm39kcqyRSP1652-c8GTSsaJswBgSWqBLdh1znASG_ykCwvT2g?auto=format&w=828",
    caption: "Lofi Lofts #895",
    marketPlace:
      "https://opensea.io/assets/ethereum/0x248a74f64bbf422dae243ed5d58ef0dd7298b972/895",
    marketIcon: true,
  },
  {
    url: "https://ipfs.io/ipfs/QmRSP7nT1cMC624pcbfgXLBQeBAjPxEDavDiUer7fi3sJy",
    caption: "50 Celebration St.",
    marketPlace:
      "https://objkt.com/asset/KT1H9Zwm7DporZSKkD1gN9RuZuBsKupKMuMg/49",
    marketIcon: false,
  },
  {
    url: "https://ipfs.io/ipfs/Qme7Lbh6MkwW1SuzNNcvKgRUVtwqZc23a9Z7G54RFfGZjY",
    caption: "BWOPLE ⓪①①⑦",
    marketPlace:
      "https://objkt.com/asset/KT1RPMeUfo8P8si3sp6PGwTC9zmBUp6YK8YA/129",
    marketIcon: false,
  },
  {
    url: "https://i.seadn.io/gcs/files/0c62b9d4d98ee2253f6e10ea1a9c64a6.jpg?auto=format&w=1000",
    caption: "DirtyRobot Interleave Artwork",
    marketPlace:
      "https://opensea.io/assets/ethereum/0x43f48b416ee0a6367754c8257f2ff4d91c7a181e/0",
    marketIcon: true,
  },
  {
    url: "https://i.seadn.io/gcs/files/4af3f60f18c53cd5e4a2e513a9ac7f57.png?auto=format&w=1000",
    caption: "Klones Council: Piano",
    marketPlace:
      "https://opensea.io/assets/ethereum/0xa6bc325684b30ef17dd3f35f8708d5d11fd2955a/52",
    marketIcon: true,
  },
];

const properties = {
  arrows: false,
  duration: 3500,
  transitionDuration: 800,
  pauseOnHover: false,
  indicators: true,
};

const Homepage = () => {
  // //LandingPage圖片遲延進場
  const [showElement, setShowElement] = useState(window.innerWidth < 1465);

  useEffect(() => {
    if (!showElement) {
      const timeoutId = setTimeout(() => {
        setShowElement(true);
      }, 4500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [showElement]);

  //section透明度轉場效果
  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current = Array.from(document.querySelectorAll("section"));
    // Set the opacity of the first section to 1 when the component mounts
    sectionRefs.current[0].style.opacity = 1;

    function updateSectionOpacity() {
      sectionRefs.current.forEach((section, index) => {
        if (index === 0) {
          section.style.opacity = Math.max(
            0,
            1 - window.pageYOffset / window.innerHeight
          );
        } else {
          const distanceFromTop = section.getBoundingClientRect().top;
          const opacity = 1 - distanceFromTop / (window.innerHeight * 0.8);
          if (distanceFromTop < window.innerHeight / 2) {
            section.style.opacity = Math.max(0, opacity);
          } else {
            section.style.opacity = 0;
          }
        }
      });

      requestAnimationFrame(updateSectionOpacity);
    }

    window.addEventListener("scroll", updateSectionOpacity);
    requestAnimationFrame(updateSectionOpacity);

    return () => {
      window.removeEventListener("scroll", updateSectionOpacity);
    };
  }, []);

  //監測scroll位置出現動畫
  // Keep track of whether each section is in view or not
  const [sectionsInView, setSectionsInView] = useState({
    feature: false,
    basics: false,
  });

  // Refs to each section
  const featureRef = useRef(null);
  const basicsRef = useRef(null);

  // Detect when each section is in view
  useEffect(() => {
    const handleScroll = () => {
      const featureRect = featureRef.current.getBoundingClientRect();
      const basicsRect = basicsRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if each section is in view
      const featureInView =
        featureRect.top < windowHeight - featureRect.height / 3 &&
        featureRect.bottom >= featureRect.height / 2;
      const basicsInView =
        basicsRect.top < windowHeight - basicsRect.height / 3 &&
        basicsRect.bottom >= basicsRect.height / 2;

      // Update the state of whether each section is in view or not
      setSectionsInView({
        feature: featureInView,
        basics: basicsInView,
      });
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove scroll event listener on cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <section id="landingPage" className="landingPage">
        <div className="intro">
          <div className="title">
            <h1 className="titleLineOne">Welcome to Renee's</h1>
            <h1 className="titleLineTwo">NFT gallery</h1>
          </div>
          <div className="selfIntro">
            <h2>Feel free to look around!</h2>
          </div>
          {showElement && (
            <a
              id="featureButton"
              href="#feature"
              className="animate__animated animate__fadeInDown"
            >
              FEATURED COLLECTIONS
            </a>
          )}
          <div className="dreamerOS animate__animated animate__fadeInDown">
            {showElement && (
              <a
                href="https://opensea.io/assets/ethereum/0x62cdf590945a8e9559e257145df310eb82cd793b/1"
                target="_blank"
                rel="noreferrer noopener"
              >
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 12C24 18.6271 18.6271 24 12 24C5.37296 24 0 18.6271 0 12C0 5.37296 5.37296 0 12 0C18.6285 0 24 5.37296 24 12Z"
                      fill="black"
                    ></path>
                    <path
                      d="M5.92022 12.4029L5.97199 12.3216L9.09367 7.4381C9.1393 7.36661 9.24655 7.374 9.28106 7.45166C9.80258 8.62044 10.2526 10.074 10.0418 10.979C9.95176 11.3513 9.70519 11.8555 9.42778 12.3216C9.39204 12.3894 9.35258 12.456 9.31066 12.5201C9.29092 12.5497 9.25764 12.5669 9.22188 12.5669H6.01144C5.92514 12.5669 5.8746 12.4732 5.92022 12.4029Z"
                      fill="white"
                    ></path>
                    <path
                      d="M19.8347 13.3104V14.0834C19.8347 14.1278 19.8075 14.1673 19.7682 14.1845C19.5265 14.2881 18.6992 14.6678 18.3552 15.1462C17.4774 16.368 16.8068 18.115 15.3075 18.115H9.05308C6.83636 18.115 5.04004 16.3126 5.04004 14.0884V14.0169C5.04004 13.9577 5.0881 13.9096 5.1473 13.9096H8.63392C8.70294 13.9096 8.75348 13.9738 8.74734 14.0415C8.72266 14.2684 8.7646 14.5001 8.87185 14.711C9.07897 15.1315 9.50802 15.394 9.97158 15.394H11.6976V14.0464H9.9913C9.90378 14.0464 9.85202 13.9454 9.90256 13.8739C9.92104 13.8455 9.94201 13.8159 9.96418 13.7827C10.1257 13.5533 10.3562 13.1971 10.5856 12.7915C10.7421 12.5177 10.8938 12.2255 11.0158 11.932C11.0406 11.879 11.0602 11.8248 11.0799 11.7718C11.1132 11.6781 11.1478 11.5906 11.1725 11.503C11.1971 11.429 11.2167 11.3513 11.2365 11.2786C11.2945 11.0296 11.3192 10.7658 11.3192 10.4921C11.3192 10.3848 11.3142 10.2726 11.3043 10.1653C11.2994 10.0482 11.2846 9.93108 11.2698 9.81396C11.2599 9.7104 11.2415 9.60806 11.2218 9.50082C11.1971 9.34424 11.1625 9.1889 11.1231 9.0323L11.1095 8.97314C11.0799 8.86586 11.0553 8.76356 11.0208 8.6563C10.9234 8.3197 10.8112 7.99176 10.6928 7.68478C10.6497 7.56272 10.6004 7.4456 10.551 7.32848C10.4783 7.15216 10.4043 6.9919 10.3365 6.84024C10.302 6.7712 10.2724 6.70832 10.2428 6.6442C10.2095 6.57146 10.175 6.49872 10.1405 6.4297C10.1158 6.37668 10.0875 6.32736 10.0677 6.27804L9.85693 5.88844C9.82734 5.83544 9.87666 5.77256 9.9346 5.78858L11.2538 6.14612H11.2575C11.2599 6.14612 11.2611 6.14736 11.2625 6.14736L11.4362 6.19544L11.6274 6.2497L11.6976 6.2694V5.4853C11.6976 5.1068 12.0009 4.7998 12.3757 4.7998C12.5631 4.7998 12.7332 4.87624 12.8553 5.00076C12.9774 5.1253 13.0538 5.29544 13.0538 5.4853V6.64916L13.1943 6.68858C13.2055 6.6923 13.2166 6.69722 13.2264 6.70462C13.261 6.73052 13.3102 6.76872 13.3731 6.8156C13.4225 6.85502 13.4755 6.90312 13.5395 6.95244C13.6666 7.05476 13.8182 7.18668 13.9846 7.33834C14.029 7.37654 14.0722 7.416 14.1116 7.45546C14.3262 7.65518 14.5666 7.88942 14.7959 8.14834C14.8599 8.22108 14.9229 8.29504 14.9869 8.37272C15.0511 8.45162 15.1189 8.5293 15.1781 8.60698C15.2557 8.71054 15.3396 8.8178 15.4124 8.93C15.4469 8.98301 15.4863 9.03724 15.5196 9.09026C15.6133 9.23204 15.6959 9.37876 15.7748 9.52548C15.8081 9.59328 15.8426 9.66724 15.8722 9.74C15.9597 9.93602 16.0287 10.1358 16.0731 10.3355C16.0867 10.3786 16.0966 10.4255 16.1015 10.4674V10.4773C16.1163 10.5364 16.1213 10.5993 16.1262 10.6634C16.1459 10.8681 16.136 11.0727 16.0917 11.2786C16.0731 11.3662 16.0485 11.4488 16.0189 11.5364C15.9894 11.6201 15.9597 11.7076 15.9215 11.7903C15.8475 11.9616 15.7599 12.133 15.6564 12.2933C15.6231 12.3525 15.5837 12.4154 15.5443 12.4745C15.5011 12.5374 15.4567 12.5966 15.4173 12.6545C15.363 12.7285 15.305 12.8062 15.2459 12.8752C15.1929 12.948 15.1387 13.0208 15.0794 13.0848C14.9969 13.1822 14.918 13.2747 14.8353 13.3634C14.786 13.4215 14.733 13.4806 14.6787 13.5336C14.6257 13.5927 14.5715 13.6457 14.5222 13.6951C14.4396 13.7777 14.3706 13.8418 14.3125 13.8948L14.1769 14.0194C14.1573 14.0366 14.1313 14.0464 14.1043 14.0464H13.0538V15.394H14.3755C14.6713 15.394 14.9525 15.2892 15.1794 15.0969C15.2569 15.0291 15.596 14.7357 15.9967 14.2931C16.0103 14.2783 16.0275 14.2671 16.0473 14.2622L19.6978 13.2069C19.7657 13.1871 19.8347 13.2389 19.8347 13.3104Z"
                      fill="white"
                    ></path>
                  </svg>
                </span>
              </a>
            )}
            {showElement && (
              <a
                className="dreamerCaption animate__animated animate__fadeInDown"
                href="https://opensea.io/assets/ethereum/0x62cdf590945a8e9559e257145df310eb82cd793b/1"
                target="_blank"
                rel="noreferrer noopener"
              >
                Dreamer by Pablo Stanley
              </a>
            )}
          </div>
        </div>
        <div className="dreamerImg">
          {showElement && (
            <img
              id="dreamerImg"
              src="https://i.seadn.io/gcs/files/5467ce3ffa63a62ec655498e2177c88e.png?auto=format&w=1920"
              alt="dreamerNFT"
              className="animate__animated animate__fadeInDown"
            />
          )}
        </div>
      </section>
      <section ref={featureRef} id="feature" className="slideshow">
        <Fade {...properties}>
          {featurePics.map((img, index) => (
            <div className="slide-effect">
              <div key={index} className="slideContainer">
                <h2>
                  FEATURED
                  <br />
                  COLLECTIONS
                </h2>
                <div className="slideImg">
                  <img
                    ref={featureRef}
                    className={`${
                      sectionsInView.feature
                        ? "animate__animated animate__fadeInUp"
                        : ""
                    }`}
                    src={img.url}
                    alt=""
                  />
                </div>
                <div className="featureCaption">
                  <a
                    href={img.marketPlace}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {img.marketIcon && (
                      <span>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          ref={featureRef}
                          className={`${
                            sectionsInView.feature
                              ? "animate__animated animate__fadeInUp"
                              : ""
                          }`}
                        >
                          <path
                            d="M24 12C24 18.6271 18.6271 24 12 24C5.37296 24 0 18.6271 0 12C0 5.37296 5.37296 0 12 0C18.6285 0 24 5.37296 24 12Z"
                            fill="black"
                          ></path>
                          <path
                            d="M5.92022 12.4029L5.97199 12.3216L9.09367 7.4381C9.1393 7.36661 9.24655 7.374 9.28106 7.45166C9.80258 8.62044 10.2526 10.074 10.0418 10.979C9.95176 11.3513 9.70519 11.8555 9.42778 12.3216C9.39204 12.3894 9.35258 12.456 9.31066 12.5201C9.29092 12.5497 9.25764 12.5669 9.22188 12.5669H6.01144C5.92514 12.5669 5.8746 12.4732 5.92022 12.4029Z"
                            fill="white"
                          ></path>
                          <path
                            d="M19.8347 13.3104V14.0834C19.8347 14.1278 19.8075 14.1673 19.7682 14.1845C19.5265 14.2881 18.6992 14.6678 18.3552 15.1462C17.4774 16.368 16.8068 18.115 15.3075 18.115H9.05308C6.83636 18.115 5.04004 16.3126 5.04004 14.0884V14.0169C5.04004 13.9577 5.0881 13.9096 5.1473 13.9096H8.63392C8.70294 13.9096 8.75348 13.9738 8.74734 14.0415C8.72266 14.2684 8.7646 14.5001 8.87185 14.711C9.07897 15.1315 9.50802 15.394 9.97158 15.394H11.6976V14.0464H9.9913C9.90378 14.0464 9.85202 13.9454 9.90256 13.8739C9.92104 13.8455 9.94201 13.8159 9.96418 13.7827C10.1257 13.5533 10.3562 13.1971 10.5856 12.7915C10.7421 12.5177 10.8938 12.2255 11.0158 11.932C11.0406 11.879 11.0602 11.8248 11.0799 11.7718C11.1132 11.6781 11.1478 11.5906 11.1725 11.503C11.1971 11.429 11.2167 11.3513 11.2365 11.2786C11.2945 11.0296 11.3192 10.7658 11.3192 10.4921C11.3192 10.3848 11.3142 10.2726 11.3043 10.1653C11.2994 10.0482 11.2846 9.93108 11.2698 9.81396C11.2599 9.7104 11.2415 9.60806 11.2218 9.50082C11.1971 9.34424 11.1625 9.1889 11.1231 9.0323L11.1095 8.97314C11.0799 8.86586 11.0553 8.76356 11.0208 8.6563C10.9234 8.3197 10.8112 7.99176 10.6928 7.68478C10.6497 7.56272 10.6004 7.4456 10.551 7.32848C10.4783 7.15216 10.4043 6.9919 10.3365 6.84024C10.302 6.7712 10.2724 6.70832 10.2428 6.6442C10.2095 6.57146 10.175 6.49872 10.1405 6.4297C10.1158 6.37668 10.0875 6.32736 10.0677 6.27804L9.85693 5.88844C9.82734 5.83544 9.87666 5.77256 9.9346 5.78858L11.2538 6.14612H11.2575C11.2599 6.14612 11.2611 6.14736 11.2625 6.14736L11.4362 6.19544L11.6274 6.2497L11.6976 6.2694V5.4853C11.6976 5.1068 12.0009 4.7998 12.3757 4.7998C12.5631 4.7998 12.7332 4.87624 12.8553 5.00076C12.9774 5.1253 13.0538 5.29544 13.0538 5.4853V6.64916L13.1943 6.68858C13.2055 6.6923 13.2166 6.69722 13.2264 6.70462C13.261 6.73052 13.3102 6.76872 13.3731 6.8156C13.4225 6.85502 13.4755 6.90312 13.5395 6.95244C13.6666 7.05476 13.8182 7.18668 13.9846 7.33834C14.029 7.37654 14.0722 7.416 14.1116 7.45546C14.3262 7.65518 14.5666 7.88942 14.7959 8.14834C14.8599 8.22108 14.9229 8.29504 14.9869 8.37272C15.0511 8.45162 15.1189 8.5293 15.1781 8.60698C15.2557 8.71054 15.3396 8.8178 15.4124 8.93C15.4469 8.98301 15.4863 9.03724 15.5196 9.09026C15.6133 9.23204 15.6959 9.37876 15.7748 9.52548C15.8081 9.59328 15.8426 9.66724 15.8722 9.74C15.9597 9.93602 16.0287 10.1358 16.0731 10.3355C16.0867 10.3786 16.0966 10.4255 16.1015 10.4674V10.4773C16.1163 10.5364 16.1213 10.5993 16.1262 10.6634C16.1459 10.8681 16.136 11.0727 16.0917 11.2786C16.0731 11.3662 16.0485 11.4488 16.0189 11.5364C15.9894 11.6201 15.9597 11.7076 15.9215 11.7903C15.8475 11.9616 15.7599 12.133 15.6564 12.2933C15.6231 12.3525 15.5837 12.4154 15.5443 12.4745C15.5011 12.5374 15.4567 12.5966 15.4173 12.6545C15.363 12.7285 15.305 12.8062 15.2459 12.8752C15.1929 12.948 15.1387 13.0208 15.0794 13.0848C14.9969 13.1822 14.918 13.2747 14.8353 13.3634C14.786 13.4215 14.733 13.4806 14.6787 13.5336C14.6257 13.5927 14.5715 13.6457 14.5222 13.6951C14.4396 13.7777 14.3706 13.8418 14.3125 13.8948L14.1769 14.0194C14.1573 14.0366 14.1313 14.0464 14.1043 14.0464H13.0538V15.394H14.3755C14.6713 15.394 14.9525 15.2892 15.1794 15.0969C15.2569 15.0291 15.596 14.7357 15.9967 14.2931C16.0103 14.2783 16.0275 14.2671 16.0473 14.2622L19.6978 13.2069C19.7657 13.1871 19.8347 13.2389 19.8347 13.3104Z"
                            fill="white"
                          ></path>
                        </svg>
                      </span>
                    )}
                    {!img.marketIcon && (
                      <img
                        src="./icon/objkt.png"
                        alt=""
                        ref={featureRef}
                        className={`${
                          sectionsInView.feature
                            ? "animate__animated animate__fadeInUp"
                            : ""
                        }`}
                      />
                    )}
                    <p
                      ref={featureRef}
                      className={`${
                        sectionsInView.feature
                          ? "animate__animated animate__fadeInUp"
                          : ""
                      }`}
                    >
                      {img.caption}
                    </p>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Fade>
      </section>
      <section ref={basicsRef} id="basics" className="basics">
        <img
          id="stitchingFissures"
          src="https://ipfs.io/ipfs/QmcuMSxBcFypPEqmQzVQtXhEd36RsuQzxX9wEE2JK61XZW"
          alt="Stitching Fissures"
        />
        <div id="nftIntro" className="nftIntro ">
          <h2
            ref={basicsRef}
            className={`${
              sectionsInView.basics ? "animate__animated animate__fadeInUp" : ""
            }`}
          >
            WHAT IS AN NFT?
          </h2>
          <p
            className={`${
              sectionsInView.basics ? "animate__animated animate__fadeInUp" : ""
            }`}
          >
            NFT stands for Non-Fungible Token. It's a unique, digital item that
            have been tokenized and stored on a blockchain network. <br />
            <br />
            Each NFT represents a one-of-a-kind digital asset, providing a new
            way to own and showcase digital art.
            <br />
            <br />
            My NFTs are mostly on the Ethereum blockchain and the Tezos
            blockchain.
          </p>
          <div className="mekOS">
            <a
              href="https://objkt.com/asset/KT1GPEoYJ3HNCe7FPbCwczY8KF5Ud4cphe3d/80"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src="./icon/objkt.png" alt="" />
            </a>
            <a
              href="https://objkt.com/asset/KT1GPEoYJ3HNCe7FPbCwczY8KF5Ud4cphe3d/80"
              target="_blank"
              rel="noreferrer noopener"
            >
              <p className="basicsCaption">Stitching Fissures by MEK.txt</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
