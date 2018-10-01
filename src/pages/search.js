import api from "../utils/api";
import auth from "../utils/auth";
import temps from "../utils/templates";

class Search {
	constructor() {
		this.searchQuestion();
	}

	sendData(data) {
		let loadNode = document.getElementById("cont");
		loadNode.innerHTML = "";
		let results = data.data;
		let searchResults = document.getElementById("msg");
		searchResults.innerHTML = "";
		if (data.message === "No results for your search") {
			searchResults.innerHTML = `
                <div class="panel pale-green">
                    <p>${data.message}</p>
                </div>
                `;
		}
		for (let i in data.data) {
			let parentNode = document.getElementById("msg");
			let quizBody = temps.questionBody(data, i);
			let node = document.createElement("div");
			node.classList.add("quiz");
			node.innerHTML = quizBody;
			parentNode.appendChild(node);
		}
	}

	searchQuestion() {
		let searchNode = document.getElementById("search");
		searchNode.addEventListener("keyup", event => {
			event.preventDefault();
			let selectQuery = searchNode.value;
			let endpoint = `/questions/search/${selectQuery}`;
			auth.loader();
			api.get(endpoint, auth.getToken())
				.then(response => response.json())
				.then(data => {
					this.sendData(data);
				})
				.catch(() => console.log("An error occurred"));
		});
	}
}

const search = new Search();
export default search;
