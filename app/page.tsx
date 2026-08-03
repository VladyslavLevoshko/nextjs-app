import { Metadata } from "next";
import PopularCategoriesSection from "./HomePageComponents/PopularCategoriesSection";
import WatchPostsButton from "./HomePageComponents/WatchPostsButton";
import CreateAccountButton from "./HomePageComponents/CreateAccountButton";
import FeaturesSection from "./HomePageComponents/FeaturesSection";
import HomeHero from "./HomePageComponents/HomeHero";

export const metadata:Metadata = {
  title: "Main Page"
};

export default function HomePage() {
  return (
    <div className="min-h-screen -mt-16 flex items-center justify-center py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <section className="space-y-6">
            <HomeHero/>
            <div className="mt-6 flex w-full max-w-lg flex-col gap-4 sm:flex-row">
              <WatchPostsButton />
              <CreateAccountButton />
            </div>
              <FeaturesSection/>
          </section>

          <aside className="hidden lg:flex items-center justify-center">
            <PopularCategoriesSection/>
          </aside>
        </div>
      </div>
    </div>
  );
}