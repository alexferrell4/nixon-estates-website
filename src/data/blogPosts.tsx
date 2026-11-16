import soImg01 from "@/assets/blog/soft-opening/soft-opening-01.jpg";
import soImg02 from "@/assets/blog/soft-opening/soft-opening-02.jpg";
import soImg03 from "@/assets/blog/soft-opening/soft-opening-03.jpg";
import soImg04 from "@/assets/blog/soft-opening/soft-opening-04.jpg";
import soImg05 from "@/assets/blog/soft-opening/soft-opening-05.jpg";
import soImg06 from "@/assets/blog/soft-opening/soft-opening-06.jpg";
import soImg07 from "@/assets/blog/soft-opening/soft-opening-07.jpg";
import soImg08 from "@/assets/blog/soft-opening/soft-opening-08.jpg";
import soImg09 from "@/assets/blog/soft-opening/soft-opening-09.jpg";
import rcFlyer from "@/assets/blog/ribbon-cutting/ribbon-cutting-flyer.jpg";
import rcrImg01 from "@/assets/blog/ribbon-cutting-recap/ribbon-cutting-recap-01.jpg";
import rcrImg02 from "@/assets/blog/ribbon-cutting-recap/ribbon-cutting-recap-02.jpg";
import rcrImg03 from "@/assets/blog/ribbon-cutting-recap/ribbon-cutting-recap-03.jpg";
import rcrImg04 from "@/assets/blog/ribbon-cutting-recap/ribbon-cutting-recap-04.jpg";
import forbesCover from "@/assets/blog/forbes-eldercare-feature/ms-nixon-ribbon-cutting.jpg";

const SITE_URL = "https://nixon-estates.com";

export interface BlogImage {
  src: string;
  alt: string;
  position?: string; // CSS object-position for cropped views
}

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "gallery"; images: BlogImage[] }
  | { type: "figure"; image: BlogImage } // full, uncropped image
  | { type: "links"; heading: string; links: BlogLink[] };

export interface BlogLink {
  label: string;
  href: string; // "/..." for on-site links, full URL for external
  source?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO date
  displayDate: string;
  excerpt: string;
  coverImage: BlogImage;
  content: BlogBlock[];
  pinned?: boolean; // shown first on the blog index
  seo?: { title: string; description: string };
  schema?: Record<string, unknown>; // JSON-LD
}

const FORBES_URL =
  "https://www.forbes.com/sites/christinecarter/2026/11/14/explainer-how-many-times-does-the-same-taxpayer-pay-for-americas-eldercare-crisis/";

