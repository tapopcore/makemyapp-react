// All site content lives here. Sources: makemyapp.qviq.io, the MakeMyApp portfolio PDF, and the old site.
// House rules for copy: no em dashes, no hype words, plain and direct.

export const SITE = {
  name: "MakeMyApp",
  url: "https://makemyapp.co",
  email: "team@makemyapp.co",
  phone: "+91 92424 24232",
  phoneRaw: "919242424232",
  whatsapp: "https://wa.me/919242424232",
  calendly: "https://calendly.com/makemyapp-co/30-minutes-consultation-call",
  instagram: "https://www.instagram.com/makemyapp.co/",
  qviq: "https://makemyapp.qviq.io",
  address: "A-09, ITL Tower, 910-911, 9th Floor, Netaji Subhash Place, Delhi 110034",
  mapsQuery: "ITL Tower, Netaji Subhash Place, Pitampura, Delhi 110034",
  hours: "Monday to Saturday, 9:00 AM to 5:00 PM",
  legal: "Tapop Smart Tech Private Limited",
  gstin: "07AAJCT4201E1ZP",
  formEndpoint: "https://makemyappbackend.onrender.com/connect/connect",
};

export const wa = (text: string) => `${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const AWARDS = [
  { title: "Tech Startup of the Year", event: "Bharat Ke Maharathi Awards", year: "2023" },
  { title: "Emerging Tech Startup of the Year", event: "India Startup Summit", year: "2023" },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Pillar = "Build" | "Brand" | "Grow" | "Content & AI";

export interface Service {
  name: string;
  pillar: Pillar;
  price: number;
  unit?: string; // e.g. "per month"
  note?: string; // what the starting price covers
  blurb: string;
  slug?: string; // has a detail page
}

export const SERVICES: Service[] = [
  // Build
  { name: "Website Development", pillar: "Build", price: 24999, slug: "website-development",
    blurb: "A website that looks modern, loads fast and builds trust. Simple to manage, made to turn visitors into enquiries." },
  { name: "Shopify Development", pillar: "Build", price: 45999, slug: "shopify-development",
    blurb: "Your online store, ready to sell. Fast setup, smooth checkout and a design that makes people buy." },
  { name: "Android App Development", pillar: "Build", price: 100000, slug: "app-development",
    blurb: "Custom Android apps built to give your customers a smooth experience and keep them coming back." },
  { name: "iOS App Development", pillar: "Build", price: 149999, slug: "app-development",
    blurb: "Custom iPhone apps built to Apple's standards, from design to App Store approval." },
  { name: "Internal Software", pillar: "Build", price: 99999, slug: "app-development",
    blurb: "CRMs, ERPs, dashboards and tools that fix your everyday business problems. Reliable and made for how your team works." },
  { name: "UI/UX Design", pillar: "Build", price: 49999,
    blurb: "Interfaces that feel simple and clear. Wireframes, user flows, prototypes and final screens for web and mobile." },

  // Brand
  { name: "Full Stack Branding", pillar: "Brand", price: 24999, slug: "branding",
    blurb: "From logo to full identity. Clear, premium and built to earn trust with the people you sell to." },
  { name: "Packaging Design", pillar: "Brand", price: 5999, note: "1 product, 3 designs",
    blurb: "Packaging that grabs attention on the shelf and on screen, and makes the product look worth the price." },
  { name: "Catalogue, Brochure & Deck Design", pillar: "Brand", price: 14999, note: "10 to 15 pages",
    blurb: "Catalogues and presentations that explain what you sell clearly, ready for clients, partners or investors." },
  { name: "Outdoor Advertising Graphics", pillar: "Brand", price: 3999,
    blurb: "Posters, standees, banners, hoardings and shopfronts. Sharp from a distance, print ready in the exact size." },

  // Grow
  { name: "Performance Marketing", pillar: "Grow", price: 44999, unit: "per month", slug: "performance-marketing",
    blurb: "Meta ads planned, launched and managed for your brand, with reporting you can actually read." },
  { name: "Influencer Marketing", pillar: "Grow", price: 24999,
    blurb: "Real creators, real reach. We match your brand with influencers your customers already follow." },
  { name: "Graphic Ads & Posts", pillar: "Grow", price: 9999, note: "pack of 10",
    blurb: "Custom creatives for Instagram and Meta ads, made to your brand and campaign goal, exported in every size." },
  { name: "Email Automation", pillar: "Grow", price: 7999, slug: "ai-automation",
    blurb: "Email journeys that turn leads into buyers and buyers into repeat customers. Setup, copy and testing included." },

  // Content & AI
  { name: "WhatsApp Automation", pillar: "Content & AI", price: 19999, slug: "ai-automation",
    blurb: "Instant replies, order updates and follow-ups on WhatsApp. Less manual work, more closed enquiries." },
  { name: "AI Agents for Business", pillar: "Content & AI", price: 34999, slug: "ai-automation",
    blurb: "AI that handles support, lead qualification, reminders and FAQs around the clock, trained on your business." },
  { name: "AI Brand Commercial", pillar: "Content & AI", price: 14999, note: "30 second ad",
    blurb: "AI video ads with script, voiceover, visuals and final edit. Big-brand style ads at a small-brand budget." },
  { name: "AI Product Shoots", pillar: "Content & AI", price: 4999, note: "2 products, 10 images",
    blurb: "Professional product images without booking a studio. Ready for your store, marketplaces and ads." },
  { name: "UGC Videos", pillar: "Content & AI", price: 7999,
    blurb: "Videos made by real users. Honest, scroll-stopping and great for ads and social proof." },
  { name: "Video Editing", pillar: "Content & AI", price: 999, note: "per basic video",
    blurb: "Clean cuts, music and transitions for basic edits. Motion graphics, sound design and captions for advanced ones." },
];

export const PILLARS: { name: Pillar; line: string }[] = [
  { name: "Build", line: "Websites, Shopify stores, apps and internal software." },
  { name: "Brand", line: "Identity, packaging and everything printed." },
  { name: "Grow", line: "Ads, influencers and automated email." },
  { name: "Content & AI", line: "AI shoots, AI ads, UGC and AI agents." },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

/* ------------------------------------------------------------------ */
/* Work                                                                */
/* ------------------------------------------------------------------ */

export type WorkType = "Shopify" | "Website" | "App" | "Content";

export interface Work {
  name: string;
  url: string;
  type: WorkType;
  sector?: string;
  img?: string; // file name in /img/work, no extension
  line?: string;
}

export const FEATURED: Work[] = [
  { name: "Athlab", url: "https://athlab.in/", type: "Shopify", sector: "Sports nutrition", img: "athlab",
    line: "Shopify store for India's clean-label supplement brand by Nutrabay." },
  { name: "Meethi Ellaichi", url: "https://www.meethiellaichi.com/", type: "Shopify", sector: "Wedding gifting", img: "meethiellaichi",
    line: "Wedding gifting store with custom packaging and a festive storefront." },
  { name: "DM Associates", url: "https://dmassociates.in/", type: "Website", sector: "Legal & compliance", img: "dma",
    line: "Website for a firm of Company Secretaries in Gurugram." },
  { name: "Gossip Confetti", url: "https://gossipconfetti.com/", type: "Shopify", sector: "Festive fashion", img: "gossipconfetti",
    line: "Colourful festive fashion store that sells the mood, not just the product." },
  { name: "Qviq", url: "https://qviq.io/", type: "Website", sector: "SaaS", img: "qviq",
    line: "Our own product. A website builder paired with NFC smart cards." },
  { name: "Regal Plus", url: "https://regalplus.com/", type: "Shopify", sector: "Sweets & snacks", img: "regalplus",
    line: "Sweets and snacks store with a gift-ready catalogue that ships worldwide." },
  { name: "Little Thing Studio", url: "https://www.littlethingstudio.com/", type: "Shopify", sector: "Upcycled accessories", img: "littlethingstudio",
    line: "Accessories and bags made from production leftovers, with a crafted look to match." },
  { name: "Laad India", url: "https://laadindia.com/", type: "Shopify", sector: "Kidswear", img: "laadindia",
    line: "Kidswear store built for parents shopping on their phones." },
  { name: "Gaffit", url: "https://www.gaffit.in/", type: "Shopify", sector: "Sports nutrition", img: "gaffit" },
  { name: "Heatronics", url: "https://heatronics.in/", type: "Shopify", sector: "Health devices", img: "heatronics" },
  { name: "Kyza India", url: "https://kyzaindia.com/", type: "Shopify", sector: "Jewellery", img: "kyzaindia" },
  { name: "Chapter Skin", url: "https://chapterskin.in/", type: "Shopify", sector: "Lifestyle", img: "chapterskin" },
  { name: "Fleurons", url: "https://fleurons.in/", type: "Shopify", sector: "Cakes & gifting", img: "fleurons" },
  { name: "Inhunger", url: "https://inhunger.com/", type: "Website", sector: "Food delivery", img: "inhunger" },
  { name: "Funkvibes", url: "https://funkvibes.com/", type: "Shopify", sector: "Streetwear", img: "funkvibes" },
  { name: "Akutee", url: "https://akutee.store/", type: "Shopify", sector: "Jewellery", img: "akutee" },
];

export const MORE_WORK: Work[] = [
  // Shopify
  { name: "Afternote Perfumes", url: "https://afternote.in", type: "Shopify", sector: "Luxury fragrance" },
  { name: "Mukhi Singh Cosmetics", url: "https://mukhisingh.in", type: "Shopify", sector: "Cosmetics" },
  { name: "Rizari", url: "https://rizari.in/", type: "Shopify" },
  { name: "Cococart", url: "https://cococart.in/", type: "Shopify" },
  { name: "Drink Wake Up Water", url: "https://drinkwakeupwater.com/", type: "Shopify", sector: "Beverages" },
  { name: "Tomahawk Tools", url: "https://www.tomahawk.tools/", type: "Shopify", sector: "Tools" },
  { name: "The Fizz Company", url: "https://thefizzcompany.in/", type: "Shopify", sector: "Beverages" },
  { name: "Teslahh", url: "https://teslahh.com/", type: "Shopify" },
  // Websites and stores
  { name: "Deciwood", url: "https://deciwood.com/", type: "Website", sector: "Wooden Bluetooth speakers" },
  { name: "Shararat", url: "https://shararat.in/", type: "Website", sector: "Loungewear" },
  { name: "Bearbottom", url: "https://bearbottomclothing.com/", type: "Website" },
  { name: "Sneaker Surge", url: "https://www.sneakersurge.com", type: "Website" },
  { name: "Bijoliyo", url: "https://bijoliyo.com/", type: "Website" },
  { name: "Label Komal Shah", url: "https://www.labelkomalshah.com/", type: "Website" },
  { name: "Godavari Cuts", url: "https://godavaricuts.com/", type: "Website" },
  { name: "Online Hearing", url: "https://onlinehearing.com/", type: "Website" },
  { name: "Market Grey Boutique", url: "https://marketgreyboutique.net/", type: "Website" },
  { name: "Brain Flakes", url: "https://brainflakes.com/", type: "Website" },
  { name: "Divine Copper", url: "https://divinecopper.com/", type: "Website" },
  { name: "Bake My T-Shirt", url: "https://bakemytshirt.com/", type: "Website", sector: "Custom apparel" },
  { name: "Hanfi Handicraft", url: "https://hanfihandicraft.com/", type: "Website", sector: "Handicrafts" },
  { name: "Indian Hawk", url: "https://indianhawk.in", type: "Website", sector: "Clothing" },
  { name: "Vortex Culture", url: "https://vortexculture.com", type: "Website" },
  { name: "Bezza Beauty", url: "https://bezza.in", type: "Website", sector: "Beauty" },
  { name: "Feeo SmokeX", url: "https://feeobeauty.com", type: "Website", sector: "Beauty" },
  { name: "Nothing Before Nails", url: "https://nothingbeforenails.com", type: "Website", sector: "Nail studio" },
  { name: "The Nail Lobby", url: "https://thenaillobby.com", type: "Website", sector: "Nail studio" },
  { name: "Divya Bajaj", url: "https://divyabajaj.com", type: "Website", sector: "Astrology platform" },
  { name: "The Circle of Life", url: "https://circleoflife.co.in", type: "Website" },
  { name: "Gi2", url: "https://gi2.in", type: "Website", sector: "B2B" },
  { name: "Elite Structural Consultants", url: "https://esc.theeliteenterprise.com/", type: "Website", sector: "Engineering" },
  { name: "Elite Structcon Studio", url: "https://ess.theeliteenterprise.com/", type: "Website", sector: "Engineering" },
  { name: "Elite Geotech", url: "https://egn.theeliteenterprise.com/", type: "Website", sector: "Engineering" },
  // Apps
  { name: "Wedhaven", url: "https://play.google.com/store/apps/details?id=com.wedhaven.app", type: "App", sector: "Wedding planning" },
  { name: "Kisanwala", url: "https://play.google.com/store/apps/details?id=com.kisanwala", type: "App", sector: "Agritech" },
  { name: "Pavlok", url: "https://play.google.com/store/apps/details?id=com.pavlok3.core", type: "App", sector: "Habit coaching" },
  { name: "SafeSnap", url: "https://play.google.com/store/apps/details?id=com.ads.app.safesnap", type: "App" },
  { name: "Tripster", url: "https://play.google.com/store/apps/details?id=ru.tripster.tripster", type: "App", sector: "Travel" },
  // Content
  { name: "AI video ads", url: "https://drive.google.com/drive/folders/1uReNd_jQXxzGYQ-SOeCrNhxWAm5iipyY?usp=drive_link", type: "Content", sector: "Showreel" },
  { name: "UGC videos", url: "https://drive.google.com/drive/folders/1m4DhbEN--I8aeH_LOD6pClJ86-MIsJPp?usp=drive_link", type: "Content", sector: "Showreel" },
];

export const ALL_WORK = [...FEATURED, ...MORE_WORK];

/* ------------------------------------------------------------------ */
/* Proof                                                               */
/* ------------------------------------------------------------------ */

export const TESTIMONIALS = [
  { quote: "We wanted a website that felt as unique as our brand, and MakeMyApp absolutely nailed it. They understood what we needed without overcomplicating things. The process was smooth, the team was super easy to work with, and the end result? Just perfect!",
    name: "Ananya Meena", role: "Founder, Deciwood", url: "https://deciwood.com/" },
  { quote: "Honestly, we were tired of dealing with slow developers and confusing tech jargon. MakeMyApp was a refreshing change. They kept things simple, delivered on time, and made sure everything worked flawlessly. Now our website looks professional and runs like a dream.",
    name: "Dikshant Malhotra", role: "Company Secretary & Founder, DMA", url: "https://dmassociates.in/" },
  { quote: "We had a vision for our platform but struggled to bring it to life. The MakeMyApp team not only built exactly what we needed but also guided us with smart suggestions we hadn't even thought of. Our website and mobile app look and work better than ever.",
    name: "Harmeet Singh", role: "Director, Gharbadlo" },
  { quote: "We wanted our platform to feel warm, inviting and easy to use, and MakeMyApp made that happen. They didn't just develop our site and mobile app; they cared about the little details that matter to our users. Super happy with the outcome.",
    name: "Rishika Agarwal", role: "Co-Founder & CEO, Wedhaven", url: "https://play.google.com/store/apps/details?id=com.wedhaven.app" },
  { quote: "Our brand is all about fun and excitement, and MakeMyApp captured that perfectly in our website. They weren't just building a site; they were helping us tell our story in the best way possible. Would 100% recommend working with them.",
    name: "Avinash Sharma", role: "Co-founder, Shararat.in", url: "https://shararat.in/" },
];

export const PRINCIPLES = [
  { title: "We consult, not sell", body: "If you don't need it, we'll say so. You get the right solution for your stage, not the biggest invoice." },
  { title: "Real starting prices", body: "Every service shows what it starts at. Milestone-based payments. No hidden costs, no surprise add-ons." },
  { title: "One team, end to end", body: "Brand, design, build, ads and content under one roof. No juggling five vendors who don't talk to each other." },
  { title: "Founders who've shipped", body: "We've built and scaled our own products, Qviq included. We know what works outside a pitch deck." },
  { title: "In-house team", body: "Designers, developers and marketers who work together every day. Nothing gets lost in a handoff." },
  { title: "We stay after launch", body: "Support, updates and growth help after go-live. We don't build and disappear." },
];

export const PROCESS = [
  { step: "Discovery call", body: "We learn your business, goals and budget, and tell you honestly what will work." },
  { step: "Plan & price", body: "A clear scope, timeline and milestone-based price before any work starts." },
  { step: "Design", body: "Wireframes, then real screens or brand concepts you review and sign off." },
  { step: "Build", body: "Development on modern, proven tech, with check-ins so nothing is a surprise." },
  { step: "Test & launch", body: "Speed, security and every device checked before it goes live." },
  { step: "Support & grow", body: "Post-launch support, updates, and marketing to bring people in." },
];

export const TEAM = [
  { name: "Dhruv Gupta", role: "Co-Founder & CEO", img: "dhruv",
    quote: "We've built and scaled our own products, so we know the challenges firsthand. We focus on solutions that work, not just code.",
    links: { LinkedIn: "https://www.linkedin.com/in/iamdhruvguptaa/", Instagram: "https://www.instagram.com/iamdhruvguptaa/", Qviq: "https://dhruv.qviq.io/" } },
  { name: "Sayaji Shirke", role: "Co-Founder & CTO", img: "sayaji",
    quote: "Tech should help, not complicate. We build smart, scalable solutions that help businesses grow.",
    links: { LinkedIn: "https://www.linkedin.com/in/sayajishirke/", Instagram: "https://www.instagram.com/sayajishirke/", Qviq: "https://sayaji.qviq.io/" } },
  { name: "Ramprasad Yadav", role: "Senior Tech Head", img: "ramprasad",
    quote: "Clean code, sensible architecture and products that keep working long after launch.",
    links: { LinkedIn: "https://www.linkedin.com/in/ramprasad-yadav-786ab5193/", Instagram: "https://www.instagram.com/iamyadavram/", Qviq: "https://ram.qviq.io/" } },
];

export const STACK = ["React", "Next.js", "Node.js", "Express", "Python", "Laravel", "React Native", "Flutter", "Swift", "Android", "MongoDB", "Shopify", "Figma", "AWS", "Google Cloud", "Azure"];

/* ------------------------------------------------------------------ */
/* Service detail pages                                                */
/* ------------------------------------------------------------------ */

export interface ServicePage {
  slug: string;
  short: string;
  title: string;
  h1: string;
  intro: string;
  from: string;
  forWho: string[];
  includes: string[];
  workTypes: WorkType[];
  faqs: { q: string; a: string }[];
  metaDescription: string;
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "shopify-development",
    short: "Shopify stores",
    title: "Shopify Store Development in Delhi",
    h1: "Shopify stores that are ready to sell.",
    intro: "We build Shopify stores for Indian D2C brands across fashion, beauty, nutrition, gifting and home. Fast, mobile-first stores with clean product pages and a checkout that doesn't leak customers.",
    from: inr(45999),
    forWho: ["D2C brands launching their first store", "Brands moving off a slow or outdated theme", "Marketplace sellers who want their own channel", "Stores that get traffic but don't convert"],
    includes: ["Custom theme design matched to your brand", "Product, collection and catalogue setup", "Payments, shipping, COD and GST setup", "Apps for reviews, WhatsApp, upsells and subscriptions", "Speed and mobile optimisation", "SEO basics: titles, URLs, structured data", "Training so your team can run it", "Post-launch support"],
    workTypes: ["Shopify"],
    faqs: [
      { q: "How much does a Shopify store cost?", a: `Our Shopify packages start at ${inr(45999)}. The final price depends on the number of products, custom features and apps. You get a fixed quote after the first call.` },
      { q: "Can you redesign my existing Shopify store?", a: "Yes. We can redesign your theme, clean up apps that slow you down, and improve product pages without losing your orders, customers or SEO." },
      { q: "Do you also run ads for the store?", a: "Yes. We run Meta ads, influencer campaigns and email automation, so the same team that built your store can bring traffic to it." },
    ],
    metaDescription: "Shopify store development for Indian D2C brands. Custom themes, payments, shipping and speed setup. Starting at ₹45,999.",
  },
  {
    slug: "website-development",
    short: "Websites",
    title: "Website Development Company in Delhi",
    h1: "Websites that look sharp and bring in enquiries.",
    intro: "Business websites, brand sites, platforms and web apps. We design and build sites that load fast, rank on Google and make it easy for visitors to get in touch.",
    from: inr(24999),
    forWho: ["Service businesses that need more enquiries", "Professional firms: legal, finance, engineering, healthcare", "Startups launching a product or platform", "Brands whose current site looks dated"],
    includes: ["Design based on your brand", "Mobile-first, fast-loading build", "Content management so you can edit it yourself", "Contact forms, WhatsApp and booking integrations", "On-page SEO and Google Analytics setup", "Hosting and domain setup", "Post-launch support"],
    workTypes: ["Website"],
    faqs: [
      { q: "How much does a website cost?", a: `Business websites start at ${inr(24999)}. Platforms and web apps with logins, dashboards or payments are quoted after we understand the scope.` },
      { q: "Will I be able to update the website myself?", a: "Yes. We set up a simple way to edit text, images and pages, and show your team how to use it." },
      { q: "Do you write the content?", a: "We can. We write clear copy for each page, or polish what you already have." },
    ],
    metaDescription: "Website development in Delhi for businesses, professional firms and startups. Fast, mobile-first sites built to bring enquiries. Starting at ₹24,999.",
  },
  {
    slug: "app-development",
    short: "Apps & software",
    title: "Mobile App & Custom Software Development",
    h1: "Apps and software your customers and team actually use.",
    intro: "Android and iOS apps, SaaS platforms, CRMs, ERPs and internal tools. Built by an in-house team with React Native, Flutter, Node.js and Python.",
    from: inr(100000),
    forWho: ["Startups building an MVP", "Businesses replacing spreadsheets with real software", "Brands that need a customer app", "Teams that need a custom CRM or ERP"],
    includes: ["Product planning and user flows", "UI/UX design and clickable prototypes", "Android and iOS apps", "Web dashboards and admin panels", "APIs, payments and third-party integrations", "Cloud hosting on AWS, Google Cloud or Azure", "Play Store and App Store launch", "Maintenance and new features after launch"],
    workTypes: ["App"],
    faqs: [
      { q: "How much does an app cost?", a: `Android apps start at ${inr(100000)} and iOS apps at ${inr(149999)}. Custom software starts at ${inr(99999)}. The final price depends on features, platforms and integrations. We often suggest a smaller first version to launch faster.` },
      { q: "Android, iOS or both?", a: "Usually both, from one codebase with React Native or Flutter. It costs less and ships faster than two separate apps." },
      { q: "Who owns the code?", a: "You do. Full code and accounts are handed over once the project is paid for." },
    ],
    metaDescription: "Mobile app and custom software development: Android, iOS, SaaS, CRM and ERP. In-house team in Delhi. Android from ₹1,00,000, iOS from ₹1,49,999.",
  },
  {
    slug: "branding",
    short: "Branding",
    title: "Branding & Logo Design Agency in Delhi",
    h1: "A brand people remember and trust.",
    intro: "Logo, identity, packaging, social media look and everything printed. We build brands that look premium and stay consistent everywhere they show up.",
    from: inr(24999),
    forWho: ["New brands before launch", "Businesses that have outgrown their logo", "D2C brands that need packaging", "Companies preparing for investors or big clients"],
    includes: ["Logo design and brand identity", "Colours, type and brand guidelines", "Naming and tagline", "Social media branding", "Stationery and business cards", "Packaging design", "Catalogues, brochures and decks", "Outdoor and print graphics"],
    workTypes: ["Shopify", "Website"],
    faqs: [
      { q: "How much does branding cost?", a: `Full stack branding starts at ${inr(24999)}. Packaging starts at ${inr(5999)} for one product with three designs.` },
      { q: "How many logo options do we get?", a: "We present a few clear directions, then refine the one you pick until it's right." },
      { q: "Can you also build the website and store?", a: "Yes, and that's where it pays off. The same team carries the brand into your site, store, ads and packaging." },
    ],
    metaDescription: "Branding and logo design in Delhi: identity, packaging, guidelines, catalogues and print. Starting at ₹24,999.",
  },
  {
    slug: "performance-marketing",
    short: "Performance marketing",
    title: "Performance Marketing & Meta Ads Agency",
    h1: "Ads that are measured in sales, not likes.",
    intro: "Meta ads, influencer campaigns, ad creatives and email automation. We plan, run and report on campaigns for D2C brands and local businesses.",
    from: `${inr(44999)} / month`,
    forWho: ["D2C brands ready to scale beyond organic", "Local businesses that need bookings and walk-ins", "Brands with a store but not enough traffic", "Founders tired of agencies that only send screenshots"],
    includes: ["Meta ads strategy, setup and management", "Pixel, Conversions API and tracking setup", "Ad creatives: graphics, AI ads and UGC", "Audience testing and budget planning", "Influencer marketing", "Email automation for repeat sales", "Monthly reporting in plain language"],
    workTypes: ["Shopify", "Content"],
    faqs: [
      { q: "What does performance marketing cost?", a: `Ads management starts at ${inr(44999)} per month, plus your ad spend, which goes directly to Meta.` },
      { q: "Do you make the ad creatives too?", a: `Yes. Graphic ad packs start at ${inr(9999)}, AI video ads at ${inr(14999)} and UGC videos at ${inr(7999)}.` },
      { q: "How soon will I see results?", a: "Expect the first few weeks to be testing. We tell you what's working and what's not at every step, and we won't promise numbers we can't back." },
    ],
    metaDescription: "Performance marketing and Meta ads for D2C brands and local businesses. Creatives, influencers and email automation. From ₹44,999 per month.",
  },
  {
    slug: "ai-automation",
    short: "AI & automation",
    title: "AI Agents, WhatsApp & Email Automation",
    h1: "Let AI handle the repetitive work.",
    intro: "AI agents that answer customers 24x7, WhatsApp flows that reply and follow up instantly, and email journeys that bring buyers back. Custom-built and trained on your business.",
    from: inr(7999),
    forWho: ["Businesses missing enquiries after hours", "Teams answering the same questions all day", "Stores that want more repeat orders", "Anyone still following up leads by hand"],
    includes: ["AI agents for support, FAQs and lead qualification", "WhatsApp auto-replies, order updates and reminders", "Lead capture into your CRM or sheet", "Email welcome, cart recovery and win-back journeys", "Integration with Shopify, your website and CRM", "Training data setup and testing", "Ongoing tuning after launch"],
    workTypes: ["Shopify", "Website"],
    faqs: [
      { q: "What does automation cost?", a: `Email automation starts at ${inr(7999)}, WhatsApp automation at ${inr(19999)} and custom AI agents at ${inr(34999)}.` },
      { q: "Will the AI say wrong things to customers?", a: "We train it on your own information, set clear limits, and hand over to a human when it isn't sure. We test it before it talks to a single customer." },
      { q: "Do I need a WhatsApp Business API account?", a: "For full automation, yes. We set it up for you as part of the project." },
    ],
    metaDescription: "AI agents, WhatsApp automation and email automation for Indian businesses. Reply instantly, follow up automatically. Starting at ₹7,999.",
  },
];

/* ------------------------------------------------------------------ */
/* FAQ + page meta                                                     */
/* ------------------------------------------------------------------ */

export const FAQS = [
  { q: "What does MakeMyApp do?", a: "We're a full-stack agency in Delhi. We build websites, Shopify stores, apps and software, design brands and packaging, run performance marketing, and create AI content and automation." },
  { q: "How much does a project cost?", a: `Every service has a real starting price on our services page, from ${inr(999)} for a basic video edit to ${inr(149999)} for iOS apps. You get a fixed, milestone-based quote after a free call.` },
  { q: "Do you work with clients outside Delhi?", a: "Yes. Most of our work happens over calls and WhatsApp, with clients across India and abroad." },
  { q: "Do you offer support after launch?", a: "Yes. We provide maintenance, updates, bug fixes and growth support after your project goes live." },
  { q: "How do we start?", a: "Book a free 30 minute call or message us on WhatsApp. We'll understand what you need and tell you honestly what will work." },
];

export interface PageMeta { title: string; description: string; }

export const META: Record<string, PageMeta> = {
  "/": { title: "MakeMyApp | Websites, Shopify, Apps, Branding & Ads Agency in Delhi",
    description: "Full-stack agency in Delhi. We build websites, Shopify stores and apps, design brands, run Meta ads and set up AI automation. 300+ projects delivered. Real starting prices." },
  "/services": { title: "Services & Starting Prices | MakeMyApp",
    description: "20 services with real starting prices: websites from ₹24,999, Shopify from ₹45,999, branding from ₹24,999, Android apps from ₹1,00,000, iOS apps from ₹1,49,999, AI automation, ads and content." },
  "/work": { title: "Our Work: Websites, Shopify Stores & Apps | MakeMyApp",
    description: "Selected work from 300+ projects: websites, Shopify stores and apps built by MakeMyApp for Athlab, DM Associates, Gossip Confetti, Wedhaven, Deciwood and more." },
  "/about": { title: "About MakeMyApp | Founders, Team & Awards",
    description: "Meet the team behind MakeMyApp, the Delhi agency that also built Qviq. Tech Startup of the Year 2023, Bharat Ke Maharathi Awards." },
  "/contact": { title: "Contact MakeMyApp | Book a Free Call",
    description: "Book a free 30 minute call, WhatsApp +91 92424 24232 or email team@makemyapp.co. Office at ITL Tower, Netaji Subhash Place, Delhi." },
  "/news": { title: "AI News Today: Latest AI Updates for Business | MakeMyApp",
    description: "The AI updates that matter for business, kept short and simple. Daily AI news from the MakeMyApp AI Desk." },
  "/privacy-policy": { title: "Privacy Policy | MakeMyApp", description: "How MakeMyApp collects, uses and protects your information." },
  "/404": { title: "Page not found | MakeMyApp", description: "This page doesn't exist." },
};
for (const p of SERVICE_PAGES) META[`/services/${p.slug}`] = { title: `${p.title} | MakeMyApp`, description: p.metaDescription };

export const ROUTES = Object.keys(META);
