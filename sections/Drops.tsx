import LimitedCard from '@/components/mainComp/LimitedCard'
import { connectDB } from '@/lib/config/databse';
import CookieSchema from '@/lib/models/CookieSchema';

export const revalidate = 60;

const Drops = async () => {

  await connectDB()

  const res = await CookieSchema.find({category: "limited"}).lean()
  const json = JSON.parse(JSON.stringify(res))
  
  return (
    <section className='width'>
      <h2 className='sectionTitle'>Limited Flavours</h2>
      <p className='px-5 md:px-20 text-center mb-7'>Don’t miss Chunk’d Cookies’ exclusive limited drops! These small-batch, stuffed cookies are baked fresh with premium ingredients and available for a short time only. Once they’re gone, they’re gone, perfect for gifting, indulging, or treating yourself.</p>
      <div className='flex flex-col items-center'>
        <LimitedCard data={json.slice(0,4)} button={true} />
      </div>
    </section>
  )
}

export default Drops
