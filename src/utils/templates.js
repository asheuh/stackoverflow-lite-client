(function(window) {
    class Templates {
        profilePageLink = (item) => {
            let node = document.getElementById('profile');
            node.innerHTML = item.data.username;
        }

        questionBody = (result, item) => {

            return `
            <ul class="qa">
                <p class="asheuh">Asked by ${result.data[item]['created_by']} on ${result.data[item]['date_created']}</p>
                <li class="d">
                    <a href="/questions/details/?${result.data[item]['id']}">${result.data[item]['title']}</a>
                    <div class="d-container">
                        <ul class="stats">
                            <div class="n-container">
                                <h2>Question summary</h2>
                                <p>${result.data[item]['description']}</p>
                                <div class="grid-3">
                                    <div class="summary">
                                        <h4>Total answers</h4>
                                        <h5><a href="/questions/details/?${result.data[item]['id']}">${result.data[item]['answers']}</a></h5>
                                    </div>
                                    <div class="summary">
                                        <a style="background-color: #D6EAF8; color: black;" class="btn btn-primary" href="/questions/details/?${result.data[item]['id']}">view answers</a>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                </li>
            </ul>

            `
        }
    }
    window.Templates = Templates;
}(window));

const temps = new Templates();
export default temps;
