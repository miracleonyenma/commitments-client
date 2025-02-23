const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <main>
      <h1>Post Page {id}</h1>
    </main>
  );
};

export default PostPage;
