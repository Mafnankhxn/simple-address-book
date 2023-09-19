const contacts = [
    { id: 1, name: 'Afnan khan', phone: '123-456-789', email: 'afookhan66@gmail.com' },
    { id: 3, name: 'John Doe', phone: '789-456-123', email: 'Johndoe77@gmail.com' }
]

const contactlist = document.getElementById('contact-list-body');
const addbtn = document.getElementById('add-contact-btn');
const contactmodal = document.getElementById('contact-modal');
const contactform = document.getElementById('contact-form');
const nameinput = document.getElementById('name');
const phoneinput = document.getElementById('phone');
const emailinput = document.getElementById('email');
const closemodalbtn = document.getElementById('cross');

function displaycontacts() {
    contactlist.innerHTML = "";
    for (const contact of contacts) {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${contact.name}</td>
         <td>${contact.phone}</td>
         <td>${contact.email}</td>
         <button class="edit-btn" data-id="${contact.id}">Edit</button>
         <button class="delete-btn" data-id="${contact.id}">delete</button>
         `;
        console.log(row)
        contactlist.appendChild(row);
    }
}


addbtn.addEventListener('click', () => {
    nameinput.value = "";
    phoneinput.value = "";
    emailinput.value = "";
    contactform.dataset.mode = "add";
    contactmodal.style.display = "block";
});

closemodalbtn.addEventListener('click', () => {
    contactmodal.style.display = "none";
});

contactform.addEventListener('submit', (e) => {
    e.preventDefault();
    const mode = contactform.dataset.mode;
    const id = parseInt(contactform.dataset.id);

    const name = nameinput.value.trim();
    const phone = phoneinput.value.trim();
    const email = emailinput.value.trim();
    console.log(name,phone,email);

    if(mode==='add'){
    const newcontact = { id: Date.now(), name , phone , email};
    contacts.push(newcontact);
    console.log(contacts)
    displaycontacts();
    }
    else if (mode === 'edit') {
        const contactToEditIndex = contacts.findIndex(contact => contact.id === id);
        if (contactToEditIndex !== -1) {
            contacts[contactToEditIndex] = { id, name, phone, email };
            displaycontacts(); 
        }
    }
    
});

// Separate event listener for editing contacts-otherwise causing error
contactlist.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        let id = parseInt(e.target.getAttribute('data-id'));
        const contactToEdit = contacts.find(contact => contact.id === id);
        if (contactToEdit) {
            nameinput.value = contactToEdit.name;
            phoneinput.value = contactToEdit.phone;
            emailinput.value = contactToEdit.email;
            contactform.dataset.mode = 'edit';
            contactform.dataset.id = id; // Set the ID for editing
            contactmodal.style.display = 'block';
        }
    }
});

// Separate event listener for deleting contacts
contactlist.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        let id = parseInt(e.target.getAttribute('data-id'));
        const contactToDeleteIndex = contacts.findIndex(contact => contact.id === id);
        if (contactToDeleteIndex !== -1) {
            contacts.splice(contactToDeleteIndex, 1);
            displayContacts(); // Refresh the displayed contacts after deletion
        }
    }
});


window.addEventListener('DOMContentLoaded', () => {
    displaycontacts();
});