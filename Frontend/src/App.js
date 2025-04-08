import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import Import from "./components/Import.js";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [tipoCadastro, setTipoCadastro] = useState(0);
  
  const getUsers = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API + "Users");
      setUsers(res.data.result);
    } catch (error) {
      toast.error(error);
    }
  };
  

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <Title>Cadastro de usuários</Title>
        {tipoCadastro == 0 &&
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} setTipoCadastro={setTipoCadastro}  />
        }
        {tipoCadastro == 1 &&
          <Import getUsers={getUsers} setTipoCadastro={setTipoCadastro} />
        }
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers}  />
        <ToastContainer position="top-center" />
      </Container>
      <GlobalStyle />
    </>
  );
}

export default App;