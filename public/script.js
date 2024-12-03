// script.js
document.getElementById('commentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value.trim();

    if (commentText) {
        const commentsList = document.getElementById('commentsList');

        // 새로운 댓글 요소 생성
        const commentItem = document.createElement('li');
        commentItem.textContent = commentText;

        // 댓글 리스트에 추가
        commentsList.appendChild(commentItem);

        // 입력 필드 초기화
        commentInput.value = '';
    }
});