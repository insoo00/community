export default function Post() {
    return (
      <div className="post">
        <div className="image">
          <img src="https://via.placeholder.com/480x320"/>
        </div>
        <div className="texts">
          <h2>블로그 게시물의 제목입니다.</h2>
          <p className="info">
            <a className="author">나동빈</a>
            <time>2024-04-28 07:25</time>
          </p>
          <p className="summary">오늘은 장을 보러 가서 닭볶음탕의 재료를 사왔습니다.
            그리고 직접 만든 고추장을 이용해 닭볶음탕을 맛있게 끓여 먹었습니다.
            자꾸만 생각나는 맛이에요. 그리고 내일 점심에는 김치전을 해먹기 위해서
            신김치도 사왔는데요. 벌써부터 기대가 됩니다.
            매일같이 요리해서 먹는 재미가 있어요.
            제 요리 실력이 나날이 늘어가고 있습니다.</p>
        </div>
      </div>
    );
}
