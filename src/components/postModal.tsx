import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";
import NewComment from "./newComment";
import { useComments } from "@/app/(private)/perfil/hook/useFetch";
import { useEffect } from "react";
import { motion } from "framer-motion";

interface PostModalProps {
  post: any;
  onClose: () => void;
}

export default function PostModal({ post, onClose }: PostModalProps) {
  const { comments, fetchComments } = useComments();

  useEffect(() => {
    fetchComments(post.id);
  }, [post.id]);

  return (
    <Modal onClose={onClose}>
      <motion.div
        className="rounded-lg shadow-lg max-w-lg w-full "
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-center font-bold text-2xl text-gray-900 mb-3">
          Post de {post.userName}
        </h1>
        <hr className="border-gray-300" />
        <div className="flex items-center space-x-3 mt-3">
          <Link href={`/perfil/${post.userName}`}>
            <Image
              src={post.userImage || "/default-avatar.png"}
              alt={post.userName || "avatar do usuário"}
              width={50}
              height={50}
              className="rounded-full border shadow-sm"
              style={{ objectFit: "cover" }}
            />
          </Link>
          <div>
            <Link
              href={`/perfil/${post.userName}`}
              className="text-blue-600 font-semibold hover:underline"
            >
              {post.userName}
            </Link>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {post.image && (
          <div className="mt-4 w-full h-48 sm:h-64 relative rounded-md shadow-md overflow-hidden">
            <Image
              src={post.image}
              alt="Imagem do Post"
              fill
              className="object-cover"
            />
          </div>
        )}

        <h2 className="text-xl font-bold text-gray-900 mt-4">{post.title}</h2>
        <p className="text-gray-700 mt-2">{post.content}</p>

        <hr className="border-2 border-gray-600 mt-5" />

        <div className="p-4 rounded-md mt-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Comentários
          </h3>
          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment: any) => (
                <div
                  key={comment.id}
                  className=" bg-white rounded-lg shadow-md border border-gray-200 transition-transform hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <Link href={`/perfil/${comment.userName}`}>
                      <Image
                        src={comment.image || "/default-avatar.png"}
                        alt={comment.userName || "avatar do usuário"}
                        width={40}
                        height={40}
                        className="rounded-full border border-gray-300 shadow-sm"
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                    <Link href={`/perfil/${comment.userName}`}>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {comment.nameUser}
                        </p>
                        <p className="text-xs text-gray-500">
                          @{comment.userName}
                        </p>
                      </div>
                    </Link>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {comment.content}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Nenhum comentário ainda.</p>
            )}
            <NewComment
              postId={post.id}
              refreshComments={() => fetchComments(post.id)}
            />
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}
