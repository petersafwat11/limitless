import React from "react";
import styles from "./page.module.css";
import Header from "./_components/header/Header";
import QuestionsGroup from "./_components/questionsGroup/QuestionsGroup";
import { data } from "./data";
const Page = () => {

  return (
    <div className={styles.container}>
      <Header  title="Frequently Asked Questions" />

      <div className={"centeredContent"}>
        <div className={styles.wrapper}>
          {data.map((item) => (
            <QuestionsGroup
              key={item.title}
              title={item.title}
              questions={item.questions}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
