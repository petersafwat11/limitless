import React from "react";
import styles from "./page.module.css";
import Header from "@/ui/company-pages/header/Header";
import { content } from "./data";
import LastUpdated from "@/ui/company-pages/lastUpdated/LastUpdated";
import ListItem from "@/ui/company-pages/listItem/listItem";

export const metadata = {
  title: "Privacy Policy | Limitless Cover",
};

const page = () => {
  return (
    <div className={styles.page}>
      <Header title="Privacy Policy" />
      <div className={"centeredContent"}>
        <div className={"companyPageContainer"}>
          {content.map((item, index) => (
            <div key={index} className={styles.content}>
              {item.type === "lastUpdate" && <LastUpdated data={item.value} />}
              {item.type === "list" && <ListItem data={item.value} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
