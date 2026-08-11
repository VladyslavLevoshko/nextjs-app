import { Metadata } from "next";
import { HeroLayout, Container } from "./SharedComponents/PageLayouts";
import {
  PopularCategoriesSection,
  WatchPostsButton,
  CreateAccountButton,
  FeaturesSection,
  HomeHero,
  RightBlock,
  LeftSection,
  LeftSectionButtons,
  PageGrid,
} from "./HomePageComponents";

export const metadata:Metadata = {
  title: "Main Page"
};

export default function HomePage() {
  return (
    <HeroLayout >
      <Container>

        <PageGrid>

          <LeftSection>
            <HomeHero/>
            <LeftSectionButtons>
              <WatchPostsButton />
              <CreateAccountButton />
            </LeftSectionButtons>
            <FeaturesSection/>
          </LeftSection>

          <RightBlock>
            <PopularCategoriesSection/>
          </RightBlock>
        </PageGrid>

      </Container>
    </HeroLayout>
  );
}