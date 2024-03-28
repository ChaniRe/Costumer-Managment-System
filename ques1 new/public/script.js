
document.addEventListener('DOMContentLoaded', () => {
    // Existing code for populating friend data in the table
});



async function createFriend(formData) {
    console.log('Form Data:', formData);
    try {
        const response = await fetch('/api/friends', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData) // Convert formData to JSON string
        });

        const responseData = await response.json(); // Parse response JSON

        console.log('Response status:', response.status);
        console.log('Response data:', responseData);

        if (!response.ok) {
            throw new Error('Error creating friend');
        }

        console.log('Friend created successfully:', responseData);
        alert('Friend created successfully!');
        
    } catch (error) {
        console.error(error);
        //alert('Error creating friend. Please try again.');
    }
    closePopup(); // Close the popup form after successful creation
}




// async function editFriend(id) {
//     try {
//         const response = await fetch(`/api/friends/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(updatedData)
//         });
//         if (!response.ok) {
//             throw new Error('Error updating friend');
//         }
//         alert('Friend updated successfully!');
//     } catch (error) {
//         return console.error('Error:', error);
//     }
// }

async function editFriend(id, updatedData) {
    try {
        const response = await fetch(`/api/friends/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });
        if (!response.ok) {
            throw new Error('Error updating friend');
        }
        alert('Friend updated successfully!');
        const friendData = await getAllFriends();
        showFriends(friendData);
    } catch (error) {
        console.error('Error:', error);
    }
}


function getFormData() {
    const formData = new FormData(document.getElementById('editFriendForm'));
    const updatedData = Object.fromEntries(formData.entries());
    return updatedData;
}


async function deleteFriend(id) {
    try {
        const response = await fetch(`/api/friends/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error deleting friend');
        }
        alert('Friend deleted successfully!');
    } catch (error) {
        return console.error('Error:', error);
    }
}







function showFriends(friendData) {

    const friendTable = document.getElementById('friendTable');
    const tbody = friendTable.querySelector('tbody');

    friendData.forEach(friend => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${friend.id}</td>
            <td>${friend.firstName}</td>
            <td>${friend.lastName}</td>
            <td>
                <button onclick="deleteFriend('${friend._id}')">מחק</button>
                <button onclick="editFriend('${friend.id}', getUpdatedData())">ערוך</button>
            </td>
            <td><span class="expand-button" onclick="toggleDetails(this.parentElement.parentElement)">+</span></td>
        `;
        tbody.appendChild(row);

        const detailsRow = document.createElement('ul');
        detailsRow.classList.add('expand-details');
        detailsRow.innerHTML = `
            <li>עיר: ${friend.city}</li>
            <li>רחוב: ${friend.street}</li>
            <li>מספר בית: ${friend.homeNumber}</li>
            <li>תאריך לידה: ${friend.dateOfBirth}</li>
            <li>מספר טלפון: ${friend.phoneNumber}</li>
            <li>טלפון נייד: ${friend.personalPhone}</li>
            <li>תאריך חיסון 1: ${friend.dateOfVaccine1}</li>
            <li>יצרן חיסון 1: ${friend.companyOfVaccine1}</li>
            <li>תאריך חיסון 2: ${friend.dateOfVaccine2}</li>
            <li>יצרן חיסון 2:  ${friend.companyOfVaccine2}</li>
            <li>תאריך חיסון 3: ${friend.dateOfVaccine3}</li>
            <li>יצרן חיסון 3: ${friend.companyOfVaccine3}</li>
            <li>תאריך חיסון 4: ${friend.dateOfVaccine4}</li>
            <li>יצרן חיסון 4: ${friend.companyOfVaccine4}</li>
            <li>תאריך בדיקת קורונה חיובית: ${friend.dateOfCovid}</li>
            <li>תארי החלמה: ${friend.dateOfRecovery}</li>
        `;
        tbody.appendChild(detailsRow);
    });

    friendTable.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('expand-button')) {
            toggleDetails(target.parentElement.parentElement);//
            const detailsRow = target.parentElement.parentElement.nextElementSibling;
            if (detailsRow) {
                detailsRow.classList.toggle('expand-details');
                target.textContent = detailsRow.classList.contains('expand-details') ? '+' : '-';
            }
        }
    });
}

async function getAllFriends() {
    try {
        const response = await fetch('/api/friends', {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Failed to fetch friends');
        }
        const friends = await response.json();
        console.log('All friends:', friends);
        return friends; // Return the fetched data
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}



function toggleDetails(row) {
    const detailsRow = row.nextElementSibling;
    if (detailsRow.classList.contains('expand-details')) {
        detailsRow.classList.remove('expand-details');
        row.querySelector('.expand-button').textContent = '+';
    } else {
        detailsRow.classList.add('expand-details');
        row.querySelector('.expand-button').textContent = '-';
    }
}



document.addEventListener('DOMContentLoaded', async () => {
    const friendData = await getAllFriends();
    showFriends(friendData);
});


function openPopup() {
    const popup = document.getElementById('add_new_friend_form');
    popup.classList.remove('hide');
}

function closePopup() {
    const popup = document.getElementById('add_new_friend_form');
    popup.classList.add('hide');
}



function submitForm(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.target); // Get form data

    // Example of accessing form data by name attribute
    console.log('Form Data:', formData);

    const firstName = formData.get('name1');
    const lastName = formData.get('name2');
    const idNumber = formData.get('id');
    const city = formData.get('address1');
    const street = formData.get('address2');
    const homeNumber = formData.get('address3');
    const dateOfBirth = formData.get('birthdate');
    const phoneNumber = formData.get('phone');
    const personalPhone = formData.get('mobile');
    const dateOfVaccine1 = formData.get('vaccine1_date');
    const companyOfVaccine1 = formData.get('vaccine1_manufacturer');
    const dateOfVaccine2 = formData.get('vaccine2_date');
    const companyOfVaccine2 = formData.get('vaccine2_manufacturer');
    const dateOfVaccine3 = formData.get('vaccine3_date');
    const companyOfVaccine3 = formData.get('vaccine3_manufacturer');
    const dateOfVaccine4 = formData.get('vaccine4_date');
    const companyOfVaccine4 = formData.get('vaccine4_manufacturer');
    const dateOfCovid = formData.get('positive_date');
    const dateOfRecovery = formData.get('recovery_date');

    // Create an object with the form data
    const updatedData = {
        firstName,
        lastName,
        idNumber,
        city,
        street,
        homeNumber,
        dateOfBirth,
        phoneNumber,
        personalPhone,
        dateOfVaccine1,
        companyOfVaccine1,
        dateOfVaccine2,
        companyOfVaccine2,
        dateOfVaccine3,
        companyOfVaccine3,
        dateOfVaccine4,
        companyOfVaccine4,
        dateOfCovid,
        dateOfRecovery
    };

    console.log('Updated Data:', updatedData);

    createFriend(updatedData); // Call createFriend with the form data object
}





