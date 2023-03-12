import { useState, FormEvent, useContext } from 'react';
import Head from 'next/head';
import logoImg from '../../../public/logo.svg';
import styles from '../../styles/home.module.scss';
import Image from 'next/image';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';
import { toast } from 'react-toastify';

export default function Signup() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (name === '' || email === '' || password === '') {
      toast.error('Preencha todos os campos');
      return;
    }
    setLoading(true);

    let data = {
      name,
      email,
      password,
    };

    await signUp(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt="logo"
        />
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onInput={(e) => setName(e.currentTarget.value)}
            />
            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onInput={(e) => setEmail(e.currentTarget.value)}
            />
            <Input
              placeholder="Sua senha"
              type="password"
              value={password}
              onInput={(e) => setPassword(e.currentTarget.value)}
            />
            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>
          </form>

          <Link
            href="/signup"
            className={styles.text}
          >
            Já possui uma conta? Faça login!
          </Link>
        </div>
      </div>
    </>
  );
}
