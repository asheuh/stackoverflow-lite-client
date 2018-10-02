class Templates {
    profilePageLink(item) {
        let node = document.getElementById("profile");
        node.innerHTML = item.data.username;
    }

    myquestionsBody(item) {
        return `
        <ul class="qa">
            <p class="asheuh">Asked by me on ${item.date_created}</p>
            <li class="d">
                <a href="/questions/details/?${item.id}">${item.title}</a>
            </li>
            <div class="d-container">
                <ul class="stats">
                    <div class="new-container">
                        <h2>Question summary</h2>
                        <p>${item.description}</p>
                        <div class="grid-3">
                            <div class="summary">
                                <h4>Total answers</h4>
                                <h5><a href="#">${item.answers}</a></h5>
                            </div>
                            <div class="summary">
                                <a style="background-color: #D6EAF8; color: black;"
                                class="btn btn-primary" href="/questions/details/?${item.id}">
                                view answers</a>
                            </div>
                            <div class="summary">
                                <a href="#" data-id="${item.id}"
                                class="del-btn del">
                                <i class="fa fa-trash"></i></a>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </ul>
        `;
    }

    mostansweredBody(item) {
        return `
        <ul class="qa">
            <p class="asheuh">Asked by me on ${item.date_created}</p>
            <li class="d">
                <a href="/questions/details/?${item.id}">${item.title}</a>
            </li>
            <div class="d-container">
                <ul class="stats">
                    <div class="new-container">
                        <h2>Question summary</h2>
                        <p>${item.description}</p>
                        <div class="grid-3">
                            <div class="summary">
                                <h4>Total answers</h4>
                                <h5><a href="#">${item.answers}</a></h5>
                            </div>
                            <div class="summary">
                                <a style="background-color: #D6EAF8; color: black;"
                                class="btn btn-primary" href="/questions/details/?${item.id}">
                                view answers</a>
                            </div>
                            <div class="summary">
                                <a href="#" data-id="${item.id}" class="del-btn del">
                                <i class="fa fa-trash"></i></a></a>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </ul>
        `;
    }

    profileData(data) {
        return `
        <div class="span-col-5">
            <h1 style="margin-top: 1em">${data.data.name}(${data.data.username})</h1>
            <p>Email: <i>${data.data.email}</i></p>
            <p>Username: <i>${data.data.username}</i></p>
            <p>Name: <i> ${data.data.name}</i></p>
            <p>Registered on: <i>${data.data.date_created}</i></p>
            <div class="social-icons">
                <a href="#"><i style="color:blue;" class="me fab fa-facebook-square"></i></a>
                <a href="#"><i style="color:#ffc838" class="me fab fa-instagram"></i></a>
                <a href="#"><i style="color:#3498DB;" class="me fab fa-twitter-square"></i></a>
                <a href="#"><i style="color:#21618C;" class="me fab fa-linkedin-in"></i></a>
                <a href="#"><i style="color:red;" class="me fab fa-google-plus-square"></i></a>
                <a href="#"><i style="color:black;" class="me fab fa-github-square"></i></a>
            </div>
        </div>
        `;
    }

    upvoteDownvoteButton(item) {
        return `
        <div class="panel pale-green">
            <p class="asheuh">Answered by ${item.owner} on ${item.date_created}</p>
            <p>${item.answer}</p>
            <div class="updown">
                <button data-id="${item.id}" style="background-color: #D6EAF8;
                color: black;" class="btn btn-success upvotebtn">
                <i class="fas fa-arrow-alt-circle-up"> ${item.votes}</i>
                Upvote</button>
                <button data-id="${item.id}" style="background-color: #D6EAF8;
                color: black;" class="btn btn-success downvotebtn">
                <i class="fas fa-arrow-alt-circle-down"></i>
                Downvote</button>
            </div>
        </div>
        `;
    }

    answerBody(data) {
        return `
            <div class="span-col-2">
                <h1>Question Details</h1>
                <hr>
                <div class="quiz">
                    <ul class="qa">
                        <p class="asheuh">Posted on ${data.data.question.date_created}</p>
                        <li class="no_dropdown">
                            <h3>${data.data.question.title}</h3>
                        </li>
                        <div class="d-container">
                            <ul class="stats">
                            <div class="new-container" style="padding-top: 3px; padding-bottom: 3px;">
                                <h4>Question</h4>
                                <p>${data.data.question.description}</p>
                                <div class="summary">
                                    <a href="#" id="del" class="btn btn-danger">
                                    Delete Question</a>
                                </div>
                                <h4>Answers</h4>
                            </div>
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
            <div class="side-grid">
                <div class="grid-3" style="margin-top: 6em">
                    <div class="summary" style="border: 1px solid green; text-align: center;">
                        <h4 style="margin-top: 1em;">Total answers</h4>
                        <h5><a href="#">${data.data.question.answers}</a></h5>
                    </div>
                </div>
            </div>
            `;
    }

    questionBody(result, item) {
        return `
        <ul class="qa">
            <p class="asheuh">
            Asked by ${result.data[item]["created_by"]} on ${result.data[item]["date_created"]}
            </p>
            <li class="d">
                <a href="/questions/details/?${result.data[item]["id"]}">
                ${result.data[item]["title"]}</a>
                <div class="d-container">
                <ul class="stats">
                    <div class="n-container">
                        <h2>Question summary</h2>
                        <p>${result.data[item]["description"]}</p>
                        <div class="grid-3">
                            <div class="summary">
                                <h4>Total answers</h4>
                                <h5><a href="/questions/details/?${result.data[item]["id"]}">
                                ${result.data[item]["answers"]}</a></h5>
                            </div>
                            <div class="summary">
                                <a style="background-color: #D6EAF8;
                                color: black;" class="btn btn-primary"
                                href="/questions/details/?${result.data[item]["id"]}">
                                view answers</a>
                            </div>
                        </div>
                    </div>
                </ul>
                </div>
            </li>
        </ul>

        `;
    }
}

const temps = new Templates();
export default temps;
