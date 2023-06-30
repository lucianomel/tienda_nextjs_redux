import React from 'react';
import Navbar from '../components/UI/Navbar';
import ItemList from '@/components/ItemList';
import { useSelector } from 'react-redux';

const Home = () => {
  // Retrieve the data from the Redux store
  const data = useSelector((state) =>{ 
    return state.data
  });
  return (
    <div>
      <Navbar website_name={data.store_name} />
      <div>
        <br/>
        <h1>Lista de artículos</h1>
        <p>{data.store_info}</p>
        <ItemList items={data.items} />
      </div>
    </div>
  );
};

export default Home;
