import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-primary">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-accent text-sm tracking-[0.3em] uppercase font-body mb-4">News &amp; Updates</p>
          <h1 className="heading-section text-primary-foreground mb-6">The Nixon Signature Estates Blog</h1>
          <div className="gold-divider mb-8 mx-auto" />
          <p className="text-body-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Community updates, milestones, and behind-the-scenes moments from Nixon Signature Estates.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group grid md:grid-cols-2 gap-6 md:gap-8 items-center rounded-xl border border-border overflow-hidden hover:border-accent/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="overflow-hidden aspect-video md:aspect-auto md:h-full">
                  <img
                    src={post.coverImage.src}
                    alt={post.coverImage.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:p-2 md:pr-8">
                  <p className="text-accent text-xs tracking-[0.2em] uppercase font-body mb-3">{post.displayDate}</p>
                  <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3">{post.title}</h2>
                  <p className="text-muted-foreground font-body leading-relaxed mb-4">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-primary font-heading text-sm tracking-wide uppercase group-hover:gap-2.5 transition-all">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
