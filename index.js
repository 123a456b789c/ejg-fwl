function populateList() {
document.getElementById("container").innerHTML = "";
document.getElementById("container").innerHTML += '<h1>Elérhető listák</h1><div id="lists"></div>';
fetch('https://proxy.cors.sh/https://pastebin.com/raw/ucctfvPv',
{
    method: 'GET',
    headers: {
        'Content-Type': 'text/plain',
        'x-cors-api-key': 'temp_f55cf12dfbec2c662fea6bfff4618f74'
    }
})
    .then(response => response.text())
    .then(text => {
        var lists = document.getElementById("lists");
        var lines = text.split("\n");
        for (var i = 0; i < lines.length; i++) {
            lines[i] = lines[i].split("|");
            var url = lines[i][0];
            var name = lines[i][1];
            console.log(url);
            console.log(name);
            if (name == undefined) {
                name = url;
            }
            lists.innerHTML += `<a onclick="loadPaste('${url}')">${name}</a><br>`;
        }
    });
}

function loadPaste(url) {
    fetch(`https://proxy.cors.sh/${url}`,
{
    method: 'GET',
    headers: {
        'Content-Type': 'text/plain',
        'x-cors-api-key': 'temp_f55cf12dfbec2c662fea6bfff4618f74'
    }
})
    .then(response => response.text())
    .then(text => {
        var container = document.getElementById("container");
        var lines = text.split("\r\n");
        container.innerHTML = "";
        container.innerHTML += `<h1>${url}</h1>`;
        container.innerHTML += '<button class="btn btn-primary" onclick="populateList()">Vissza</button>'
        container.innerHTML += '<table class="table"><tr><th>Német/Angol</th><th>Magyar</th></tr><tbody id="table">';
        var table = document.getElementById("table");
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var parts = line.split("\t");
            table.innerHTML += `<tr><td>${parts[0]}</td><td>${parts[1]}</td></tr>`;
        }
        container.innerHTML += '</tbody></table>';
    });
}
