import React from "react";
import styles from "./list.module.css";

const List = ({ list }) => {
  // Function to detect the type of content after the colon
  const detectContentType = (content) => {
    const trimmedContent = content.trim();

    // Check if it's an email
    if (trimmedContent.includes("@") && trimmedContent.includes(".")) {
      return "email";
    }

    // Check if it's a phone number (contains digits and common phone characters)
    if (/^[\d\s\-\+\(\)]+$/.test(trimmedContent)) {
      return "phone";
    }

    // Check if it's a website (starts with www. or contains .com, .org, .uk, etc.)
    if (
      trimmedContent.startsWith("www.") ||
      /\.(com|org|uk|net|edu|gov|co\.uk)($|\/)/i.test(trimmedContent)
    ) {
      return "website";
    }

    return "text";
  };

  // Function to render the appropriate clickable element
  const renderClickableContent = (content, type) => {
    const trimmedContent = content.trim();

    switch (type) {
      case "email":
        return (
          <a href={`mailto:${trimmedContent}`} className={styles.clickableLink}>
            {trimmedContent}
          </a>
        );

      case "phone":
        return (
          <a
            href={`tel:${trimmedContent.replace(/\s/g, "")}`}
            className={styles.clickableLink}
          >
            {trimmedContent}
          </a>
        );

      case "website":
        const url = trimmedContent.startsWith("http")
          ? trimmedContent
          : `https://${trimmedContent}`;
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.clickableLink}
          >
            {trimmedContent}
          </a>
        );

      default:
        return <span>{trimmedContent}</span>;
    }
  };

  // Function to render list item with special formatting
  const renderListItem = (item) => {
    if (typeof item === "string" && item.includes(":")) {
      const colonIndex = item.indexOf(":");
      const label = item.substring(0, colonIndex);
      const content = item.substring(colonIndex + 1);
      const contentType = detectContentType(content);

      return (
        <>
          <span className={styles.boldLabel}>{label}:</span>{" "}
          {renderClickableContent(content, contentType)}
        </>
      );
    }

    return item;
  };

  return (
    <ul className={styles.list}>
      {list.map((item, index) => (
        <li key={index} className={styles.listItem}>
          {renderListItem(item)}
        </li>
      ))}
    </ul>
  );
};

export default List;
