const Page = () => {
  return (
    <div className="w-full">
      <div className="container flex w-full flex-1 flex-col gap-x-8 py-12 lg:flex-row">
        <main className="flex flex-1 flex-col"></main>
        <aside className="flex w-full lg:w-72"></aside>
      </div>
    </div>
  );
};

export default Page;
