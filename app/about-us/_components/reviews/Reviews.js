import React from "react";
import styles from "./reviews.module.css";
import Image from "next/image";
const Reviews = () => {
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <h2 className={styles.title}>Hear From Our Customers</h2>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Image
              src={`/svg/dark-star.svg`}
              alt="star"
              width={18}
              height={18}
              key={item}
            />
          ))}
        </div>
      </div>
      <div className={styles.reviews}>
        <div className={styles.review}>
          <p className={styles.text}>
            Swift Wheels made our family vacation unforgettable. The car was
            clean, comfortable, and the booking process was so simple. Highly
            recommend. Swift Wheels made our family vacation unforgettable. The
            car was clean, comfortable, and the booking process was so simple.
            Highly recommend!
          </p>
          <div className={bottom}>
            <div className={styles.author}>
              <p className={styles.name}>John Doe</p>
              <p className={styles.date}>2021-05-15</p>
            </div>

            {[1, 2, 3, 4, 5].map((item) => (
              <Image
                src={`/svg/dark-star.svg`}
                alt="star"
                width={18}
                height={18}
                key={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
