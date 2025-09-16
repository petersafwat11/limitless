"use client";
import React, { useState } from "react";
import styles from "./questionsGroup.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const QuestionsGroup = ({ questions }) => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  return (
    <div className={styles.container}>
      <div className={styles.questions}>
        {questions.map((question) => (
          <div
            onClick={() =>
              question.title === activeQuestion
                ? setActiveQuestion(null)
                : setActiveQuestion(question.title)
            }
            className={`${styles.question} ${
              activeQuestion === question.title ? styles.questionActive : ""
            }`}
            key={question.title}
          >
            <div className={styles.content}>
              <h4
                className={`${styles.questionTitle} ${plusJakartaSans.className}`}
              >
                {question.title}
              </h4>
              <div
                className={`${styles.answerWrapper} ${
                  question.title === activeQuestion
                    ? styles.answerExpanded
                    : styles.answerCollapsed
                }`}
              >
                <p className={styles.questionAnswer}>{question.answer}</p>
              </div>
            </div>
            <div
            
              className={`${styles.iconContainer} ${
                question.title === activeQuestion ? styles.iconActive : ""
              }`}
            >
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="24"
                  fill={
                    question.title === activeQuestion ? "#0388FF" : "#ECF0FE"
                  }
                  className={styles.iconCircle}
                />
                <path
                  d="M23.9941 16V32"
                  stroke={
                    question.title === activeQuestion ? "white" : "#0388FF"
                  }
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  className={styles.iconVerticalLine}
                />
                <path
                  d="M16 24.0068L32 24.0068"
                  stroke={
                    question.title === activeQuestion ? "white" : "#0388FF"
                  }
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  className={styles.iconHorizontalLine}
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsGroup;
