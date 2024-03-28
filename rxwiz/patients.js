async function readPatientData() {
    const response = await fetch('patients.json');
    const data = await response.json();
    return data.results;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateAge(birthday) {
    const dob = new Date(birthday);
    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
    const monthDiff = now.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

async function generatePatientTable() {
    const tableBody = document.getElementById('patientsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = "";

    showLoadingSpinner();

    try {
        const patientDataList = await readPatientData();

        patientDataList.forEach(patientData => {
            let row = tableBody.insertRow();
            let nameCell = row.insertCell(0);
            let idCell = row.insertCell(1);
            let birthdayCell = row.insertCell(2);
            let addressCell = row.insertCell(3);

            const fullName = `${patientData.name.first} ${patientData.name.last}`;
            const id = getRandomInt(10000, 99999);
            const birthday = patientData.dob.date.substring(0, 10);
            const address = `${patientData.location.street.number} ${patientData.location.street.name}`;
            const photoUrl = patientData.picture.large;
            const gender = patientData.gender;
            const age = calculateAge(birthday);

            const link = `random.html?name=${encodeURIComponent(fullName)}&id=${id}&birthday=${birthday}&address=${encodeURIComponent(address)}&photoUrl=${encodeURIComponent(photoUrl)}&gender=${gender}&age=${age}`;

            nameCell.innerHTML = `<a href="${link}">${fullName}</a>`;
            idCell.textContent = `ID${id}`;
            birthdayCell.textContent = birthday;
            addressCell.textContent = address;
        });

        hideLoadingSpinner();
        document.getElementById('patientsTable').style.display = 'table';
    } catch (error) {
        console.error('Error reading patient data:', error);
    }
}

function showLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'block';
}

function hideLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

function generateRandomDate(start, end) {
    const startDate = start.getTime();
    const endDate = end.getTime();
    const randomDate = new Date(startDate + Math.random() * (endDate - startDate));
    return randomDate;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getRandomHeight() {
    const minHeight = 150;
    const maxHeight = 200;
    return Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
}

function getRandomWeight() {
    const minWeight = 50;
    const maxWeight = 100;
    return Math.floor(Math.random() * (maxWeight - minWeight + 1)) + minWeight;
}

function getRandomPhoneNumber() {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const firstPart = Math.floor(Math.random() * 900) + 100;
    const secondPart = Math.floor(Math.random() * 10000) + 1000;
    return `(${areaCode}) ${firstPart}-${secondPart}`;
}

function doctor() {
    const doctorNames = [
        "Dr. Smith",
        "Dr. Johnson",
        "Dr. Williams",
        "Dr. Brown",
        "Dr. Jones",
        "Dr. Garcia",
        "Dr. Miller",
        "Dr. Davis"
    ];
    const randomIndex = Math.floor(Math.random() * doctorNames.length);
    const selectedDoctorName = doctorNames[randomIndex];
    const phoneNumber = getRandomPhoneNumber();
    return `${selectedDoctorName}, Phone: ${phoneNumber}`;
}

async function displayPatientInfoAndMedications() {
    let modal = document.getElementById('confirmation-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'confirmation-modal';
        modal.style.display = 'none'; // Ensure it's hidden initially
        modal.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 5px; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); box-shadow: 0px 0px 10px rgba(0,0,0,0.5); width: auto; max-width: 80%;">
                <p id="modal-message"></p>
                <button id="modal-confirm">Confirm</button>
                <button id="modal-cancel">Cancel</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Style for the modal background
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.style.display = 'none'; // Confirm it's set to 'none' here as well
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';

        // Event listener for the Cancel button
        document.getElementById('modal-cancel').addEventListener('click', function() {
            modal.style.display = 'none'; // Hide the modal
        });

        // Prepare the Confirm button listener without showing the modal
        document.getElementById('modal-confirm').addEventListener('click', function() {
            console.log('Modification confirmed.');
            modal.style.display = 'none';
            // Implement the action to be taken after confirmation here
        });
    }

    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const id = params.get('id');
    const birthday = params.get('birthday');
    const address = params.get('address');
    const photoUrl = params.get('photoUrl');
    const gender = params.get('gender');
    const age = params.get('age');
    const height = getRandomHeight(); // Function to get random height
    const weight = getRandomWeight(); // Function to get random weight
    const doc = doctor(); // Function to get a random doctor's name and phone number
    const contact = getRandomPhoneNumber(); // Function to get a random phone number
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    const mainContainer = document.createElement('div');
    mainContainer.style.display = 'flex';
    mainContainer.style.justifyContent = 'space-around';
    mainContainer.style.alignItems = 'flex-start';
    mainContainer.style.backgroundColor = 'white';
    mainContainer.style.width = '100vw'; // Ensures it takes the full viewport width
    mainContainer.style.paddingTop = '30px';
    mainContainer.style.paddingLeft = '200px'; // Consider adjusting if this affects your desired full width
    mainContainer.style.boxSizing = 'border-box';
    mainContainer.style.minHeight = 'calc(100vh - 60px)';
    document.querySelector('main').appendChild(mainContainer);

    const patientInfoDiv = document.createElement('div');
    patientInfoDiv.id = 'patient-info';
    patientInfoDiv.style.flex = '01.1';
    patientInfoDiv.innerHTML = `
    <h1>Patient Information</h2>
    <img src="${photoUrl}" alt="Patient Photo" class="patient-photo" style="max-width: 100px; border-radius: 50%;">
    <p style="font-size: 18px;">Patient ID: ${id}</p>
    <p style="font-size: 18px;">Name: ${name}</p>
    <p style="font-size: 18px;">Age: ${age}</p>
    <p style="font-size: 18px;">Date of Birth: ${birthday}</p>
    <p style="font-size: 18px;">Address: ${address}</p>
    <p style="font-size: 18px;">Gender: ${gender}</p>
    <p style="font-size: 18px;">Height: ${height} cm</p>
    <p style="font-size: 18px;">Weight: ${weight} kg</p>
    <p style="font-size: 18px;">Doctor: ${doc}</p>
    <p style="font-size: 18px;">Contact: <a href="#">${contact}</a></p>
`;
// Assuming the 'name' variable contains the text you want to set


// Select the div with class 'header-title'
const headerTitle = document.querySelector('.header-title');

// Assign the ID 't' to the selected div
headerTitle.id = 't';

// Update the text content of the div to the 'name' variable
headerTitle.textContent = name;



    mainContainer.appendChild(patientInfoDiv);

    const medicationDiv = document.createElement('div');
    medicationDiv.id = 'med';
    medicationDiv.style.flex = '1';
    mainContainer.appendChild(medicationDiv);

    try {
        const response = await fetch('conditions.csv');
        const csvData = await response.text();
        const rows = csvData.split('\n').slice(1);

        let medicationHTML = '<h1 >Medications</h2>';
        for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
            const randomRowIndex = Math.floor(Math.random() * rows.length);
            const row = rows[randomRowIndex].split(',');
            const condition = row[0];
            const medicationName = row[2];
            const controlledLevel = row[1].trim();
            const prescribedDate = generateRandomDate(new Date(2022, 0, 1), new Date());
            const nextRefillDate = formatDate(generateRandomDate(new Date(), new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)));
            const recurring = Math.random() < 0.8;
            const dosageOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
            const randomDosageIndex = Math.floor(Math.random() * dosageOptions.length);
            const dosage = dosageOptions[randomDosageIndex];

            const isControlledMedication = ['Schedule I', 'Schedule II'].includes(controlledLevel);
            const titleStyle = isControlledMedication ? 'style="color: red;"' : '';

            medicationHTML += `
            <div class="medication-container" style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; margin-right: 100px;">
                <div class="medication">
                    <h3 ${titleStyle}" style="font-size: 24px;">${medicationName}</h3>
                    <p style="font-size: 18px;"><strong>Drug Info:</strong> ${condition} (Controlled Level: ${controlledLevel})</p>
                    <p style="font-size: 18px;">Prescribed: ${formatDate(prescribedDate)}</p>
                    <p style="font-size: 18px;">Next Refill: ${nextRefillDate}</p>
                    <input type="checkbox" ${recurring ? 'checked' : ''}> <label>Recurring</label>
                    <select style="width: 20%; height: 40px; margin-bottom: 10px;">${dosageOptions.map(option => `<option value="${option}" ${option === dosage ? 'selected' : ''}>${option} mg</option>`).join('')}</select>
                    <div style="text-align: center; margin-top: 10px;">
                        <button class="save-button" data-controlled-level="${controlledLevel}" data-medication-name="${medicationName}" data-id="${id}" style="width: 50%; height: 40px; background-color: blue; color: white; border: none; cursor: pointer;">Save Medication</button>
                    </div>
                </div>
            </div>
        `;
        
        
        }

        medicationDiv.innerHTML = medicationHTML;

        medicationDiv.querySelectorAll('.save-button').forEach(button => {
            button.addEventListener('click', () => {
                const medicationName = button.getAttribute('data-medication-name');
                const controlledLevel = button.getAttribute('data-controlled-level');
                const patientId = button.getAttribute('data-id');
                const confirmationMessage = `Warning: This is an FDA Schedule ${controlledLevel} substance. Are you sure you want to modify ${medicationName} for patient ${patientId}?`;
    
                // Instead of confirm, show the modal
                document.getElementById('modal-message').textContent = confirmationMessage;
                modal.style.display = 'flex'; // Show the modal
    
                // Logic to confirm modification is now handled by the modal's 'Confirm' button
            });
        });
    } catch (error) {
        console.error('Error fetching or parsing CSV data:', error);
        window.location.reload();

    }
}

// Assuming getRandomHeight, getRandomWeight, doctor, getRandomPhoneNumber, generateRandomDate, and formatDate are already defined


window.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname === '/~rollo/rxwiz/patients.html') {
        document.getElementById('patientsTable').style.display = 'none';
        generatePatientTable();
    } else if (window.location.pathname === '/~rollo/rxwiz/random.html') {
        displayPatientInfoAndMedications();
    }
});
