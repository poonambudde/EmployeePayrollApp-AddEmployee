//Javascript to add set event listeners on document loading(UC10)
window.addEventListener('DOMContentLoaded', (event) => {
    //Setting the name to the employee object for validation
    const name = document.querySelector('#name');
    const nameError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            nameError.textContent = "";
            return;
        }
        try {
            (new EmpPayrollData()).name = name.value;
            nameError.textContent = "";
        } catch (e) {
            nameError.textContent = e;
        }
    });
    //Setting the salary output by checking the salary value(UC10)
    const salary = document.querySelector('#salary');
    const outputSal = document.querySelector('.salary-output');
    outputSal.textContent = salary.value;
    salary.addEventListener('input', () => {
        outputSal.textContent = salary.value;
    });

    //Setting the date to the employee object for validation(UC10)
    const date = document.querySelector('#date');
    // const errorDate = document.querySelector('#errorDate');
    date.addEventListener('select', function() {
        let startDate = getInputValueById('#day') +" "+ getInputValueById('#month') +" "+ getInputValueById('#year');
        try {
            //(new EmpPayrollData()).startDate = new Date(date.parse(startDate));
            checkkStartDate(new Date(Date.parse(startDate)));
            setTextValue('.errorDate', "");
            //errorDate.textContent = "";
        } catch (e) {
            setTextValue('.errorDate', e);
            //errorDate.textContent = e;
        }
    });
}); 

//Arrow function to get the input value by id(UC11)
const getInputValueById = (id) => {
    return document.querySelector(id).value;
}

//Arrow function to set the value by id(UC11)
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

//Arrow function to save employee object(UC11)
const save = () => {
    try {
        let EmpPayrollData = createEmployeePayroll();
        createAndUpdateStorage(EmpPayrollData);
    } catch (e) {
        return;
    }
}

//Arrow function to create employee object and set the values provided by the user to object(UC11)
const createEmployeePayroll = () => {
    let EmpPayrollData = new EmpPayrollData();
    try {
        EmpPayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('#errorName', e)
        throw e;
    }
    EmpPayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    EmpPayrollData.gender = getSelectedValues('[name=gender]').pop();
    EmpPayrollData.dept = getSelectedValues('[name=dept]');
    EmpPayrollData.salary = getInputValueById('#salary');
    EmpPayrollData.notes = getInputValueById('#notes');
    let date = `${getInputValueById('#day')} ${getInputValueById('#month')} ${getInputValueById('#year')}`;
    try {
        EmpPayrollData.startDate = new Date(date);
        setTextValue('#errorDate', e)
    } catch {
        setTextValue('#errorDate', e)
        throw e;
    }
    return EmpPayrollData;
}

//Arrow function to get all the selected values checked by user(UC11)
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selectedItems = [];
    allItems.forEach(item => {
        if (item.checked)
            selectedItems.push(item.value);
    });
    return selectedItems;
}

function createAndUpdateStorage(EmpPayrollData){
    let empPayrollList = JSON.parse(localStorage.getItem("empPayrollList"));

    if(empPayrollList != undefined){
        empPayrollList.push(EmpPayrollData);
    } else{
        empPayrollList = [EmpPayrollData]
    }
    alert(empPayrollList.toString());
    localStorage.setItem("empPayrollList", JSON.stringify(empPayrollList))
}

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=dept]');
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day', '');
    setValue('#month', '');
    setValue('#year', '');
}
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false
    });
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}