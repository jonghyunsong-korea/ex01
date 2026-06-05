document.addEventListener('DOMContentLoaded', () => {
    const boardForm = document.getElementById('boardForm');
    const boardList = document.getElementById('boardList');

    // 초기 데이터 로드
    loadPosts();

    // 폼 제출 이벤트
    if (boardForm) {
        boardForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const authorInput = document.getElementById('author');
            const contentInput = document.getElementById('content');

            const author = authorInput.value.trim();
            const content = contentInput.value.trim();

            if (author && content) {
                const newPost = {
                    id: Date.now(),
                    author: author,
                    content: content,
                    date: new Date().toLocaleString()
                };

                savePost(newPost);
                
                // 입력폼 초기화
                authorInput.value = '';
                contentInput.value = '';

                // 목록 갱신
                loadPosts();
            }
        });
    }

    // 게시글 저장
    function savePost(post) {
        let posts = getPosts();
        posts.unshift(post); // 최신 글이 위로 오도록
        localStorage.setItem('cat_board_posts', JSON.stringify(posts));
    }

    // 게시글 불러오기
    function getPosts() {
        const posts = localStorage.getItem('cat_board_posts');
        if (posts) {
            return JSON.parse(posts);
        }
        return [
            {
                id: 1,
                author: '민트냥이',
                content: '환영합니다! 이곳에 고양이에 대한 이야기를 남겨주세요. 🐾',
                date: new Date().toLocaleString()
            }
        ];
    }

    // 화면에 게시글 렌더링
    function loadPosts() {
        if (!boardList) return;
        
        const posts = getPosts();
        boardList.innerHTML = ''; // 초기화

        posts.forEach(post => {
            const item = document.createElement('div');
            item.className = 'board-item';
            
            item.innerHTML = `
                <div class="board-header">
                    <span class="board-author">${post.author}</span>
                    <span class="board-date">${post.date}</span>
                </div>
                <div class="board-content">
                    ${post.content.replace(/\n/g, '<br>')}
                </div>
            `;
            
            boardList.appendChild(item);
        });
    }
});