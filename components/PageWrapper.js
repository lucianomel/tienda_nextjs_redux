import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const PageWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then((response) => response.json())
      .then((data) => {
        data = JSON.parse(data)
        dispatch({ type: 'SET_DATA', payload: data });
        setData(data);
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
    <>
      {children}
    </>
  );
};

export default PageWrapper;
