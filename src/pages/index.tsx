import Head from 'next/head';
import logoImg from '../../public/logo.svg';
import styles from '../styles/home.module.scss';
import Image from 'next/image';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { GetServerSideProps } from 'next';
import { canSSRGuest } from '@/utils/canSSRGuest';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === ``) {
      toast.error(`Favor preencher os campos`);
      return;
    }
    let data = {
      email: email,
      password: password,
    };

    setLoading(true);

    await signIn(data);

    setLoading(false);
  }
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt="logo"
        />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Digite seu email"
              onInput={(e) => setEmail(e.currentTarget.value)}
            />
            <Input
              type="password"
              placeholder="Sua senha"
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
            Não possui uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
