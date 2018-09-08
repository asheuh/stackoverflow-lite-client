class Questions {
    questionBody = (result, item) => {
        return `
        <ul class="qa">
            <p class="asheuh">Asked 20mins ago by Brian Mboya</p>
            <li class="dropdown-btn">
                <a href="#">${result.data[item]['title']}</a>
            </li>
            <div class="dropdown-container">
                <ul class="stats">
                    <div class="new-container">
                        <h2>Question summary</h2>
                        <p>
                            I have a website which contains jquery search (search based on object properties) and
                            the search result (HTML content) is appended from jquery. it is working perfectly fine
                            on a web device and also on chrome mobile emulator (in dev console) but it is not
                            working on the real device (Tested on both Android and IOS)
                        </p>
                        <div class="grid-3">
                            <div class="summary">
                                <h4>Total answers</h4>
                                <h5><a href="#">0</a></h5>
                                <a onclick="document.getElementById('id01').style.display='block'" class="btn btn-success" href="#">Post Answer</a>
                                <div id="id01" class="modal">
                                    <form class="modal-content animate" action="/action_page.php">
                                        <div class="scontainer">
                                            <label style="float:left" for="psw"><h2>Your Answer</h2></label>
                                            <textarea id="subject" name="subject" placeholder="Type your answer here..." style="height:200px"></textarea>
                                            <a href="#" class="btn btn-primary" type="submit">Submit</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="summary">
                                <h4>Total votes</h4>
                                <h5><a href="#">10</a></h5>
                                <a href="#" class="btn btn-success">add vote</a>
                            </div>
                            <div class="summary">
                                <h4>Total views</h4>
                                <h5><a href="#">18</a></h5>
                                <a href="details.html" class="btn btn-primary">view details</a>
                            </div>
                            <div class="summary">
                                <a href="#" class="btn btn-danger">Delete Question</a>
                            </div>

                        </div>
                    </div>
                </ul>
            </div>
        </ul>

        `
    }
}

const question = new Questions();
export default question;
