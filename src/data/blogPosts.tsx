import soImg01 from "@/assets/blog/soft-opening/soft-opening-01.jpg";
import soImg02 from "@/assets/blog/soft-opening/soft-opening-02.jpg";
import soImg03 from "@/assets/blog/soft-opening/soft-opening-03.jpg";
import soImg04 from "@/assets/blog/soft-opening/soft-opening-04.jpg";
import soImg05 from "@/assets/blog/soft-opening/soft-opening-05.jpg";
import soImg06 from "@/assets/blog/soft-opening/soft-opening-06.jpg";
import soImg07 from "@/assets/blog/soft-opening/soft-opening-07.jpg";
import soImg08 from "@/assets/blog/soft-opening/soft-opening-08.jpg";
import soImg09 from "@/assets/blog/soft-opening/soft-opening-09.jpg";

export interface BlogImage {
  src: string;
  alt: string;
}

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "gallery"; images: BlogImage[] };

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO date
  displayDate: string;
  excerpt: string;
  coverImage: BlogImage;
  content: BlogBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "soft-opening",
    title: "Nixon Signature Estates Celebrates Its Soft Opening",
    date: "2026-09-11",
    displayDate: "September 11, 2026",
    excerpt:
      "On September 11th we opened our courtyard to family, friends, and neighbors for a soft opening celebration — tents, balloons, good food, and a first look at the community.",
    coverImage: {
      src: soImg04,
      alt: "Nixon Signature Estates building with celebration tent and balloon arch during the soft opening",
    },
    content: [
      {
        type: "p",
        text: "On September 11th, we opened the courtyard at Nixon Signature Estates for a soft opening celebration — a chance for family, friends, neighbors, and the Houston community to see the property in person before we officially welcome our first residents home.",
      },
      {
        type: "p",
        text: "The courtyard was transformed for the occasion: white event tents, a balloon arch in Nixon's signature green and gold, a grill and popcorn machine going, music playing, and kids running around while guests mingled and toured the grounds. It was exactly the kind of warm, community-first atmosphere we want Nixon Signature Estates to be known for.",
      },
      {
        type: "gallery",
        images: [
          { src: soImg08, alt: "Guests arriving at the soft opening celebration" },
          { src: soImg06, alt: "Guests gathered at the food and DJ tent" },
          { src: soImg03, alt: "Popcorn machine and grill station set up for the celebration" },
        ],
      },
      {
        type: "h2",
        text: "A Community Celebration",
      },
      {
        type: "p",
        text: "This soft opening wasn't a ribbon-cutting with speeches — it was a block party. Neighbors stopped by, families brought their kids, and everyone got a firsthand look at the building that will soon be home to Veterans, people with special needs, and seniors from across the Houston area. That's exactly the spirit behind Nixon Signature Estates: comfort, dignity, and community, starting from day one.",
      },
      {
        type: "gallery",
        images: [
          { src: soImg02, alt: "Balloon arch and event tent outside Nixon Signature Estates" },
          { src: soImg01, alt: "Aerial view of the soft opening celebration setup" },
          { src: soImg05, alt: "Courtyard view during the soft opening" },
          { src: soImg07, alt: "Nixon Signature Estates building during the soft opening celebration" },
          { src: soImg09, alt: "Wide view of the soft opening celebration in the courtyard" },
        ],
      },
      {
        type: "h2",
        text: "What's Next",
      },
      {
        type: "p",
        text: "With the soft opening behind us, Nixon Signature Estates is now leasing a limited number of suites. If you weren't able to join us on September 11th, you can still see the property — schedule a tour, browse real photos of our furnished model suite, or start your leasing application today.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
