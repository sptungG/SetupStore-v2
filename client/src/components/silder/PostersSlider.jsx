import React, { useCallback, useEffect, useRef, useState } from "react";
import { NOT_FOUND_IMG } from "src/common/constant";
import Swiper, { EffectCreative, Parallax } from "swiper";
import styled from "styled-components";
import { rgba } from "polished";

const PostersSlider = ({ images = [] }) => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    const sliderEl = document.querySelector(".posters-slider");
    const swiperEl = sliderEl.querySelector(".swiper");
    const calcNextOffset = () => {
      const parentWidth = swiperEl.parentElement.offsetWidth;
      const swiperWidth = swiperEl.offsetWidth;
      let nextOffset = (parentWidth - (parentWidth - swiperWidth) / 2) / swiperWidth;
      nextOffset = Math.max(nextOffset, 1);
      return `${nextOffset * 100}%`;
    };
    const PostersSwiper = new Swiper(swiperEl, {
      modules: [Parallax, EffectCreative],
      effect: "creative",
      speed: 600,
      resistanceRatio: 0,
      grabCursor: true,
      parallax: true,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      creativeEffect: {
        limitProgress: images.length > 1 ? images.length - 1 : 1,
        perspective: true,
        shadowPerProgress: true,
        prev: {
          shadow: true,
          translate: ["-25%", 0, -200],
        },
        next: {
          translate: [calcNextOffset(), 0, 0],
        },
      },
    });
    const onResize = () => {
      if (!PostersSwiper || PostersSwiper.destroyed) return;
      // prettier-ignore
      PostersSwiper.params.creativeEffect.next.translate = [calcNextOffset(), 0, 0];
      if (PostersSwiper.params.resizeObserver && typeof window.ResizeObserver !== "undefined") {
        PostersSwiper.update();
      }
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [images.length]);

  return (
    <SliderWrapper className="posters-slider">
      <div className="swiper" ref={sliderRef}>
        <div className="swiper-wrapper">
          {images.map((item) => (
            <div className="swiper-slide">
              <img
                data-swiper-parallax-scale="1.1"
                src={item?.url || NOT_FOUND_IMG}
                alt={item?._id || "NOT_FOUND_IMG"}
              />
            </div>
          ))}
        </div>
        <div className="swiper-button-prev" onClick={handlePrev} />
        <div className="swiper-button-next" onClick={handleNext} />
      </div>
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div`
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  .swiper {
    overflow: visible;
    width: 360px;
    height: 360px;
    margin-right: 0;
  }
  .swiper-slide {
    border-radius: 10px;
    justify-content: center;
    display: flex;
  }
  .swiper-slide-shadow {
    background-color: ${(props) => rgba(props.theme.generatedColors[1], 0.5)};
    backdrop-filter: blur(2px);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .swiper-button-prev {
    color: #fff;
    mix-blend-mode: difference;
  }

  .swiper-button-next {
    color: #fff;
    mix-blend-mode: difference;
  }
`;

export default PostersSlider;
