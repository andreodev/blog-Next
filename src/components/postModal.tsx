import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";

interface PostModalProps {
  post: any;
  onClose: () => void;
}

export default function PostModal({ post, onClose }: PostModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
        <h1 className="text-center font-bold text-2xl text-gray-900 mb-3">
          Post de {post.userName}
        </h1>
        <hr className="border-gray-300" />

        <div className="flex items-center space-x-3 mt-3">
          <Link href={`/perfil/${post.userEmail}`}>
            <Image
              src={post.userImage || "/default-avatar.png"}
              alt={post.userName || "avatar do usuário"}
              width={50}
              height={50}
              className="rounded-full border shadow-sm"
            />
          </Link>
          <div>
            <Link
              href={`/perfil/${post.userEmail}`}
              className="text-blue-600 font-semibold hover:underline"
            >
              {post.userName}
            </Link>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mt-4">{post.title}</h2>
        <p className="text-gray-700 mt-2">{post.content}</p>

        {post.image && (
          <div className="mt-4">
            <Image
              src={post.image}
              alt="Imagem do Post"
              width={400}
              height={200}
              className="rounded-md shadow-md object-cover"
            />
          </div>
        )}
        <hr className="border border-gray-600 mt-2.5" />

        <div className="bg-gray-50 p-4 rounded-md shadow-sm mt-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Comentários</h3>
          <div className="space-y-3">
            {post.comments.length > 0 ? (
              post.comments.map((comment: any) => (
                <div
                  key={comment.id}
                  className="p-3 bg-white rounded-md shadow-sm border border-gray-200"
                >
                  <p className="font-semibold text-gray-800">{comment.nameUser}</p>
                  <p className="text-gray-700">{comment.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Nenhum comentário ainda.</p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
