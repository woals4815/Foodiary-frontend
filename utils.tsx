import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const formatDate = (date: any) => {
    const theDate = new Date(date);
    return theDate.toLocaleDateString("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};
export const trimText = (text = "", limit: number) => {
  if (!text){
      return;
  }
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

export const trimTextEol = (text = "") => {
    if (!text){
        return;
    }
    const textStrip = text.split("\n")[0];
    return `${textStrip}\n`+ "...";    
}