// DOM 요소 선택
const commentsList = document.getElementById("commentsList");
const commentForm = document.getElementById("commentForm");

// 댓글 목록 불러오기
async function loadComments() {
    try {
        // Netlify Function에서 댓글 가져오기
        const response = await fetch('/.netlify/functions/get-comments');
        const comments = await response.json();

        // 기존 댓글 초기화
        commentsList.innerHTML = '';

        // 서버에서 가져온 댓글을 DOM에 추가
        comments.forEach(comment => {
            const commentItem = document.createElement("li");
            commentItem.textContent = comment;
            commentsList.appendChild(commentItem);
        });
    } catch (error) {
        console.error("Failed to load comments:", error);
        alert("댓글을 불러오는 데 문제가 발생했습니다.");
    }
}

// 댓글 작성 처리
commentForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // 폼 기본 동작 방지

    const commentInput = document.getElementById("commentInput");
    const commentText = commentInput.value.trim();

    if (!commentText) {
        alert("댓글을 입력해주세요!");
        return;
    }

    try {
        // Netlify Function으로 댓글 보내기
        await fetch('/.netlify/functions/save-comment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment: commentText }),
        });

        // 입력 필드 초기화
        commentInput.value = '';

        // 댓글 목록 새로 고침
        loadComments();
    } catch (error) {
        console.error("Failed to save comment:", error);
        alert("댓글을 저장하는 데 문제가 발생했습니다.");
    }
});

// 페이지가 로드될 때 댓글 불러오기
window.addEventListener("DOMContentLoaded", loadComments);