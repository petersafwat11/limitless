import React from "react";
import Title from "../title/Title";
import Description from "../description/Description";
import List from "../list/List";
import styles from "./listWithDescription.module.css";
const ListWithDescription = ({ data }) => {
  return (
    <div className={styles.container}>
      <Title title={data.title} />
      <Description description={data.description1} />
      {data.list && <List list={data.list} />}
      {data.description2 && <Description description={data.description2} />}
    </div>
  );
};

export default ListWithDescription;
