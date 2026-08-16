import { HeadingFontStyle } from "@/app/SharedComponents"

export function UserPageTitle () {
    return (
        <header className="mb-8 flex items-center justify-between">
          <div>
            <HeadingFontStyle> Пользователи </HeadingFontStyle>
            <p className="text-gray-600 mt-1">Список зарегистрированных пользователей.</p>
          </div>
        </header>
    )
}