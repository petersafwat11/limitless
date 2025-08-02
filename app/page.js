import Image from "next/image";
import styles from "./page.module.css";
import Insurance from "../ui/landing-page/insurance/Insurance";
export default function Home() {
  return (
    <div className={styles.page}>
      <Insurance />
    </div>
  );
}
