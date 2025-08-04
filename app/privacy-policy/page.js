import React from "react";
import styles from "./page.module.css";
import Header from "@/ui/company-pages/header/Header";
import { content } from "./data";
import LastUpdated from "@/ui/company-pages/lastUpdated/LastUpdated";
import ListWithDescription from "@/ui/company-pages/listWithDescription/listWithDescription";
const page = () => {
  return (
    <div className={styles.page}>
        <Header title="Privacy Policy" />
      <div className={"companyPageContainer"}>
        {content.map((item, index) => (
          <div key={index} className={styles.content}>
            {item.type === "lastUpdate" && <LastUpdated data={item.value} />}
            {item.type === "listWithDescription" && <ListWithDescription data={item.value} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
