const form = document.getElementById('myForm');
const btnSendData = document.getElementById('btnSendData');
const OpenDataModal = document.getElementById('OpenDataModal');
const saveChangesButton = document.getElementById('saveChangesButton');


const fetchData = 'http://localhost:3000/gyms'


const RenderGymCards = async () => {
    gymsContainer.innerHTML = '';
    try {
        const response = await fetch(fetchData);
        const gymsDataList = await response.json();

        const gymsContainer = document.getElementById('gymsContainer');

        gymsDataList.forEach(gym => {
            const gymDiv = createGymCard(gym);
            gymsContainer.appendChild(gymDiv);

            // Adjuntar event listeners a los botones de "Editar" y "Eliminar"
            const updateBtn = gymDiv.querySelector('.UpdateGymBtn');
            const deleteBtn = gymDiv.querySelector('.DeleteGymBtn');

            updateBtn.addEventListener('click', () => handleEditGym(gym._id));
            deleteBtn.addEventListener('click', () => handleDeleteGym(gym._id));
        });
    } catch (error) {
        console.error('Error fetching gyms:', error);
    }
}
RenderGymCards();

function handleEditGym(gymId) {
    // Lógica para obtener los datos del gimnasio con el ID proporcionado
    fetch(`/gyms/${gymId}`)
        .then(response => response.json())
        .then(gymData => {
            // Abrir la modal de edición
            const editModal = new bootstrap.Modal(document.getElementById('editModal'));
            editModal.show();

            // Llenar los campos del formulario en la modal con los datos del gimnasio
            fillEditForm(gymData);
            saveChangesButton.addEventListener('click', () => {
                const updatedData = {
                    name: document.getElementById('EditName').value,
                    location: document.getElementById('Editlocation').value,
                    gymPrice: document.getElementById('EditgymPrice').value,
                    gymOpenTime: document.getElementById('EditgymOpenTime').value,
                    gymCloseTime: document.getElementById('EditgymCloseTime').value,
                    coaches: [{
                        name: document.getElementById('EditcoachName').value,
                        specialty: document.getElementById('EditcoachSpecialty').value,
                        monthlyPrice: document.getElementById('EditcoachMonthlyPrice').value
                    }]
                };
                console.log('coachSpecialty:', document.getElementById('EditcoachSpecialty').value);
                console.log('coachMonthlyPrice:', document.getElementById('EditcoachMonthlyPrice').value);


                fetch(`/gyms/${gymData._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedData)
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log('Cambios guardados:', data);
                        // Cerrar la modal de edición
                        const modal = document.getElementById('editModal');
                        const modalBootstrap = bootstrap.Modal.getInstance(modal);
                        modalBootstrap.hide();
                        RenderGymCards();
                        // Recargar la página o realizar otras acciones necesarias
                    })
                    .catch(error => {
                        console.error(error);
                    });

            });
        })
        .catch(error => {
            console.error('Error fetching gym data:', error);
        });
    console.log(gymId);
}




// function fillEditForm(gymData) {
//     // Llenar los campos del formulario en la modal con los datos del gimnasio
//     document.getElementById('EditName').value = gymData.name || '';
//     document.getElementById('Editlocation').value = gymData.location || '';
//     document.getElementById('EditgymPrice').value = gymData.price || '';
//     document.getElementById('EditgymOpenTime').value = gymData.openTime || '';
//     document.getElementById('EditgymCloseTime').value = gymData.closeTime || '';

//     // Asumiendo que solo hay un entrenador para simplificar, ajusta según tu estructura de datos
//     if (gymData.coaches && gymData.coaches.length > 0) {
//         document.getElementById('EditcoachName').value = gymData.coaches[0].name || '';
//         document.getElementById('EditcoachSpecialty').value = gymData.coaches[0].specialty || '';
//         document.getElementById('EditcoachMonthlyPrice').value = gymData.coaches[0].monthlyPrice || '';
//     }
// }


function fillEditForm(gymData) {
    // Verificar si los elementos existen antes de acceder a sus valores
    const editNameInput = document.getElementById('EditName');
    const editLocationInput = document.getElementById('Editlocation');
    const editGymPriceInput = document.getElementById('EditgymPrice');
    const editGymOpenTimeInput = document.getElementById('EditgymOpenTime');
    const editGymCloseTimeInput = document.getElementById('EditgymCloseTime');
    const editCoachNameInput = document.getElementById('EditcoachName');
    const editCoachSpecialtyInput = document.getElementById('EditcoachSpecialty');
    const editCoachMonthlyPriceInput = document.getElementById('EditcoachMonthlyPrice');

    if (
        editNameInput &&
        editLocationInput &&
        editGymPriceInput &&
        editGymOpenTimeInput &&
        editGymCloseTimeInput &&
        editCoachNameInput &&
        editCoachSpecialtyInput &&
        editCoachMonthlyPriceInput
    ) {
        // Asignar valores a los campos del formulario
        editNameInput.value = gymData.name;
        editLocationInput.value = gymData.location;
        editGymPriceInput.value = gymData.price;
        editGymOpenTimeInput.value = gymData.openTime;
        editGymCloseTimeInput.value = gymData.closeTime;
        // Aquí puedes manejar la información del entrenador según la estructura de tu objeto
        if (gymData.coaches && gymData.coaches.length > 0) {
            editCoachNameInput.value = gymData.coaches[0].name;
            editCoachSpecialtyInput.value = gymData.coaches[0].specialty;
            editCoachMonthlyPriceInput.value = gymData.coaches[0].monthlyPrice;
        }
    } else {
        console.error('Error: Al menos uno de los elementos del formulario no existe.');
    }
}


async function handleDeleteGym(gymId) {
    try {
        await fetch(`/gyms/${gymId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("Gimnasio eliminado con ID", gymId);
        // Después de eliminar, redirigir a la página actual para refrescar los gimnasios
        RenderGymCards();
    } catch (error) {
        console.error(error);
    }
}

function createGymCard(gym) {
    const gymDiv = document.createElement('div');
    gymDiv.classList.add('gym-card');

    const gymInfo = `
        <h2>${gym.name}</h2>
        <p><strong>Location:</strong> ${gym.location}</p>
        <p><strong>Price:</strong> ${gym.price}</p>
        <p><strong>Open Time:</strong> ${gym.openTime} - <strong>Close Time:</strong> ${gym.closeTime}</p>
    `;

    const coachesInfo = (gym.coaches || []).map(coach => {
        return `
            <div class="coach-container">
                <p><strong>Coach:</strong> ${coach.name}</p>
                <p><strong>Specialty:</strong> ${coach.specialty}</p>
                <p><strong>Monthly Price:</strong> ${coach.monthlyPrice}</p>
            </div>
        `;
    }).join('');

    const buttonSelectGym = `
        <div class="coach-container">
            <button class="UpdateGymBtn SelectGymBtn" data-id="${gym._id}">Editar</button>
            <button class="DeleteGymBtn SelectGymBtn" data-id="${gym._id}">Eliminar</button>
        </div>
    `;

    gymDiv.innerHTML = gymInfo + coachesInfo + buttonSelectGym;
    return gymDiv;
}


const CreateNewGymData = async () => {

    const NameGymDataInput = document.getElementById('gymName').value;
    const LocationGymDataInput = document.getElementById('gymLocation').value;
    const PriceGymDataInput = document.getElementById('gymPrice').value;
    const OpenTimeGymDataInput = document.getElementById('gymOpenTime').value;
    const CloseTimeGymDataInput = document.getElementById('gymCloseTime').value;
    const CoachNameInput = document.getElementById('coachName').value;
    const CoachSpecialtyInput = document.getElementById('coachSpecialty').value;
    const CoachMonthlyPriceInput = document.getElementById('coachMonthlyPrice').value;


    const coaches = [{
        name: CoachNameInput,
        specialty: CoachSpecialtyInput,
        monthlyPrice: CoachMonthlyPriceInput
    }];

    const requestData = {
        name: NameGymDataInput,
        location: LocationGymDataInput,
        price: PriceGymDataInput,
        openTime: OpenTimeGymDataInput,
        closeTime: CloseTimeGymDataInput,
        coaches: coaches
    };



    try {
        const response = await fetch('/gyms/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Error when creating restaurant');
        }

        // Handle success response here
    } catch (error) {
        // Handle error here
        console.error(error);
    }

    form.reset();
    const modal = document.getElementById('exampleModal');
    const modalBootstrap = bootstrap.Modal.getInstance(modal);
    modalBootstrap.hide();
    RenderGymCards();
}






btnSendData.addEventListener('click', CreateNewGymData);