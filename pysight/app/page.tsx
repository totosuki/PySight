function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-[3vh] h-[80vh]">
        <h1 className="font-heading text-[clamp(5rem,10vw,10rem)] font-bold tracking-[-0.02em]">PySight</h1>
        <p>A Personal Python Site by <span className="font-bold">totosuki</span></p>
        <div className="flex flex-row items-center gap-[1.2rem]">
          <a
            href="/articles/"
            className="text-(--btn) px-[2rem] py-[1rem] border border-(--btn) rounded-[20px]"
          >
            Articles
          </a>
          <a
            href="/about/"
            className="text-(--btn) px-[2rem] py-[1rem] border border-(--btn) rounded-[20px]"
          >
            About
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center font-heading italic text-[0.9rem] mb-[20px]">
        <p className="text-(--quote-content)">"Simple is better than complex."</p>
        <p className="text-(--quote-author)">― The Zen of Python</p>
      </div>
    </div>
  );
}

export default Home;
