import React from 'react'
import styles from './page.module.css'
import Booklets from './_components/booklets/Booklets'
import Table from './_components/table/Table'
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const page = () => {
  return (
    <div className={styles.page}>
      <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
        Policy documents
      </h3>
      <Table
        title="Policy documents"
        columns={["Document", "Document number", "Document type"]}
        data={[
          { document: "Certificate of Motor Insurance", documentNumber: "Document 06/12/20252", documentType: "PDF" },
        ]}
      />
      <Booklets />
    </div>
  );
};

export default page;