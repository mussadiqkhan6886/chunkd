import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/databse";
import CookieSchema from "@/lib/models/CookieSchema";
import { CookieType, DropType } from "@/type";

type SitemapUrl = {
  loc: string;           // Full URL string
  changefreq: string;    // e.g., "daily", "weekly", "monthly"
  priority: number;      // e.g., 1.0, 0.9
};

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Fetch drops (limited)
    const dropsRes = await CookieSchema.find({ category: "limited" }).lean();
    const drops: DropType[] = JSON.parse(JSON.stringify(dropsRes));

    // Fetch menu items (classic)
    const menuRes = await CookieSchema.find({category: "classic"}).lean();
    const menuItems: CookieType[] = JSON.parse(JSON.stringify(menuRes));

    const bundleRes = await CookieSchema.find({category: "bundle"}).lean();
    const bundleItems: CookieType[] = JSON.parse(JSON.stringify(bundleRes));

    // Static pages
    const staticPages = [
      '/',
      '/about',
      '/contact',
      '/build-box',
      '/add-testimonial',
      '/policies',
      '/thank-you'
    ];

    // Generate sitemap URLs as typed objects
    const urls: SitemapUrl[] = [];

    // Add static pages
    staticPages.forEach(page => {
      urls.push({
        loc: `https://www.chunkdpk.com${page}`,
        changefreq: "weekly",
        priority: 0.7,
      });
    });

    // Add menu items
    menuItems.forEach(item => {
      urls.push({
        loc: `https://www.chunkdpk.com/menu/${item.slug}`,
        changefreq: "weekly",
        priority: 0.9,
      });
    });

    bundleItems.forEach(item => {
      urls.push({
        loc: `https://www.chunkdpk.com/bundles/${item.slug}`,
        changefreq: "weekly",
        priority: 0.9,
      });
    });

    // Add drops
    drops.forEach(item => {
      urls.push({
        loc: `https://www.chunkdpk.com/drops/${item.slug}`,
        changefreq: "weekly",
        priority: 0.8,
      });
    });

    // Generate final XML from typed objects
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `
  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (err) {
    console.error("Error generating sitemap:", err);
    return new NextResponse("Sitemap generation failed", { status: 500 });
  }
}
