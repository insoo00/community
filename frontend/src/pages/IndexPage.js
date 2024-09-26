import Post from "../components/Post"

export default function IndexPage() {
    return (
      <div>
        <form className="search-form" method="get">
          <input type="text" placeholder="검색어를 입력하세요."
          className="search-input"/>
        </form>
        <Post/>
        <Post/>
        <Post/>
      </div>
    );
}