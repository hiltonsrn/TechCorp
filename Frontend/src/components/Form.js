import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast,ToastContainer } from "react-toastify";

const FormContainer = styled.form`
  width:500px;
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

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  margin:auto;
`;

const Input = styled.input`
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
  width:100px
`;

const Form = ({ getUsers, onEdit, setOnEdit,setTipoCadastro }) => {
  const ref = useRef();

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
      await axios
        .post(url, u)
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      u =  {
        name: user.name.value,
        email: user.email.value,
        age: parseInt(user.age.value),
      };
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
            setOnEdit(null);
            getUsers();
          }
        });
    }    
  };
  
  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
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