import React from "react";
import styles from "./list.module.css";
import Title from "../title/Title";
import Description from "../description/Description";
const ListWithDescription = ({ data }) => {
  return (
    <div className={styles.container}>
      <Title title={data.title} />
      <Description description={data.description1} />
      <ul className={styles.list}>
        {data.list.map((item, index) => (
          <li className={styles.listItem} key={index}>
            {item.listItem}
            {item.listDescription && (
              <span className={styles.listDescription}>
                {item.listDescription}
              </span>
            )}
          </li>
        ))}
      </ul>
      {data.description2 && <Description description={data.description2} />}
    </div>
  );
};

export default ListWithDescription;
