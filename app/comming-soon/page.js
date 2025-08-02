import React from 'react'
import Header from './_components/header/Header'
import styles from './page.module.css'
import Card from './_components/card/Card'
import { features } from './data'
const page = () => {
  return (
    <div>
      <Header />
      <div className={styles.cardsContainer}>
        {features.map((feature, index) => (
          <Card key={index} {...feature} />
        ))}
      </div>
    </div>
  )
}

export default page