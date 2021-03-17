import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const formatDate = (date) => {
    const theDate = new Date(date);
    return theDate.toLocaleDateString("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};
export const trimText = (text = "", limit: number) =>
  text.length > limit ? `${text.slice(0, limit)}` : text;
