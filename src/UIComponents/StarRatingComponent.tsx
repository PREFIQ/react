import StarRating from '@/Components/Rating/StartRating.tsx'

function StarRatingComponent() {
  return (
    <div>
        <StarRating maxStars={5} disabled={false} />
    </div>
  )
}

export default StarRatingComponent