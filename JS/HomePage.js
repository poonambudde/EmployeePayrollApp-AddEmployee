let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) =>{
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmpPayrollList') ? JSON.parse(localStorage.getItem('EmpPayrollList')) : [];
}

//Template literals ES6 feature
const createInnerHtml = () => {
    const headerHtml = `
    <tr>
    <th></th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Salary</th>
    <th>Start Date</th>
    <th>Actions</th>
    </tr>`;
    if(empPayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    // let empPayrollList = createEmpPayrollJson();
    for(const empPayrollData of empPayrollList){
    innerHtml = `${innerHtml} 
    <tr>
        <td><img class="profile" src="${empPayrollData._profilePic}" alt="profile"></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDeptHtml(empPayrollData._dept)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${stringifyDate(empPayrollData._startDate)}</td>
        <td>
            <img name="${empPayrollData._id}" onclick="remove(this)" src="../Assets/Icons/delete-black-18dp.svg" alt="delete">
            <img name="${empPayrollData._id}" onclick="update(this)" src="../Assets/Icons/create-black-18dp.svg" alt="edit">
        </td>
    </tr>
    `;
    }
    
document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for(const dept of deptList){
        deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}