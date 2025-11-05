import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");

  return {
    props: {}, 
  };
};

