import CategoryLinks from "./CategoryLinks";

export default function PopularCategoriesSection(){
    return (
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Популярные категории</h3>
            <CategoryLinks/>
            <div className="mt-6 text-sm text-gray-600">
                <p>Начните с просмотра популярных постов или создайте аккаунт, чтобы покупать и сохранять понравившиеся материалы.</p>
            </div>
        </div>
    )
}