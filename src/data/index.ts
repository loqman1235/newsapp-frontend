export const heroSectionNewsData = [
  {
    id: 1,
    title:
      "Israel-Gaza war: Israel demands names of hostages still alive for deal on new ceasefire",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
    category: "News",
    image:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/D001/production/_132794235_d44c6a2d49c2dd8dcbf39d2e35490cb14bcd95340_406_3913_22021000x563.jpg.webp",
  },
  {
    id: 2,
    title: "Gazans crowdfund thousands for uncertain escape",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
    category: "News",
    image:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/0378/production/_132788800_manonhorse.jpg.webp",
  },
  {
    id: 3,
    title:
      "Ukraine war: Russia says it intercepts 38 Ukrainian drones attacking Crimea",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
    category: "News",
    image:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/E1F9/production/_132794875_d6e38bc36dedeb9a3717c7b3750c14b1ea222c530_0_4628_30011000x648.jpg.webp",
  },
  {
    id: 4,
    title: "Can bright green 'super powders' really make you healthy?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
    category: "Health",
    image:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/122E0/production/_132746447_gettyimages-1299543321-1.jpg.webp",
  },
] as const;

export type Article = {
  id: number;
  title: string;
  status: "published" | "draft";
  createdAt?: string;
};

export const articlesData: Article[] = [
  {
    id: 1,
    title: "Article 1",
    status: "published",
    createdAt: "2022-01-01",
  },
  {
    id: 2,
    title: "Article 2",
    status: "draft",
    createdAt: "2022-01-02",
  },
  {
    id: 3,
    title: "Article 3",
    status: "draft",
    createdAt: "2022-01-03",
  },
  {
    id: 4,
    title: "Article 4",
    status: "published",
    createdAt: "2022-01-04",
  },
];
