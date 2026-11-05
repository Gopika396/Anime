import gojoImg from "../assets/images/gojo.jpg";
import luffyImg from "../assets/images/luffy.jpg";
import tanjiroImg from "../assets/images/tanjiro.jpg";
import posterImg from "../assets/images/anime-poster.jpg";

export const characters = [
  {
    id: "gojo",
    name: "Gojo Satoru",
    series: "Jujutsu Kaisen",
    symbol: "無",
    colors: ["#5b7cff", "#1b1f4a"],
    power: "98 / 100",
    ability: "Limitless: Infinite Void",
    category: "Special Grade Sorcerer",
    image: gojoImg,
  },
  {
    id: "luffy",
    name: "Monkey D. Luffy",
    series: "One Piece",
    symbol: "海",
    colors: ["#ffb02e", "#a3201a"],
    power: "95 / 100",
    ability: "Gear 5: Rubber Body",
    category: "Pirate Captain",
    image: luffyImg,
  },
  {
    id: "tanjiro",
    name: "Tanjiro Kamado",
    series: "Demon Slayer",
    symbol: "炭",
    colors: ["#2fbf8f", "#10322f"],
    power: "88 / 100",
    ability: "Hinokami Kagura: Sun Breathing",
    category: "Demon Slayer Corps",
    image: tanjiroImg,
  },
];

export const featured = {
  title: "Anime Collection",
  symbol: "魂",
  colors: ["#ff8fa3", "#3a0a2e"],
  image: posterImg,
};