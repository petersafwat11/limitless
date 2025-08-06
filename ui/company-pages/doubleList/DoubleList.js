import React from "react";
import Title from "../title/Title";
import Description from "../description/Description";
import List from "../list/List";
import styles from "./list.module.css";
const DoubleList = ({ data }) => {
  return (
    <div className={styles.container}>
      <Title title={data.title} />
      <Description description={data.description1} />
      {data.list1 && <List list={data.list1} />}
      {data.description2 && <Description description={data.description2} />}
      {data.list2 && <List list={data.list2} />}
      {data.description3 && <Description description={data.description3} />}
    </div>
  );
};

export default DoubleList;
