import axios from "axios";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { toast,ToastContainer } from "react-toastify";
import Papa from "papaparse";
import FormContainer from "../styles/formContainer";
import InputArea from "../styles/inputArea";
import ButtonArea from "../styles/buttonArea";
import Input from "../styles/input";
import Label from "../styles/label";
import Button from "../styles/button";
import InfoArea from "../styles/infoArea";
import Loading from "./Loading";

const Import = ({getUsers,setTipoCadastro}) => {  
  const ref = useRef();
  const [isLoading,setIsLoading] = useState(false);
  const [users,setUsers] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
    setIsLoading(false);
  };
  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      {isLoading && <Loading/>}
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