export const blogPosts: BlogPost[] = [
  {
    slug: "ribbon-cutting-recap",
    title: "A Veterans Day to Remember: Our Ribbon Cutting Recap",
    date: "2026-11-16",
    displayDate: "November 16, 2026",
    pinned: true,
    excerpt:
      "On Veterans Day, family, friends, community partners, and invited dignitaries joined us to officially cut the ribbon at Nixon Signature Estates. Here's a look back at the day.",
    coverImage: {
      src: rcrImg01,
      alt: "Team members and invited dignitaries gathered at the ribbon with gold ceremonial scissors at Nixon Signature Estates",
      position: "center 30%",
    },
    seo: {
      title: "Ribbon Cutting Recap | Nixon Signature Estates",
      description:
        "Photos and highlights from the Veterans Day ribbon cutting at Nixon Signature Estates in Houston on November 11, 2026.",
    },
    content: [
      {
        type: "p",
        text: "On Wednesday, November 11, 2026, Veterans Day, we officially cut the ribbon at Nixon Signature Estates. Thank you to every family member, neighbor, community partner, and friend who joined us at 6710 Bleker St to celebrate this milestone with us.",
      },
      {
        type: "h2",
        text: "The Program",
      },
      {
        type: "p",
        text: "JoAnn Goodie Charles opened the morning with a warm welcome, and Claude Lewis led us in an opening prayer. Our founder, Ms. Debora A. Nixon, then addressed guests, marking the day Nixon Signature Estates officially opened its doors as an Intentional Living community.",
      },
      {
        type: "p",
        text: "The program also included special remarks from Council Member Willie Davis, followed by the official ribbon cutting with the North Chamber, Ms. Nixon, and our invited dignitaries.",
      },
      {
        type: "gallery",
        images: [
          {
            src: rcrImg01,
            alt: "The official ribbon cutting, with gold ceremonial scissors at the ribbon and dignitaries and team members gathered around",
          },
          {
            src: rcrImg02,
            alt: "Group photo of the Nixon Signature Estates team and invited guests with the ceremonial scissors",
          },
          {
            src: rcrImg03,
            alt: "Ms. Debora Nixon speaking to guests during the program",
            position: "center 20%",
          },
          {
            src: rcrImg04,
            position: "center 15%",
            alt: "Ribbon Cutting program sign listing the welcome, opening prayer, words from the founder, special remarks, ceremony, and tours",
          },
        ],
      },
      {
        type: "h2",
        text: "Tours and Refreshments",
      },
      {
        type: "p",
        text: "After the ceremony, guests toured the first level and enjoyed refreshments together. It was a joy to welcome visitors into the spaces we have worked so hard to create.",
      },
      {
        type: "h2",
        text: "Thank You",
      },
      {
        type: "p",
        text: "Holding this celebration on Veterans Day made it especially meaningful. Veterans are at the heart of our community, and we are grateful to everyone who helped us honor those who served while opening this new chapter. If you were not able to join us, we would love to welcome you for a personal tour.",
      },
      {
        type: "h2",
        text: "In the News",
      },
      {
        type: "p",
        text: "The same week, Ms. Nixon was interviewed for a Forbes explainer on the cost of eldercare in America. Read more about it in our post on the interview, or go straight to the article below.",
      },
      {
        type: "links",
        heading: "References",
        links: [
          {
            label: "Read the full article on Forbes",
            href: FORBES_URL,
            source: "Forbes, November 14, 2026",
          },
          {
            label: "Ms. Debora Nixon Interviewed by Forbes",
            href: "/blog/forbes-eldercare-feature",
          },
        ],
      },
    ],
  },
  {
    slug: "forbes-eldercare-feature",
    title: "Ms. Debora Nixon Interviewed by Forbes",
    date: "2026-11-16",
    displayDate: "November 16, 2026",
    pinned: true,
    excerpt:
      "Ms. Debora Nixon of Nixon Home Care, Inc. was interviewed for a Forbes explainer on how Americans pay for eldercare. Her insights appear in the section “Where the money goes.”",
    coverImage: {
      src: forbesCover,
      alt: "Ms. Debora Nixon smiling as she holds gold ceremonial scissors at the Nixon Signature Estates ribbon cutting",
      position: "center 20%",
    },
    seo: {
      title: "Ms. Debora Nixon Interviewed by Forbes | Nixon Signature Estates",
      description:
        "Ms. Debora Nixon of Nixon Home Care, Inc. shared her perspective on eldercare costs in a Forbes explainer published November 14, 2026.",
    },
    content: [
      {
        type: "p",
        text: "We are proud to share that Ms. Debora Nixon of Nixon Home Care, Inc., the founder behind Nixon Signature Estates, was interviewed for a Forbes explainer published on November 14, 2026.",
      },
      {
        type: "h2",
        text: "About the Article",
      },
      {
        type: "p",
        text: "Written by Christine Carter, the explainer looks at how the same taxpayer can end up paying for America's eldercare crisis more than once. Ms. Nixon's insights appear in the section titled “Where the money goes.”",
      },
      {
        type: "h2",
        text: "Why It Matters to Us",
      },
      {
        type: "p",
        text: "The cost of care shapes every decision families make about where and how their loved ones live. Those questions are close to home for the Nixon Home Care family, and they are part of why Nixon Signature Estates was built around Intentional Living: comfort, dignity, and community for Veterans, people with special needs, and seniors.",
      },
      {
        type: "p",
        text: "We are grateful to Forbes for including Ms. Nixon's voice in this important conversation, and we encourage you to read the full article.",
      },
      {
        type: "links",
        heading: "References",
        links: [
          {
            label: "Read the full article on Forbes",
            href: FORBES_URL,
            source: "Forbes, November 14, 2026",
          },
          {
            label: "A Veterans Day to Remember: Our Ribbon Cutting Recap",
            href: "/blog/ribbon-cutting-recap",
          },
        ],
      },
    ],
  },
  {
    slug: "ribbon-cutting",
    title: "Join Us for the Nixon Signature Estates Ribbon Cutting",
    date: "2026-10-27",
    displayDate: "October 27, 2026",
    excerpt:
      "On Veterans Day, November 11, 2026, we will cut the ribbon at Nixon Signature Estates. Join us to tour the suites and meet Ms. Nixon and our team.",
    coverImage: {
      src: rcFlyer,
      alt: "Nixon Signature Estates Ribbon Cutting flyer: Wednesday, November 11, 2026, 10:00 AM to 12:00 PM, Veterans Day. Shows the gold NSE logo, the emblems of the six U.S. military branches, and the three-story Nixon Signature Estates building at dusk. Tour the suites and meet Ms. Nixon and our team at 6710 Bleker St, Houston, TX 77016. RSVP (713) 419-2653.",
      position: "center 76%",
    },
    seo: {
      title: "Veterans Day Ribbon Cutting | Nixon Signature Estates",
      description:
        "Join Nixon Signature Estates for our ribbon cutting on Veterans Day, Nov. 11, 2026, 10 AM–12 PM in Houston. Tour the suites and meet Ms. Nixon and our team.",
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Nixon Signature Estates Ribbon Cutting",
      description:
        "A Veterans Day ribbon cutting at Nixon Signature Estates, an Intentional Living community in Houston. Guests can tour the suites and meet Ms. Nixon and the team.",
      startDate: "2026-11-11T10:00:00-06:00",
      endDate: "2026-11-11T12:00:00-06:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      isAccessibleForFree: true,
      image: [new URL(rcFlyer, SITE_URL).href],
      location: {
        "@type": "Place",
        name: "Nixon Signature Estates",
        address: {
          "@type": "PostalAddress",
          streetAddress: "6710 Bleker St",
          addressLocality: "Houston",
          addressRegion: "TX",
          postalCode: "77016",
          addressCountry: "US",
        },
      },
      organizer: {
        "@type": "Organization",
        name: "Nixon Signature Estates",
        url: SITE_URL,
        telephone: "+1-713-419-2653",
      },
    },
    content: [
      {
        type: "links",
        heading: "Update: This event has passed",
        links: [{ label: "See photos and highlights in our ribbon cutting recap", href: "/blog/ribbon-cutting-recap" }],
      },
      {
        type: "p",
        text: "On Wednesday, November 11, 2026, we will cut the ribbon at Nixon Signature Estates, and we would be honored to have you with us. It feels fitting that this milestone falls on Veterans Day, a day set aside to thank those who served. Veterans are at the heart of our community, and we can think of no better morning to mark this next chapter.",
      },
      {
        type: "h2",
        text: "Event Details",
      },
      {
        type: "p",
        text: "The ribbon cutting will take place from 10:00 AM to 12:00 PM at 6710 Bleker St, Houston, TX 77016.",
      },
      {
        type: "h2",
        text: "What to Expect",
      },
      {
        type: "p",
        text: "After the ceremony, guests are welcome to tour our suites and see firsthand what Intentional Living looks like at Nixon Signature Estates: thoughtfully designed spaces built around comfort, dignity, and community. Ms. Nixon and our team will be there to greet you, answer your questions, and share the vision behind this home.",
      },
      {
        type: "figure",
        image: {
          src: rcFlyer,
          alt: "Nixon Signature Estates Ribbon Cutting invitation flyer with event date, time, address, and RSVP number",
        },
      },
      {
        type: "h2",
        text: "We Hope You'll Join Us",
      },
      {
        type: "p",
        text: "Whether you are a Veteran, a family member, a neighbor, or a friend who has followed our journey since September, you are warmly invited. To help us prepare, please RSVP by calling (713) 419-2653. We look forward to celebrating with you.",
      },
    ],
  },
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
