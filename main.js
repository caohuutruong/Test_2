
const API_URL = "http://localhost:3000/danhsachNV"
function taiDSNV(){
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById("tbody");
            
        tbody.innerHTML = "";
        
        data.forEach(nV => {
            const row = `
        <tr>
            <td>${nV.id}</td>
            <td>${nV.no}</td>
            <td>${nV.name}</td>
            <td>${nV.age}</td>
            <td>${nV.sex}</td>
            <td>${nV.address}</td>
            <td>${nV.company_in}</td>
            <td>${nV.company_out}</td>
            <td><button class="btn btn-danger" onclick="xoaNV('${nV.id}')">x</button></td>
        </tr>`;
        tbody.innerHTML += row;
        
            })
        })
}

// xoa nhan vien
function xoaNV(id){
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(() => taiDSNV());
}

// hien thi form thi click vao new

function showPopup(){
    document.getElementById("popup").style.display = "block";
}

function saveBtn(){
    
    const no = document.getElementById("No").value;
    const name = document.getElementById("Name").value;
    const age = parseInt(document.getElementById("Age").value);
    const sex = document.querySelector("input[name='sex']:checked").value;
    const address = document.getElementById("address").value;
    const company_in = document.getElementById("company_in").value;
    const company_out = document.getElementById("company_out").value;
    const newNV = {no, name, age, sex,address, company_in,company_out};

    // post

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(newNV)
    })
    .then(() => {
        taiDSNV();
        document.getElementById("popup").style.display = "none";
    });
}
window.onload = taiDSNV;
