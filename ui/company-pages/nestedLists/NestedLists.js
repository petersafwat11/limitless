import React from "react";
import Title from "../title/Title";
import List from "../list/List";
import styles from "./list.module.css";
import Description from "../description/Description";
const NestedListItem = ({ data }) => {
  return (
    <div className={styles.container}>
      <Title title={data.title} />
      {data.description1 && <Description description={data.description1} />}
      {data.lists.map((list, index) => (
        <div key={index} className={styles.listContainer}>
          <h4 className={styles.title}>{list.title}</h4>
          <p className={styles.description}>{list.description}</p>
          {list.subDescription && (
            <p className={styles.subDescription}>{list.subDescription}</p>
          )}
          {list.subDescription2 && (
            <p
              style={{ marginBottom: "1.6rem" }}
              className={styles.subDescription}
            >
              {list.subDescription2}
            </p>
          )}

          {list.subList && (
            <div className={styles.subListContainer}>
              <List list={list.subList} />
            </div>
          )}
          {list.description2 && (
            <p
              style={{ marginBottom: "1.6rem" }}
              className={styles.description}
            >
              {list.description2}
            </p>
          )}
          {list.subList2 && (
            <div className={styles.subListContainer}>
              <List list={list.subList2} />
            </div>
          )}
          {list.description3 && (
            <p
              style={{ marginBottom: "1.6rem" }}
              className={styles.description}
            >
              {list.description3}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default NestedListItem;
