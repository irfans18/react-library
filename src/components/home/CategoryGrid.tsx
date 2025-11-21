import { Link } from 'react-router-dom'

interface CategoryItem {
  id: string
  name: string
  icon: string
  color: string
}

const categories: CategoryItem[] = [
  { id: '1', name: 'Fiction', icon: '⚡', color: 'bg-yellow-100 text-yellow-700' },
  { id: '2', name: 'Non-Fiction', icon: '📚', color: 'bg-blue-100 text-blue-700' },
  { id: '3', name: 'Self-Improvement', icon: '🌱', color: 'bg-green-100 text-green-700' },
  { id: '4', name: 'Finance', icon: '💰', color: 'bg-emerald-100 text-emerald-700' },
  { id: '5', name: 'Science', icon: '🔬', color: 'bg-purple-100 text-purple-700' },
  { id: '6', name: 'Education', icon: '📖', color: 'bg-indigo-100 text-indigo-700' },
]

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/browse?categoryId=${category.id}`}
          className="group flex flex-col items-center gap-2 rounded-2xl p-4 transition-all hover:scale-105"
        >
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-2xl ${category.color} group-hover:shadow-lg transition-shadow`}>
            {category.icon}
          </div>
          <span className="text-sm font-medium text-slate-700 text-center">{category.name}</span>
        </Link>
      ))}
    </div>
  )
}
