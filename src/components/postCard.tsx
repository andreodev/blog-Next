import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

interface PostCardProps {
  post: any;
  onOpenModal: (post: any) => void;
}

export default function PostCard({ post, onOpenModal }: PostCardProps) {
  return (
    <div className="border rounded-lg shadow-md  hover:shadow-lg transition-shadow">
      <div className="flex flex-col text-start">
        <div className="flex items-center space-x-2 p-2">
          <Link href={`/perfil/${post.userName}`}>
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
          <div className="relative w-full h-52 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt="Imagem do post"
            fill
            className="object-cover"
          />
        </div>
        )}
        <p className="font-medium text-gray-700 text-lg p-1">{post.title}</p>
        <p className="font-medium text-gray-700 text-lg p-3">{post.content}</p>
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
