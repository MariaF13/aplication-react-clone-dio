import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'; 
import * as yup from 'yup'; 

import { Container, Title, Column, TitleCreate, SubtitleCreate, EsqueciText, CriarText, Row, Wrapper } from './styles';

const schema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  senha: yup.string().min(3, 'Mínimo de 3 caracteres').required('Senha é obrigatória'),
  confirmarSenha: yup.string().oneOf([yup.ref('senha'), null], 'As senhas devem ser iguais').required('Confirmação de senha é obrigatória'),
});

const Create = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors  } } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            const { data } = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);
            
            if (data.length && data[0].id) {
                navigate('/feed'); 
            } else {
                alert('Usuário ou senha inválido');
            }
        } catch (e) {
            console.error('HOUVE UM ERRO', e);
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Column>
                    <Title>A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.</Title>
                </Column>
                <Column>
                    <Wrapper>
                        <TitleCreate>Faça seu cadastro</TitleCreate>
                        <SubtitleCreate>Faça seu Create e make the change._</SubtitleCreate>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
                            {errors.email && <span>{errors.email.message}</span>}
                            <Input type="password" placeholder="Senha" leftIcon={<MdLock />} name="senha" control={control} />
                            {errors.senha && <span>{errors.senha.message}</span>}
                            <Input type="password" placeholder="Confirmar Senha" leftIcon={<MdLock />} name="confirmarSenha" control={control} />
                            {errors.confirmarSenha && <span>{errors.confirmarSenha.message}</span>}
                            <Button title="Entrar" variant="secondary" type="submit"/>
                        </form>
                        <Row>
                            <EsqueciText>Esqueci minha senha</EsqueciText>
                            <CriarText>Criar Conta</CriarText>
                        </Row>
                    </Wrapper>
                </Column>
            </Container>
        </>
    );
};

export { Create };
