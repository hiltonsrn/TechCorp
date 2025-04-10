import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast,ToastContainer } from "react-toastify";
import FormContainer from "../styles/formContainer";
import InputArea from "../styles/inputArea";
import ButtonArea from "../styles/buttonArea";
import Input from "../styles/input";
import Label from "../styles/label";
import Button from "../styles/button";
import Loading from "./Loading";

const Form = ({ getUsers, onEdit, setOnEdit,setTipoCadastro }) => {
  const ref = useRef();
  const [isLoading,setIsLoading] = useState(false);
  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.name.value = onEdit.name;
      user.email.value = onEdit.email;
      user.age.value = onEdit.age;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = process.env.REACT_APP_API + "Save";
    const user = ref.current;

    if (
      !user.name.value ||
      !user.email.value ||
      !user.age.value 
    ) {
      return toast.error("Preencha todos os campos!");
    }
    let u = {};
    if (onEdit) {
      u = {
        id:  onEdit.id,
        name: user.name.value,
        email: user.email.value,
        age: parseInt(user.age.value)
      };
    } else {
      u =  {
        name: user.name.value,
        email: user.email.value,
        age: parseInt(user.age.value),
      };      
    }
    await axios
        .post(url,u)
        .then(({ data }) => {
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
          else{
            user.name.value = "";
            user.email.value = "";
            user.age.value = "";            
            getUsers();
          }
        });
    setOnEdit(null);
    setIsLoading(false);
  };
  
  return (    
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      {isLoading && <Loading/>}
      <InputArea>
        <Label>Nome</Label>
        <Input name="name" style={{width:"300px"}} />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" style={{width:"300px"}} />
      </InputArea>
      <InputArea>
        <Label>Idade</Label>
        <Input type="number" name="age" style={{width:"50px"}} />
      </InputArea>
      <ButtonArea>
        <Button type="submit">Salvar</Button>&nbsp;
        <Button type="button" onClick={(e) =>{ setTipoCadastro(1)}}>Importar do .CSV</Button>
      </ButtonArea>
    </FormContainer>
  );
};

export default Form;