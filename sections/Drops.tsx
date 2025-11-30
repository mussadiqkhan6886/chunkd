import LimitedCard from '@/components/mainComp/LimitedCard'

const Drops = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/drops`, {next: {revalidate: 60}})

   if (!res.ok) {
    throw new Error("Failed to fetch drops");
  }
  
  const json = await res.json()


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
