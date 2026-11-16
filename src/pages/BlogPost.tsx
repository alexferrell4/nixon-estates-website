import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Expand, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSectionLink } from "@/hooks/use-section-link";
import { getBlogPost, type BlogImage, type BlogPost as BlogPostData } from "@/data/blogPosts";

/** Sets per-post title, meta description, and JSON-LD; restores the defaults on leave. */
function usePostSeo(post: BlogPostData | undefined) {
  useEffect(() => {
    if (!post) return;
    const title = post.seo?.title ?? `${post.title} | Nixon Signature Estates`;
    const description = post.seo?.description ?? post.excerpt;

    const prevTitle = document.title;
    document.title = title;

    const metaRestores = (
      [
        ["name", "description", description],
        ["property", "og:title", title],
        ["property", "og:description", description],
        ["name", "twitter:title", title],
        ["name", "twitter:description", description],
      ] as const
    ).map(([attr, key, value]) => {
      const el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) return () => {};
      const prev = el.content;
      el.content = value;
      return () => {
        el.content = prev;
      };
    });

    let script: HTMLScriptElement | undefined;
    if (post.schema) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(post.schema);
      document.head.appendChild(script);
    }

    return () => {
      document.title = prevTitle;
      metaRestores.forEach((restore) => restore());
      script?.remove();
    };
  }, [post]);
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;
  const [lightbox, setLightbox] = useState<BlogImage | null>(null);
  const goToSection = useSectionLink();
  usePostSeo(post);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article>
        {/* Cover */}
        <section className="relative h-[50vh] min-h-[360px] pt-16">
          <img
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: post.coverImage.position }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nixon-dark/90 via-nixon-dark/30 to-nixon-dark/40" />
          <div className="relative h-full flex flex-col justify-end max-w-4xl mx-auto px-6 pb-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-primary-foreground/70 hover:text-accent text-sm font-body mb-4 w-fit transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            <p className="text-accent text-sm tracking-[0.2em] uppercase font-body mb-3">{post.displayDate}</p>
            <h1 className="font-heading text-3xl md:text-5xl text-primary-foreground leading-tight">{post.title}</h1>
          </div>
        </section>

        {/* Body */}
        <section className="section-padding bg-background">
          <div className="max-w-3xl mx-auto space-y-8">
            {post.content.map((block, i) => {
              if (block.type === "p") {
                return (
                  <p key={i} className="text-body-lg text-muted-foreground leading-relaxed">
                    {block.text}
                  </p>
                );
              }
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="font-heading text-2xl text-foreground pt-2">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "figure") {
                return (
                  <button
                    key={i}
                    onClick={() => setLightbox(block.image)}
                    className="block mx-auto max-w-md w-full overflow-hidden rounded-xl shadow-lg"
                  >
                    <img src={block.image.src} alt={block.image.alt} className="w-full h-auto" loading="lazy" />
                  </button>
                );
              }
              if (block.type === "links") {
                return (
                  <div key={i} className="border-t border-border pt-8">
                    <h2 className="font-heading text-xl text-foreground mb-4">{block.heading}</h2>
                    <ul className="space-y-3">
                      {block.links.map((link) => (
                        <li key={link.href} className="font-body">
                          {link.href.startsWith("/") ? (
                            <Link to={link.href} className="inline-flex items-center gap-1.5 text-primary hover:text-accent transition-colors">
                              {link.label}
                              <ArrowRight className="h-4 w-4 shrink-0" />
                            </Link>
                          ) : (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-primary hover:text-accent transition-colors"
                            >
                              {link.label}
                              <ExternalLink className="h-4 w-4 shrink-0" />
                            </a>
                          )}
                          {link.source && <span className="block text-sm text-muted-foreground mt-0.5">{link.source}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              // gallery
              return (
                <div
                  key={i}
                  className={`grid gap-4 ${
                    block.images.length === 1
                      ? "grid-cols-1"
                      : block.images.length === 2 || block.images.length === 4
                        ? "grid-cols-2"
                        : "grid-cols-2 md:grid-cols-3"
                  }`}
                >
                  {block.images.map((img) => (
                    <button
                      key={img.src}
                      onClick={() => setLightbox(img)}
                      className="group relative overflow-hidden rounded-xl aspect-[4/3] block"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        style={{ objectPosition: img.position }}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-nixon-dark/0 group-hover:bg-nixon-dark/30 transition-colors flex items-center justify-center">
                        <Expand className="h-5 w-5 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-primary">
          <div className="max-w-3xl mx-auto text-center px-6">
            <h2 className="heading-section text-primary-foreground mb-6">Come See It For Yourself</h2>
            <p className="text-body-lg text-primary-foreground/70 mb-10">
              Nixon Signature Estates is now leasing. Schedule a tour, explore the model suite, or start your
              application today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/#contact"
                onClick={goToSection("contact")}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-nixon-dark font-heading text-sm tracking-wider uppercase px-8 py-4 rounded-lg transition-colors"
              >
                Apply For Leasing Today
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/demo-rooms"
                className="inline-flex items-center gap-2 bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-heading text-sm tracking-wider uppercase px-8 py-4 rounded-lg transition-colors"
              >
                View the Model Suite
              </Link>
            </div>
          </div>
        </section>
      </article>

      <Footer />

      {/* Lightbox */}
      <Dialog open={!!lightbox} onOpenChange={(open) => !open && setLightbox(null)}>
        <DialogContent className="max-w-5xl w-[95vw] p-2 bg-nixon-dark border-none">
          <DialogTitle className="sr-only">{lightbox?.alt}</DialogTitle>
          {lightbox && (
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg mx-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogPost;
