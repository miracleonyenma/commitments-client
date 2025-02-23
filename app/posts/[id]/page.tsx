const PostPage = async ({ params }: { params: { id: string } }) => {
  return (
    <main>
      <h1>Post Page {params.id}</h1>
    </main>
  );
};

export default PostPage;
