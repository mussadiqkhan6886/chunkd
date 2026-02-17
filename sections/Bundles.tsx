import ImageSlider from '@/components/mainComp/ImageSlider'
import { connectDB } from '@/lib/config/databse'
import CookieSchema from '@/lib/models/CookieSchema'
import { CookieType } from '@/type'
import Link from 'next/link'

const Bundles = async () => {
  await connectDB()
  const res = await CookieSchema.find({ category: 'bundle' }).sort({ createdAt: -1 }).limit(3).lean()
  const cookies = JSON.parse(JSON.stringify(res))

  return (
    <section className='width py-10'>
      <h2 className='sectionTitle mb-8'>Bundles</h2>
      
      {cookies.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto gap-4">
        {cookies.map((cookie: CookieType) => (
          <div key={cookie._id} className={`flex flex-col justify-between border border-soft relative ${cookie.soldOut || !cookie.active ? 'opacity-60' : ''}`}>
            
            {/* Image Section */}
            <div className="h-[420px] relative">
              <ImageSlider images={cookie.images} />
              
              {/* Badges */}
              {cookie.soldOut || !cookie.active ? (
                <div className="absolute z-30 top-5 left-5 bg-black text-white px-3 py-1 rounded-full text-sm">SOLD OUT</div>
              ) : cookie.hotSeller && (
                <div className="bg-white/50 text-sm font-semibold px-2 py-1 absolute top-5 left-5">🔥 Best Seller</div>
              )}
            </div>

            {/* Content Section */}
            {(cookie.soldOut || !cookie.active) ? <div className='p-3'>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">{cookie.title}</h2>
                <h2 className="font-semibold text-lg">Rs.{cookie.price}</h2>
              </div>

              <p className="text-gray-600 text-sm mb-4 mt-2">
                {cookie.soldOut || !cookie.active 
                  ? "Will Be Back Soon" 
                  : cookie.description?.slice(0, 60) + "..."}
              </p>
            </div> : <Link href={`/bundles/${cookie.slug}`} className="p-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">{cookie.title}</h2>
                <h2 className="font-semibold text-lg">Rs.{cookie.price}</h2>
              </div>

              <p className="text-gray-600 text-sm mb-4 mt-2">
                {cookie.soldOut || !cookie.active 
                  ? "Will Be Back Soon" 
                  : cookie.description?.slice(0, 60) + "..."}
              </p>
            </Link>}
          </div>
        ))}
      </div>) : (
         <div className="text-center text-gray-600 font-semibold text-lg">
          <hr />
          <p className='py-2 uppercase'> No Bundles Yet</p>
          <hr />
        </div>
      )}
    </section>
  )
}

export default Bundles