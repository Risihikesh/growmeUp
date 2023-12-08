import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import SecondPageComponent2 from './SecondPageComponent2';


interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'body', headerName: 'Body', width: 400 },
];

const SecondPageComponent1: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [showSecondComponent, setShowSecondComponent] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch JSON data from the API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((posts: Post[]) => {
        setData(posts);
      });

    // Check if user details are present in localStorage
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const hasUserDetails = userDetails.name && userDetails.phoneNumber && userDetails.email;

    if (!hasUserDetails) {
      // If user details are not present, show warning and navigate back to the first page
      alert('Please enter your details before accessing the second page.');
      navigate('/');
    } else {
      setShowSecondComponent(true);
    }
  }, [navigate]);

  return (
    <div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={data} columns={columns} checkboxSelection />
      </div>
      {showSecondComponent && <SecondPageComponent2 />} 
    </div>
  );
};

export default SecondPageComponent1;

