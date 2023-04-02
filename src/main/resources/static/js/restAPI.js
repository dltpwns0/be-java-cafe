const makeReplyContent = function (replyInformation) {
    const replyId = replyInformation["replyId"];
    const writer = replyInformation["writer"];
    const content = replyInformation["content"];
    const createAt = replyInformation["createAt"];
    return `${makeReplyContentHeader(writer, createAt)}\n${makeReplyContentBody(content)}\n${makeReplyContentFooter(replyId)}`
}

const addDeleteListenerToReplyContents = function () {
    const deleteForms = document.querySelectorAll(".delete-answer-form");
    deleteForms.forEach(deleteForm => {
        deleteForm.addEventListener("submit", evt => {
            evt.preventDefault()
            const replyId = deleteForm.getAttribute("name");
            deleteFetch(replyId)
                .then(() => requestReply("GET"));
        })
    })
}

const requestReply = function (method) {
    const articleId = document.getElementById("main").getAttribute("name");
    const fetch = method === "GET" ? getFetch(articleId) : postFetch(articleId);
    fetch.then(response => response.json())
        .then((replies) => {
            renderReply(replies);
            const replyForm = document.getElementById("question");
            replyForm.querySelector("textarea").value = "";
        })
        .then(() => addDeleteListenerToReplyContents())
}

const makeReplyDiv = function (reply) {
    const replyContent = makeReplyContent(reply);
    const divReply = document.createElement('div');
    divReply.innerHTML = replyContent;
    divReply.setAttribute('class', 'qna-comment-div');
    return divReply;

}
const renderReply = function (replies) {
    const replySize = replies.length;
    document.querySelector("#qna-comment-article").innerHTML = "";
    for (let i = 0; i < replySize; i++) {
        let divReply = makeReplyDiv(replies[i]);
        document.querySelector("#qna-comment-article").insertAdjacentElement('beforeend', divReply);
    }
}

const getFetch = function (articleId) {
    return fetch(`/reply/${articleId}`)
}

const postFetch = function (articleId) {
    const form = document.getElementById("question");
    const formData = new FormData(form);
    formData.append("articleId", articleId);
    return fetch(`/reply`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })
}

const deleteFetch = function (replyId) {
    return fetch(`/reply/${replyId}`, {
        method: "DELETE"
    });
}

