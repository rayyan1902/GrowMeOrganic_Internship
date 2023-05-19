import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DepartmentList from './DepartmentList';
import './SecondPage.css';

interface Post {
  id: number;
  title: string;
  body: string;
}

const SecondPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const name = localStorage.getItem('name');
    const phoneNumber = localStorage.getItem('phoneNumber');
    const email = localStorage.getItem('email');

    if (!name || !phoneNumber || !email) {
      navigate('/first-page');
    }

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, [navigate]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'body', headerName: 'Body', width: 400 },
  ];

  return (
    <div style={{ height: 500, width: '100%', marginLeft: "200px", textAlign: "center" }}>
      <h2>Welcome to the Second Page!</h2>
      <DataGrid<Post>
        rows={posts}
        columns={columns}
        autoPageSize
      />


      <DepartmentList  />
      <DepartmentList />
      <DepartmentList />
    </div>
  );
};

export default SecondPage;
