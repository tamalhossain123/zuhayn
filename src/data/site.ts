export const SITE = {
  name: "ZUHAYN",
  legalName: "ZUHAYN - Creative & IT Solutions",
  url: "https://zuhayn.com",
  phoneDisplay: "+880 1917-653545",
  phoneHref: "tel:+8801917653545",
  facebook: "https://facebook.com/zuhaynbd",
  linkedin: "https://www.linkedin.com/company/zuhayn",
  address: "Post Office Road, Middle Badda, Progoti Soroni, Dhaka-1212",
  city: "Dhaka",
  country: "Bangladesh",
  founded: "2020",
  founder: "Mohammad Forhad",
};

export type Service = {
  title: string;
  description: string;
  tags: string[];
  /** index into SVG_ART (original design icons) */
  icon: number;
};

export const SERVICES: Service[] = [
  {
    title: "Digital Marketing",
    description:
      "Result-driven campaigns that put your business in front of the right customers, every day.",
    tags: ["Facebook Ads", "Instagram Ads", "YouTube Ads", "LinkedIn & Google Ads"],
    icon: 5
  },
  {
    title: "Creative Design",
    description:
      "Fresh, original creative concepts that give your brand a look people remember, and a reason to choose you.",
    tags: ["Social Media Creatives", "Ad & Banner Design", "Campaign Concepts", "Marketing Materials"],
    icon: 6
  },
  {
    title: "Graphic Design",
    description:
      "Professional design for every touchpoint of your business, delivered print-ready and pixel-perfect.",
    tags: ["Logo & Brand Identity", "Social Media Content", "Packaging Design", "Posters & Flyers"],
    icon: 7
  },
  {
    title: "Video Editing",
    description:
      "Clean, engaging edits for ads, reels and promos that hold attention from the first second to the call to action.",
    tags: ["Ad Video Editing", "Reels & Shorts", "Promo & Product Videos", "Motion Graphics & Captions"],
    icon: 8
  },
  {
    title: "Branding & Visual Identity",
    description:
      "A complete, consistent identity, logo, colours and style, so your business looks established everywhere it appears.",
    tags: ["Logo & Identity Design", "Brand Colors & Typography", "Brand Guidelines", "Business Stationery"],
    icon: 9
  },
  {
    title: "Promotional Ad Campaigns",
    description:
      "Eye-catching promotional designs and campaigns built around one goal: turning viewers into buyers.",
    tags: ["Sale & Offer Campaigns", "Product Launch Creatives", "Seasonal & Festival Ads", "Retargeting Ad Sets"],
    icon: 10
  },
  {
    title: "Web Design & Development",
    description:
      "Modern websites that load fast, look premium and turn visitors into enquiries.",
    tags: ["Custom Website Design", "Mobile Optimization", "SEO-Ready Websites", "E-commerce Solutions"],
    icon: 11
  },
  {
    title: "Website & App Mockups",
    description:
      "Realistic mockup presentations that show your digital product at its best, for pitches, portfolios and launches.",
    tags: ["Website UI Mockups", "App Screen Design", "Pitch Deck Visuals", "Portfolio Presentations"],
    icon: 12
  },
  {
    title: "AI Automation",
    description:
      "Smart automation that saves your team hours every week, and keeps answering your customers even while you sleep.",
    tags: [
      "AI Chatbots for Support & Sales",
      "Automated Marketing Workflows",
      "AI-Assisted Content Creation",
      "Business Process Automation",
    ],
    icon: 13
  },
];

export type Client = { name: string; sector: string; note: string; initials: string; icon: number };

export const CLIENTS: Client[] = [
  {
    name: "Vejal Nai",
    sector: "Retail & Consumer Brand",
    note: "Social media design and brand creatives for a growing consumer brand, clean, trustworthy designs that put product quality first.",
    initials: "VN",
    icon: 14,
  },
  {
    name: "Arab Builders",
    sector: "Construction · Dhaka",
    note: "Social media design and promotional creatives for a Dhaka-based construction & digital surveying company.",
    initials: "AB",
    icon: 15,
  },
  {
    name: "Sigma Chemical",
    sector: "Chemical · Industrial",
    note: "Professional brand and promotional design for a chemical company, clear, credible creatives for an industrial audience.",
    initials: "SC",
    icon: 16,
  },
  {
    name: "SNM Apparels",
    sector: "Clothing & Apparel",
    note: "Social media creatives and product campaigns for an apparel brand, designs that make every garment look premium and ready to sell.",
    initials: "SN",
    icon: 17,
  },
  {
    name: "Admission Connect",
    sector: "Education · Study Abroad",
    note: "Study-abroad campaign creatives and social media design for an education consultancy helping students go further.",
    initials: "AC",
    icon: 18,
  },
  {
    name: "Travel Met",
    sector: "Travel Agency",
    note: "Tour package promos and social media design for a travel agency, campaigns that sell the trip at a glance.",
    initials: "TM",
    icon: 19,
  },
  {
    name: "Kebab Inn",
    sector: "Food & Restaurant",
    note: "Mouth-watering food offers and social media design for a restaurant brand, creatives built to turn scrollers into diners.",
    initials: "KI",
    icon: 20,
  },
  {
    name: "Samadhan",
    sector: "Business Services",
    note: "Brand and social media design support for a growing service business, clean, consistent and ready to share.",
    initials: "S",
    icon: 21,
  },
];

