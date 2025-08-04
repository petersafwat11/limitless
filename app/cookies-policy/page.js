import React from "react";
import styles from "./page.module.css";
import Header from "@/ui/company-pages/header/Header";
import { content } from "./data";
import LastUpdated from "@/ui/company-pages/lastUpdated/LastUpdated";
import ListWithDescription from "@/ui/company-pages/listWithDescription/listWithDescription";
import DoubleList from "@/ui/company-pages/doubleList/listWithDescription";
import NestedLists from "@/ui/company-pages/nestedLists/NestedLists";
const page = () => {
  return (
    <div className={styles.page}>
      <Header title="Cookies Policy" />
      <div className={"companyPageContainer"}>
        {content.map((item, index) => (
          <div key={index} className={styles.content}>
            {item.type === "lastUpdate" && <LastUpdated data={item.value} />}
            {item.type === "listWithDescription" && (
              <ListWithDescription data={item.value} />
            )}
            {item.type === "doubleList" && (
              <DoubleList data={item.value} />
            )}
            {item.type === "nestedLists" && (
              <NestedLists data={item.value} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
