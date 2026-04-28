export interface FabricCategory {
  id: number;
  name: string;
  image: string;
}

export const popularFabrics: FabricCategory[] = [
  { id: 1, name: "Cotton", image: "/popular/cotton.webp" },
  { id: 2, name: "Linen", image: "/popular/linen.jpg" },
  { id: 3, name: "Satin", image: "/popular/satin.webp" },
  { id: 4, name: "Silk", image: "/popular/silk.webp" },
  { id: 5, name: "Crepe", image: "/popular/crepe.webp" },
];
