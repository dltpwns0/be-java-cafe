const makeReplyContentHeader = function (writer, createAt) {
    const header =
        `<div class="article-header">
            <div class="article-header-thumb">
                <img src="https://graph.facebook.com/v2.3/1324855987/picture" class="article-author-thumb" alt="">
            </div>
            <div class="article-header-text">
                <a href="/user/profile/${writer}" class="article-author-name" >${writer}</a>
                <a href="#answer-1434" class="article-header-time" title="퍼머링크">${createAt}</a>
            </div>
        </div>`
    return header;
}

const makeReplyContentBody = function (content) {
    const body = `
        <div class="article-doc comment-doc">
            <p >${content}</p>
        </div>
        `
    return body;
}

const makeReplyContentFooter = function (replyId) {
    const footer =
        `<div class="article-util">
                    <ul class="article-util-list">
                        <li>
                            <a class="link-modify-article"
                               href="/questions/413/answers/1405/form">수정</a>
                        </li>
                        <li>
                            <form name="${replyId}" class="delete-answer-form" method="POST">
                                <input type="hidden" name="_method" value="DELETE">
                                <button type="submit" class="delete-answer-button">삭제</button>
                            </form>
                        </li>
                    </ul>
        </div>`
    return footer;
}
