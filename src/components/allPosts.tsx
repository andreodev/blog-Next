"use client";

import {
  usePosts,
  useUsers,
  useComments,
} from "@/app/(private)/perfil/hook/useFetch";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NewPost from "@/components/newPost";
import { Button } from "./ui/button";
import Modal from "./Modal";

export default function AllPosts() {
  const { posts, error, fetchPosts } = usePosts();
  const { users } = useUsers();
  const { comments } = useComments();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [postsWithUserInfo, setPostsWithUserInfo] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<{
    id: string;
    title: string;
    content: string;
    image?: string;
    comments: {
      id: string;
      content: string;
      userEmail: string;
      createdAt: string;
    }[];
  } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (posts?.length && users?.length) {
      const postsWithUser = posts.map((postItem) => {
        const user = users.find(
          (userItem) => userItem.email === postItem.userEmail
        );
        return {
          ...postItem,
          userName: user?.name || "Desconhecido",
          userImage:
            user?.image ||
            "https://i.pinimg.com/736x/8a/9f/ac/8a9fac6159e698818b553eac700e4a57.jpg",
        };
      });

      const sortedPosts = postsWithUser.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const postsWithComments = sortedPosts.map((postItem) => {
        const postComments = comments.filter(
          (comment) => comment.postId === postItem.id
        );
        return {
          ...postItem,
          comments: postComments,
        };
      });

      setPostsWithUserInfo(postsWithComments);
      setIsLoading(false);
    }
  }, [posts, users, status, router, comments]);

  if (error) {
    return <p className="text-red-500 text-center">Ocorreu um erro ao carregar os posts.</p>;
  }

  if (isLoading) {
    return <p className="text-center text-gray-500">Carregando posts...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg space-y-6 bg-gray-50 shadow-md" id="Post">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <NewPost refreshPosts={fetchPosts} />
      </div>

      {postsWithUserInfo.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum post disponível.</p>
      ) : (
        postsWithUserInfo.map((postItem) => (
          <div
            key={postItem.id}
            className="border rounded-lg shadow-md bg-white p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => {
              setSelectedPost(postItem);
              setShowModal(true);
            }}
          >
            <div className="flex flex-col items-center text-center">
              <Link href={`/perfil/${postItem.userEmail}`}>
                <Image
                  src={postItem.userImage || "/default-avatar.png"}
                  alt={postItem.userName || "avatar do usuario"}
                  width={50}
                  height={50}
                  className="rounded-full border"
                />
              </Link>
              <div>
                <Link
                  href={`/perfil/${postItem.userEmail}`}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  {postItem.userName}
                </Link>
                <p className="text-sm text-gray-500">
                  {new Date(postItem.createdAt).toLocaleDateString()}
                </p>
                <p className="font-medium text-gray-700 mt-1">{postItem.title}</p>
                {postItem.image && (
                  <Image
                    src={postItem.image}
                    alt="Imagem do post"
                    width={400}
                    height={200}
                    className="rounded-md mt-2"
                  />
                )}
              </div>
            </div>
          </div>
        ))
      )}
      
      {showModal && selectedPost && (
        <Modal onClose={() => setShowModal(false)} cal>
          <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto h-auto">
          <Link href={`/perfil/${selectedPost.userEmail}`}>
                <Image
                  src={selectedPost.userImage || "/default-avatar.png"}
                  alt={selectedPost.userName || "avatar do usuario"}
                  width={50}
                  height={50}
                  className="rounded-full border"
                />
              </Link>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {selectedPost.title}
            </h2>
            <p className="text-gray-700 mb-4">{selectedPost.content}</p>
            {selectedPost.image && (
              <Image
                src={selectedPost.image}
                alt="Post Image"
                width={400}
                height={200}
                className="shadow-md w-full object-cover mt-4 rounded-lg"
              />
            )}
            <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Comentários</h3>
              <div className="space-y-2">
                {selectedPost.comments.length > 0 ? (
                  selectedPost.comments.map((comment: any) => (
                    <div key={comment.id} className="p-2 border-b text-gray-700">
                      <p>{comment.nameUser}</p>
                      <p className="text-sm text-black font-semibold">{comment.content}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Nenhum comentário ainda.</p>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}