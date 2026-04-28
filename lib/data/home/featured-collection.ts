export interface Collection {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const featuredCollections: Collection[] = [
  {
    id: 1,
    title: "Summer Breeze",
    description: "Lightweight crepes with ombre finish",
    image: "/featured/summer.jpg",
  },
  {
    id: 2,
    title: "Pop With Color",
    description: "A unique blend of popping colors",
    image: "/featured/color.jpg",
  },
  {
    id: 3,
    title: "Print Essentials",
    description: "Vibrant print for a unique style",
    image: "/featured/prints.jpg",
  },
];
