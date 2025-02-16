document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id;

        remove(id).then(() => {
            event.target.closest('li').remove();
        });
    }

    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id;
        const title = event.target.dataset.title;
        const newTitle = prompt('Enter a new title:', title);

        if (newTitle !== null) {
            update({ id, title: newTitle }).then(() => {
                event.target.closest('li').querySelector('span').innerText =
                    newTitle;
            });
        }
    }
});

async function remove(id) {
    await fetch(`/${id}`, {
        method: 'DELETE',
    });
}

async function update(note) {
    await fetch(`/${note.id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });
}
