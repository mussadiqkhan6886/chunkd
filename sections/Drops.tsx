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
      <div className='flex flex-col items-center'>
        <LimitedCard data={json.data.slice(0,4)} button={true} />
      </div>
    </section>
  )
}

export default Drops
