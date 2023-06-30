import React, { useEffect, useState } from 'react';
import Navbar from '../components/UI/Navbar';
import ItemList from '@/components/ItemList';
import { useDispatch } from 'react-redux';

function Home() {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'SET_DATA', payload: data });
        setData(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (!data) {
    // Render loading state or fallback UI while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar website_name={data.store_name} />
      <div>
        <h1>Lista de artículos</h1>
        <p>{data.store_info}</p>
        <ItemList items={data.items} />
      </div>
    </div>
  );
}

export default Home;
