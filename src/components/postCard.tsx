import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface PostCardProps {
  post: any;
  onOpenModal: (post: any) => void;
}

export default function PostCard({ post, onOpenModal }: PostCardProps) {
  return (
    <div className="border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow">
      <div className="flex flex-col text-start">
        <div className="flex items-center space-x-2 p-2">
          <Link href={`/perfil/${post.userEmail}`}>
            <Image
              src={post.userImage || "/default-avatar.png"}
              alt={post.userName || "avatar do usuario"}
              width={50}
              height={50}
              className="rounded-full border"
              style={{ width: "auto", height: "auto" }} // Mantém a proporção
            />
          </Link>
          <div className="flex flex-col p-2">
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
        <p className="font-medium text-gray-700 text-lg p-1">{post.title}</p>
        {post.image && (
          <div className="flex justify-center my-1">
            <Image
              src={post.image}
              alt="Imagem do post"
              width={600}
              height={200}
            />
          </div>
        )}
        <div className="p-2 flex justify-center">
          <Button
            onClick={() => onOpenModal(post)}
            className="cursor-pointer p-2"
          >
            Comentários
          </Button>
        </div>
      </div>
    </div>
  );
}