export type WorkSample = {
  id: string;
  /** original ad-stage modifier class: ad-fashion | ad-food | ad-build | ad-tech */
  stage: string;
  /** index into SVG_ART for the stage artwork */
  art: number;
  logo: string;
  offer: string;
  headlineTop: string;
  headlineEm: string;
  sub: string;
  cta: string;
  tag: string;
  kind: string;
  description: string;
};

export const WORK: WorkSample[] = [
  {
    id: "vastra",
    stage: "ad-fashion",
    art: 28,
    logo: "Vastra · Fashion",
    offer: "50% OFF",
    headlineTop: "Eid Sale",
    headlineEm: "Is Live",
    sub: "New festive collection, premium panjabi & saree, from ৳1,499.",
    cta: "Shop Now →",
    tag: "Fashion & Clothing · Sale Promo",
    kind: "Festive Collection Campaign",
    description: "Scroll-stopping sale creative for a clothing brand's seasonal launch.",
  },
  {
    id: "khanas",
    stage: "ad-food",
    art: 29,
    logo: "Khana's Kitchen",
    offer: "Buy 1 Get 1",
    headlineTop: "Taste The",
    headlineEm: "Weekend",
    sub: "Family platters & biryani combos, free home delivery inside Dhaka.",
    cta: "Order Now →",
    tag: "Food & Restaurant · Offer Creative",
    kind: "Weekend Food Offer Ad",
    description: "Mouth-watering offer creative built to turn viewers into orders.",
  },
  {
    id: "arab-builders",
    stage: "ad-build",
    art: 30,
    logo: "Arab Builders",
    offer: "Now Booking",
    headlineTop: "Build With",
    headlineEm: "Confidence",
    sub: "Quality construction & digital land surveying, projects delivered on time.",
    cta: "Get a Quote →",
    tag: "Construction · Company Ad",
    kind: "Builder Brand Campaign",
    description: "Trust-building company ad for a construction & surveying firm.",
  },
  {
    id: "gadget-zone",
    stage: "ad-tech",
    art: 31,
    logo: "Gadget Zone",
    offer: "Save ৳4,000",
    headlineTop: "Gadget",
    headlineEm: "Mega Sale",
    sub: "Latest smartphones & accessories with official warranty.",
    cta: "Grab The Deal →",
    tag: "Electronics & Gadgets · Price Promo",
    kind: "Smartphone Sale Creative",
    description: "Sharp product promo with a clear price hook for a gadget shop.",
  },
];

export type Industry = {
  icon: number;
  title: string;
  description: string;
  tags: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    icon: 32,
    title: "Clothing & Fashion",
    description:
      "For fashion labels, boutiques and online clothing sellers, we create product creatives that make every garment look premium, seasonal sale campaigns, new-collection launches and a page identity your customers trust.",
    tags: ["Product Social Creatives", "Sale Campaigns", "Catalogue & Lookbook Design", "Brand Identity"],
  },
  {
    icon: 33,
    title: "Food & Restaurants",
    description:
      "For restaurants, cafés, cloud kitchens and food brands, we design mouth-watering menus and offer creatives that turn scrollers into diners, and one-time buyers into regulars who order again.",
    tags: ["Menu Design", "Food Offer Creatives", "Delivery Campaign Ads", "Packaging Design"],
  },
  {
    icon: 34,
    title: "Construction & Real Estate",
    description:
      "For builders, developers and construction service companies, we produce professional project promos and company profiles that build the trust buyers and investors need before they ever visit a site.",
    tags: ["Project Promo Creatives", "Company Profile Design", "Lead-Generation Ads", "Social Media Design"],
  },
  {
    icon: 35,
    title: "Electronics & Gadgets",
    description:
      "For electronics shops, gadget sellers and e-commerce stores, we design sharp product and price-offer creatives that highlight features clearly, and move stock faster with every campaign.",
    tags: ["Product Launch Creatives", "Offer & Price Posts", "E-commerce Banners", "Shop Branding"],
  },
];

export const STATS = [
  { value: 2020, suffix: "", label: "Founded in Dhaka, Bangladesh", plain: true },
  { value: 100, suffix: "+", label: "Happy clients served", plain: false },
  { value: 9, suffix: "+", label: "Core services under one roof", plain: false },
  { value: 4, suffix: "+", label: "Key industries we design & market for", plain: false },
];

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/results", label: "Results" },
  { href: "/contact", label: "Contact" },
];
