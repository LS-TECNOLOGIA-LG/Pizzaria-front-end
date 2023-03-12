import { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { FiUpload } from 'react-icons/fi';
import { setupAPIClient } from '@/services/api';
import { toast } from 'react-toastify';

type ItemProps = {
  id: string;
  name: string;
};

interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState(null);
  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    // console.log(event.currentTarget.files);

    if (!event.currentTarget.files) {
      return;
    }

    const image = event.currentTarget.files[0];

    if (!image) {
      return;
    }

    if (
      image.type === 'image/jpeg' ||
      image.type === 'image/jpg' ||
      image.type === 'image/webp' ||
      image.type === 'image/png'
    ) {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(event.currentTarget.files[0]));
    }
  }

  function handleChangeCategory(event: ChangeEvent<HTMLSelectElement>) {
    // console.log(categories[event.currentTarget.value]);
    setCategorySelected(Number(event.currentTarget.value));
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    try {
      const data = new FormData();

      if (name === '' || price === '' || description === '' || imageAvatar === null) {
        toast.error('Preencha todos os campos!');
        return;
      }

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('category_id', categories[categorySelected].id);
      data.append('file', imageAvatar);

      const apiClient = setupAPIClient();

      await apiClient.post('/product', data);

      toast.success('Cadastrado com sucesso!');
    } catch (error) {
      toast.error('Houve um erro ao cadastrar!');
    }

    setName('');
    setPrice('');
    setDescription('');
    setImageAvatar(null);
    setAvatarUrl('');
  }

  return (
    <>
      <Head>
        <title>Novo Produto - Sujeito Programador</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form
            className={styles.form}
            onSubmit={handleRegister}
          >
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload
                  size={25}
                  color="#fff"
                />
              </span>
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/webp"
                onChange={handleFile}
              />

              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select
              value={categorySelected}
              onChange={handleChangeCategory}
            >
              {categories.map((item, index) => {
                return (
                  <option
                    value={index}
                    key={item.id}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              placeholder="Digite o nome do produto"
              className={styles.input}
              value={name}
              onInput={(e) => setName(e.currentTarget.value)}
            />
            <input
              type="text"
              placeholder="Preco do produto"
              className={styles.input}
              value={price}
              onInput={(e) => setPrice(e.currentTarget.value)}
            />

            <textarea
              placeholder="Descreva seu produto..."
              className={styles.input}
              value={description}
              onInput={(e) => setDescription(e.currentTarget.value)}
            />

            <button
              className={styles.buttonAdd}
              type="submit"
            >
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get(`/category`);

  console.log(response.data);

  return {
    props: {
      categoryList: response.data,
    },
  };
});
