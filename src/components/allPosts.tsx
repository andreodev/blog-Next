"use client";

import {
  usePosts,
  useUsers,
  useComments,
} from "@/app/(private)/perfil/hook/useFetch";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NewPost from "@/components/newPost";
import PostCard from "@/components/postCard";
import PostModal from "@/components/postModal";

export default function AllPosts() {
  const { posts, error, fetchPosts } = usePosts();
  const { users } = useUsers();
  const { comments } = useComments();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [postsWithUserInfo, setPostsWithUserInfo] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (posts?.length && users?.length) {
      const postsWithUser = posts.map((postItem) => {
        const user = users.find((userItem) => userItem.userName === postItem.userName);
        return {
          ...postItem,
          userName: user?.name || "Desconhecido",
          userImage: user?.image || "/default-avatar.png",
        };
      });

      const sortedPosts = postsWithUser.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const postsWithComments = sortedPosts.map((postItem) => ({
        ...postItem,
        comments: comments.filter((comment) => comment.postId === postItem.id),
      }));

      setPostsWithUserInfo(postsWithComments);
      setIsLoading(false);
    }
  }, [posts, users, status, router, comments]);

  const handleOpenModal = (post: any) => {
    setSelectedPost(post);
    setShowModal(true);
  };
  

  if (error) return <p className="text-red-500 text-center">Ocorreu um erro ao carregar os posts.</p>;
  if (isLoading) return <p className="text-center text-gray-500">Carregando posts...</p>;

  return (
    <div className="max-w-lg mx-auto rounded-lg space-y-6" id="Post">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <NewPost refreshPosts={fetchPosts} />
      </div>

      {postsWithUserInfo.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum post disponível.</p>
      ) : (
        postsWithUserInfo.map((post) => (
          <PostCard key={post.id} post={post} onOpenModal={handleOpenModal} />

        ))
      )}

      {showModal && selectedPost && <PostModal post={selectedPost} onClose={() => setShowModal(false)} />}
    </div>
  );
}
