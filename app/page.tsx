import { Metadata } from "next";
import PopularCategoriesSection from "./HomePageComponents/PopularCategoriesSection";
import WatchPostsButton from "./HomePageComponents/WatchPostsButton";
import CreateAccountButton from "./HomePageComponents/CreateAccountButton";
import FeaturesSection from "./HomePageComponents/FeaturesSection";
import HomeHero from "./HomePageComponents/HomeHero";
import { HeroLayout, Container } from "./SharedComponents/PageLayouts";

export const metadata:Metadata = {
  title: "Main Page"
};

export default function HomePage() {
  return (
    <HeroLayout className="flex items-center justify-center py-20">
      <Container>
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
      </Container>
    </HeroLayout>
  );
}