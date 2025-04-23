import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import Tours from './Tours';

const url = 'https://www.course-api.com/react-tours-project';

const App = () => {
  const [tours,setTours]=useState([]);
  const [isLoading,setIsLoading]=useState(true);

  const removeTour = (id) =>{
    const newTour = tours.filter((tour)=>tour.id !== id)
    setTours(newTour);
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const resp = await fetch(url)
      const data = await resp.json()
      setTours(data)
    } catch (error) {}
    setIsLoading(false)
  }

  useEffect(()=>{
    fetchData();
  },[])


  if(isLoading){
    return (
      <main>
        <Loading />
      </main>
    )
  }

  if(tours.length === 0){
    return <main>
      <div className="title">
        <h2>no tours left</h2>
        <button type='button' style={{marginTop: '2rem'}} className='btn' onClick={()=>fetchData()}>
          refresh
        </button>
      </div>
    </main>
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}/>
    </main>
  )
}

export default App