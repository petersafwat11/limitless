"use client";
import React, { useState, useEffect } from "react";
import styles from "./reviews.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const reviewsData = [
  {
    id: 1,
    text: "Swift Wheels made our family vacation unforgettable. The car was clean, comfortable, and the booking process was so simple. Highly recommend!",
    name: "John Doe",
    date: "2021-05-15",
  },
  {
    id: 2,
    text: "Excellent service and great value for money. The staff was professional and the car was in perfect condition. Will definitely use again.",
    name: "Sarah Johnson",
    date: "2021-06-22",
  },
  {
    id: 3,
    text: "Amazing experience! Quick booking, clean vehicles, and competitive prices. Swift Wheels exceeded all my expectations.",
    name: "Mike Wilson",
    date: "2021-07-10",
  },
  {
    id: 4,
    text: "Professional service from start to finish. The car was delivered on time and in excellent condition. Highly recommended!",
    name: "Emma Davis",
    date: "2021-08-05",
  },
  {
    id: 5,
    text: "Great customer service and reliable cars. Made our business trip smooth and hassle-free. Thank you Swift Wheels!",
    name: "David Brown",
    date: "2021-09-18",
  },
  {
    id: 6,
    text: "Outstanding quality and service. The booking process was seamless and the car exceeded our expectations. Five stars!",
    name: "Lisa Anderson",
    date: "2021-10-12",
  },
];

const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 2) % reviewsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isClient]);

  const getVisibleReviews = () => {
    const reviews = [];
    for (let i = 0; i < 2; i++) {
      const index = (currentSlide + i) % reviewsData.length;
      reviews.push(reviewsData[index]);
    }
    return reviews;
  };
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          Hear From Our <span>Customers</span>
        </h2>
        <div className={styles.starsContainer}>
          <Image
            className={styles.star1}
            src={`/svg/google-icon.png`}
            alt="star"
            width={24}
            height={24}
          />
          <p className={`${styles.rating} ${manrope.className}`}>5</p>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Image
                className={styles.star}
                src={`/svg/star.svg`}
                alt="star"
                width={18}
                height={18}
                key={item}
              />
            ))}
          </div>
          <p className={`${styles.reviewsCount} ${manrope.className}`}>
            134 Reviews
          </p>
        </div>
      </div>
      <div className={styles.reviews}>
        {/* Desktop version - unchanged */}
        <div className={styles.desktopReviews}>
          <div className={styles.reviewContainer}>
            {reviewsData.slice(0, 3).map((review) => (
              <div className={styles.review} key={review.id}>
                <p className={styles.text}>{review.text}</p>
                <div className={styles.bottom}>
                  <div className={styles.author}>
                    <p className={styles.name}>{review.name}</p>
                    <p className={styles.date}>{review.date}</p>
                  </div>
                  <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Image
                        className={styles.star}
                        src={`/svg/star.svg`}
                        alt="star"
                        width={18}
                        height={18}
                        key={item}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.reviewContainer}>
            {reviewsData.slice(3, 6).map((review) => (
              <div className={styles.review} key={review.id}>
                <p className={styles.text}>{review.text}</p>
                <div className={styles.bottom}>
                  <div className={styles.author}>
                    <p className={styles.name}>{review.name}</p>
                    <p className={styles.date}>{review.date}</p>
                  </div>
                  <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Image
                        className={styles.star}
                        src={`/svg/star.svg`}
                        alt="star"
                        width={18}
                        height={18}
                        key={item}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile version - slideshow with fade effects */}
        <div className={styles.mobileReviews}>
          <div className={styles.slideContainer}>
            {/* Previous review (faded) */}
            <div className={styles.fadeReview + " " + styles.fadeLeft}>
              {(() => {
                const prevIndex =
                  currentSlide === 0
                    ? reviewsData.length - 2
                    : currentSlide - 2;
                const prevReview = reviewsData[prevIndex];
                return (
                  <div className={styles.review} key={`prev-${prevReview.id}`}>
                    <p className={styles.text}>{prevReview.text}</p>
                    <div className={styles.bottom}>
                      <div className={styles.author}>
                        <p className={styles.name}>{prevReview.name}</p>
                        <p className={styles.date}>{prevReview.date}</p>
                      </div>
                      <div className={styles.stars}>
                        {[1, 2, 3, 4, 5].map((item) => (
                          <Image
                            className={styles.star}
                            src={`/svg/star.svg`}
                            alt="star"
                            width={18}
                            height={18}
                            key={item}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Current reviews (main visible) */}
            <div className={styles.mainReviews}>
              {getVisibleReviews().map((review, index) => (
                <div className={styles.review} key={`main-${review.id}`}>
                  <p className={styles.text}>{review.text}</p>
                  <div className={styles.bottom}>
                    <div className={styles.author}>
                      <p className={styles.name}>{review.name}</p>
                      <p className={styles.date}>{review.date}</p>
                    </div>
                    <div className={styles.stars}>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <Image
                          className={styles.star}
                          src={`/svg/star.svg`}
                          alt="star"
                          width={18}
                          height={18}
                          key={item}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Next review (faded) */}
            <div className={styles.fadeReview + " " + styles.fadeRight}>
              {(() => {
                const nextIndex = (currentSlide + 2) % reviewsData.length;
                const nextReview = reviewsData[nextIndex];
                return (
                  <div className={styles.review} key={`next-${nextReview.id}`}>
                    <p className={styles.text}>{nextReview.text}</p>
                    <div className={styles.bottom}>
                      <div className={styles.author}>
                        <p className={styles.name}>{nextReview.name}</p>
                        <p className={styles.date}>{nextReview.date}</p>
                      </div>
                      <div className={styles.stars}>
                        {[1, 2, 3, 4, 5].map((item) => (
                          <Image
                            className={styles.star}
                            src={`/svg/star.svg`}
                            alt="star"
                            width={18}
                            height={18}
                            key={item}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Slide indicators */}
          <div className={styles.indicators}>
            {Array.from({ length: Math.ceil(reviewsData.length / 2) }).map(
              (_, index) => (
                <div
                  key={index}
                  className={`${styles.indicator} ${
                    Math.floor(currentSlide / 2) === index ? styles.active : ""
                  }`}
                  onClick={() => setCurrentSlide(index * 2)}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
