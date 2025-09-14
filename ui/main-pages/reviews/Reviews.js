import React, { useEffect, useState } from "react";
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

// Sample reviews data with different content for variety
const reviewsData = [
  {
    id: 1,
    text: "Swift Wheels made our family vacation unforgettable. The car was clean, comfortable, and the booking process was so simple. Highly recommend!",
    name: "Sarah Johnson",
    date: "2024-01-15"
  },
  {
    id: 2,
    text: "Excellent service and competitive prices. The team was professional and the car was in perfect condition. Will definitely use again!",
    name: "Mike Chen",
    date: "2024-01-12"
  },
  {
    id: 3,
    text: "Amazing experience! Quick booking, fair pricing, and outstanding customer support. Made our business trip stress-free.",
    name: "Emily Rodriguez",
    date: "2024-01-10"
  },
  {
    id: 4,
    text: "Top-notch service from start to finish. The vehicle was spotless and exactly as described. Couldn't be happier with the experience!",
    name: "David Thompson",
    date: "2024-01-08"
  },
  {
    id: 5,
    text: "Reliable, affordable, and hassle-free. The online process was smooth and the pickup was seamless. Highly recommended!",
    name: "Lisa Park",
    date: "2024-01-05"
  },
  {
    id: 6,
    text: "Great value for money and exceptional customer care. The team went above and beyond to ensure our satisfaction.",
    name: "James Wilson",
    date: "2024-01-03"
  }
];

const Reviews = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
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
        <div className={styles.reviewContainer}>
          {[1, 2, 3, 4].map((item) => (
            <div className={styles.review} key={item}>
              <p className={styles.text}>
                Swift Wheels made our family vacation unforgettable. The car was
                clean, comfortable, and the booking process was so simple.
                Highly recommend. Swift Wheels made our family vacation
                unforgettable. The car was clean, comfortable, and the booking
                process was so simple. Highly recommend!
              </p>
              <div className={styles.bottom}>
                <div className={styles.author}>
                  <p className={styles.name}>John Doe</p>
                  <p className={styles.date}>2021-05-15</p>
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
          {[1, 2, 3, 4].map((item) => (
            <div className={styles.review} key={item}>
              <p className={styles.text}>
                Swift Wheels made our family vacation unforgettable. The car was
                clean, comfortable, and the booking process was so simple.
                Highly recommend. Swift Wheels made our family vacation
                unforgettable. The car was clean, comfortable, and the booking
                process was so simple. Highly recommend!
              </p>
              <div className={styles.bottom}>
                <div className={styles.author}>
                  <p className={styles.name}>John Doe</p>
                  <p className={styles.date}>2021-05-15</p>
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
    </div>
  );
};

export default Reviews;
