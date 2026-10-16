import { notFound } from "next/navigation";
import { getPost, VcardBlogDetail } from "@/components/blog-detail";
import { posts } from "@/lib/profile";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post ? `${post.title} | VCard` : "VCard" };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return <VcardBlogDetail post={post} />;
}
