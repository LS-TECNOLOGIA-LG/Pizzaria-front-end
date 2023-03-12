import { useState, FormEvent } from 'react';
import { Header } from '@/components/Header';
import Head from 'next/head';
import styles from './styles.module.scss';

import { setupAPIClient } from '@/services/api';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';

import { canSSRAuth } from '@/utils/canSSRAuth';

export default function Category() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name === '') {
      toast.error('Preencha todos os campos.');
      return;
    }

    setLoading(true);

    const apiClient = setupAPIClient();

    await apiClient.post('/category', {
      name: name,
    });

    setLoading(false);

    toast.success('Categoria cadastrada com sucesso.');

    setName('');
  }

  return (
    <>
      <Head>
        <title>Nova Categoria - Sujeito Pizzaria</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar Categorias</h1>

          <form
            className={styles.form}
            onSubmit={handleRegister}
          >
            <input
              type="text"
              placeholder="Digite sua categoria"
              className={styles.input}
              value={name}
              onInput={(e) => setName(e.currentTarget.value)}
            />

            <button
              type="submit"
              className={styles.buttonAdd}
              disabled={loading}
            >
              {loading ? <FaSpinner size={16} /> : 'Cadastrar'}
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
