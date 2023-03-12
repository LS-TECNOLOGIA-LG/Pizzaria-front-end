import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

// funcção para paginas que só pode ser acessadas por visitantes

export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
  // ctx context ou contexto
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    //verificar se o usuario que está acessando a página já esta logado e contem um cookie de acesso válido,
    //redireciona ele para a pagina de dashboard

    if (cookies['@nextauth.token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}
