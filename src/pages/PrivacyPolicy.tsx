import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-nixon-dark">
      <div className="px-6 py-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors text-sm font-body"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-heading text-4xl text-primary-foreground mb-2">Privacy Policy</h1>
        <p className="text-primary-foreground/50 font-body text-sm mb-10">
          Last updated: March 30, 2026
        </p>

        <div className="space-y-8 text-primary-foreground/80 font-body text-sm leading-relaxed">
          <section>
            <h2 className="font-heading text-xl text-primary-foreground mb-3">1. Introduction</h2>
            <p>
              Nixon Home Care, Inc. ("Nixon Senior Living," "we," "us," or "our") is committed to protecting
              the privacy of visitors to our website. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-primary-foreground mb-3">2. Information We Collect</h2>
            <p className="mb-3">We may collect information about you in a variety of ways, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-primary-foreground">Personal Data:</strong> Name, email address, phone number,
                and other contact information you voluntarily provide through our contact forms or when inquiring
                about our services.
              </li>
              <li>
                <strong className="text-primary-foreground">Usage Data:</strong> Information about how you access and
                use our website, including your IP address, browser type, pages visited, and time spent on pages.
              </li>
              <li>
                <strong className="text-primary-foreground">Cookies & Tracking:</strong> We use cookies and similar
                technologies to enhance your browsing experience. See Section 6 for details.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl text-primary-foreground mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to your inquiries and provide information about our community</li>
              <li>To schedule tours and process applications</li>
              <li>To improve our website and services</li>
              <li>To send relevant communications (with your consent)</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl text-primary-foreground mb-3">4. Sharing Your Information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share
              information with trusted service providers who assist us in operating our website and
              conducting our business, provided they agree to keep your information confidential.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-primary-foreground mb-3">5. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information.
              However, no method of transmission over the Internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-primary-foreground mb-3">6. Cookies Policy</h2>
            <p className="mb-3">
              Our website uses cookies to enhance your experience. Cookies are small text files stored
              on your device that help us understand how you use our site.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-primary-foreground">Essential Cookies:</strong> Required for basic
                website functionality such as navigation and session management.
              </li>
              <li>
                <strong className="text-primary-foreground">Analytics Cookies:</strong> Help us understand
                how visitors interact with our website so we can improve it.
              </li>
              <li>
                <strong className="text-primary-foreground">Preference Cookies:</strong> Remember your
                settings and choices for a better experience.
              </li>
            </ul>
            <p className="mt-3">
              You can manage your cookie preferences through our cookie consent banner or your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-primary-foreground mb-3">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent for cookie usage</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl text-primary-foreground mb-3">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="mt-3 bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-4">
              <p className="text-primary-foreground font-heading">Nixon Home Care, Inc.</p>
              <p>Phone: (713) 419-2653</p>
              <p>Houston, TX Area</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
