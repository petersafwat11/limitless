import React from "react";
import Title from "../title/Title";
import Description from "../description/Description";
import List from "../list/List";
import styles from "./nestedLists.module.css";
const NestedLists = ({ data }) => {
  return (
    <div className={styles.container}>
      <Title title={data.title} />
      {data.lists.map((list, index) => (
        <div key={index} className={styles.listContainer}>
          <h4 className={styles.title}>{list.title}</h4>
          <p className={styles.description}>{list.description}</p>
          <p className={styles.subDescription}>{list.subDescription}</p>
          <div className={styles.subListContainer}>
            <List list={list.subList} />
          </div>
          {list.description2 && (
            <p className={styles.description}>{list.description2}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default NestedLists;
