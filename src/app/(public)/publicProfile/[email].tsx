// pages/user/[id].tsx
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { prisma } from '@/lib/prisma'; // Supondo que você tenha o Prisma configurado
import { useRouter } from 'next/router';

type UserProfileProps = {
  user: {
    id: string;
    email: string;
    name: string;
    image: string | null;
    bio: string | null;
    location: string | null;
  } | null;
};

const UserProfile = ({ user }: UserProfileProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found!</div>;
  }

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <img src={user.image || '/default-avatar.png'} alt={user.name} width={100} height={100} />
      <p>Email: {user.email}</p>
      <p>Location: {user.location || 'Not provided'}</p>
      <p>Bio: {user.bio || 'No bio available'}</p>
    </div>
  );
};

// Função para buscar o usuário no servidor
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.params!;

  // Aqui, o `id` seria o identificador do usuário, que você pode usar para buscar no banco de dados.
  const user = await prisma.user.findUnique({
    where: { email: String(id)  }, // Busca o usuário pelo id
  });

  return {
    props: {
      user,
    },
  };
};

export default UserProfile;
