import { HeroSection } from '@/components/home/HeroSection'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { BookRecommendations } from '@/components/home/BookRecommendations'
import { PopularAuthors } from '@/components/home/PopularAuthors'

export default function BookListPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Categories */}
      <CategoryGrid />
      
      {/* Book Recommendations */}
      <BookRecommendations title="Recommendation" by="rating" />
      
      {/* Popular Authors */}
      <PopularAuthors />
    </div>
  )
}

