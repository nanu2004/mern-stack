export const truncateContentBox = (content, maxLength = 20) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + "...";
    }
    return content;
  };