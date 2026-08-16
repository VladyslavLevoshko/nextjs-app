import LoginForm from "../UsersComponents/LoginForm";
import { Container, HeroLayout, HeadingFontStyle } from "@/app/SharedComponents";
import { PageGrid } from "@/app/HomePageComponents";

export const metadata = {
  title: "Вход",
};

export default function LoginPage() {
  return (
    <HeroLayout>
      <Container>
        <PageGrid>
          <section className="hidden lg:block">
            <div className="bg-gradient-to-tr from-indigo-50 to-white border border-gray-100 rounded-2xl p-8 shadow-sm">
              <HeadingFontStyle> С возвращением </HeadingFontStyle>
              <p className="text-gray-600">Войдите, чтобы продолжить покупать посты и управлять контентом.</p>

              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li>• Быстрый вход</li>
                <li>• Безопасные пароли</li>
                <li>• Доступ к купленным материалам</li>
              </ul>
            </div>
          </section>

          <aside className="flex justify-center">
            <LoginForm />
          </aside>
        </PageGrid>
      </Container>
    </HeroLayout>
  );
}