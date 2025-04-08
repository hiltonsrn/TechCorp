import axios from "axios";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { toast,ToastContainer } from "react-toastify";
import Papa from "papaparse";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 410px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;
const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  margin:auto;
`;
const InfoArea = styled.p`
  font-size:10px
`;

const Import = ({getUsers,setTipoCadastro}) => {  
  const ref = useRef();
  const [users,setUsers] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const arq = ref.current;
    if (
          !arq.file.value
        ) {
          return toast.error("Selecione um arquivo");
    }
    const url = process.env.REACT_APP_API + "Import";
    await axios.post(url,users).then(({ data }) => {
    if(data.success){
      data.success.map((e)=>{
        toast.success(e);
      });
    }
    if(data.erro){
      data.erro.map((e)=>{
        toast.error(e);
      });
    }      
    });
    getUsers();
  };
  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: false,
      skipEmptyLines: true,
      complete: function (results) {
        setUsers(results.data)
      },
    });
  };
  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Arquivo</Label>
        <Input type="file" name="file" onChange={changeHandler}/>
      </InputArea>
      <InputArea>            
      </InputArea>
      <InputArea>
      <InfoArea>Separe os dados por ;</InfoArea>
      </InputArea>
      <InputArea>
      <InfoArea>Coloque cada registro em um linha</InfoArea>
      </InputArea>
      <InputArea>
      <InfoArea>Não coloque cabeçalho (titulos das colunas) no arquivo</InfoArea>
      </InputArea>
      <InputArea>
      <InfoArea>Os dados precisam estar na seguinte ordem: Nome, E-mail e Idade</InfoArea>
      </InputArea>
      <ButtonArea>
        <Button type="submit">Importar</Button>&nbsp;
        <Button type="button" onClick={(e) =>{ setTipoCadastro(0)}}>Cancelar</Button>
      </ButtonArea>
    </FormContainer>
  );
};

export default Import;