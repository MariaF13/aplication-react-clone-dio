import React from 'react';
import logo from '../../assets/logo-dio.png';
import { Button } from '../Button';
import { Container, Wrapper, BuscarInputContainer, Input, Row, Menu, MenuRight, UserPicture} from './styles';
import { Link } from 'react-router-dom'; // Importe o componente Link

const Header = ({ autenticado }) => {
  return (
    <Wrapper>
      <Container>
          <Row>
            <img src={logo} alt="Logo da dio"/>
            {autenticado ? (
              <>
               <BuscarInputContainer>
                <Input placeholder='Buscar...'/>
               </BuscarInputContainer>
                <Menu>Live Code</Menu>
                <Menu>Global</Menu>
              </>
            ) : null}
          </Row>
          <Row>
              {autenticado ? (
                <UserPicture src="https://avatars.githubusercontent.com/u/45184516?v=4"/>
              ) : (
              <>
                <MenuRight href="/">Home</MenuRight>
                {}
                <Link to="/login"><Button title="Entrar" /></Link> 
                <Link to="/create"><Button title="Cadastrar" /></Link>
              </>)}
          </Row>
      </Container>
    </Wrapper>
  );
};

export { Header };
