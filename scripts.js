// scripts.js
function sortTable(column) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("playerStats");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[column];
            y = rows[i + 1].getElementsByTagName("TD")[column];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function searchPlayers() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchBox");
    filter = input.value.toUpperCase();
    table = document.getElementById("playerStats");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0]; // Assumes searching by name in the first column
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('info.json')
        .then(response => response.json())
        .then(data => {
            const teamContainer = document.getElementById('teamContainer');
            data.teams.forEach(team => {
                const teamElement = document.createElement('div');
                teamElement.className = 'team';
                teamElement.innerHTML = `
                    <img src="${team.name.replace(/\s+/g, '_')}.png" alt="Logo of ${team.name}">
                    <h3>${team.name}</h3>
                `;
                teamContainer.appendChild(teamElement);
            });
        });
});


function loadPlayerStats() {
    fetch('info.json')  // Make sure the path to info.json is correct
        .then(response => response.json())
        .then(data => {
            const playerTable = document.getElementById('playerStats').getElementsByTagName('tbody')[0];
            data.teams.forEach(team => {
                team.players.forEach(player => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${player.name}</td>
                        <td>${team.name}</td>
                        <td>${player.ppg}</td>
                        <td>${player.rpg}</td>
                        <td>${player.apg}</td>
                    `;
                    playerTable.appendChild(row);
                });
            });
        })
        .catch(error => console.error('Error loading player data:', error));
}

document.addEventListener('DOMContentLoaded', loadPlayerStats);

function searchPlayers() {
    const input = document.getElementById('searchBox');
    const filter = input.value.toUpperCase();
    const tbody = document.getElementById('playerStats').getElementsByTagName('tbody')[0];
    const rows = tbody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        let td = rows[i].getElementsByTagName('td')[0];  // Assumes you're searching by player name in the first column
        if (td) {
            let textValue = td.textContent || td.innerText;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }       
    }
}

function sortTable(column) {
    const table = document.getElementById('playerStats');
    let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc"; 

    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        // Loop through all table rows (except the first, which contains table headers):
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[column];
            y = rows[i + 1].getElementsByTagName("TD")[column];
            // Check if the two rows should switch place, based on the direction, asc or desc:
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            // If a switch has been marked, make the switch and mark that a switch has been done:
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;      
        } else {
            // If no switching has been done AND the direction is "asc",
            // set the direction to "desc" and run the while loop again.
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
