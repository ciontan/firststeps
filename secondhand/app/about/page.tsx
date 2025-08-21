"use client";
import { Heart, Eye, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AboutPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for scroll target in URL params
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo) {
      // Small delay to ensure the page has loaded
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, [searchParams]);

  return (
    <div className=" bg-white">
      <Navbar />
      <div className="flex-1 mt-[10rem] max-h-screen overflow-y-auto px-4 max-w-4xl mx-auto">
        <div>
          {/* About Us Section */}
          <section id="about-us" className="mb-16 scroll-mt-20">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[#FFEFE3] rounded-full flex items-center justify-center">
                      <Heart className="w-8 h-8 text-brown" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-brown mb-4">
                      About Us
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      At 2nd Hand, we understand that parenting comes with
                      countless expenses, and babies outgrow their items
                      incredibly fast. That&#39;s why we created a trusted
                      marketplace where parents can buy and sell quality
                      pre-loved baby essentials at affordable prices.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      We believe that every family deserves access to
                      high-quality baby products without breaking the bank. Our
                      platform connects caring families, creating a community
                      where sustainability meets affordability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Our Vision Section */}
          <section id="our-vision" className="mb-16 scroll-mt-20">
            <div className="bg-gray-50 border border-gray-200 shadow-sm rounded-lg">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[#FFEFE3] rounded-full flex items-center justify-center">
                      <Eye className="w-8 h-8 text-brown" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-brown mb-4">
                      Our Vision
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      We envision a world where every parent has access to
                      quality baby products regardless of their budget. By
                      promoting the reuse of baby items, we&#39;re building a
                      more sustainable future for our children while supporting
                      families in their parenting journey.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Our goal is to become the go-to platform for conscious
                      parents who want to make smart, eco-friendly choices
                      without compromising on quality or safety. Together,
                      we&#39;re creating a circular economy that benefits
                      families and the planet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Values Section */}
          <section id="our-values" className="mb-16 scroll-mt-20">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[#FFEFE3] rounded-full flex items-center justify-center">
                      <Star className="w-8 h-8 text-brown" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-brown mb-6">
                      Our Values
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-brown">
                          Sustainability
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          We&#39;re committed to reducing waste by giving baby
                          items a second life and promoting circular
                          consumption.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-brown">Community</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          Building connections between families and creating a
                          supportive network of conscious parents.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-brown">
                          Affordability
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          Making quality baby products accessible to all
                          families, regardless of their financial situation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-[#FFEFE3] border border-gray-300 rounded-lg">
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-semibold text-brown mb-4">
                  Join Our Community
                </h3>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  Ready to start your sustainable parenting journey? Browse our
                  collection of quality pre-loved baby essentials or list your
                  own items to help other families.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/"
                    className="bg-brown text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors text-center"
                  >
                    Start Shopping
                  </a>
                  <a
                    href="/listings"
                    className="bg-brown text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center"
                  >
                    Sell Your Items
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
