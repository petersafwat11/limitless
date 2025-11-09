import React from "react";
import Title from "../title/Title";
import Description from "../description/Description";
import List from "../list/List";
import styles from "./listItem.module.css";
const ListItem = ({ data }) => {
  return (
    <div className={styles.container}>
      <Title title={data.title} />
      <Description description={data.description1} />
      {data.subDescription1 && (
        <div className={styles.subDesc}>
          <Description description={data.subDescription1} />
        </div>
      )}
      {data.subDescription2 && (
        <div className={styles.subDesc}>
          <Description description={data.subDescription2} />
        </div>
      )}
      {data.list && <List list={data.list} />}
      {data.description2 && <Description description={data.description2} />}
    </div>
  );
};

export default ListItem;
