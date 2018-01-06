jQuery(function($) {
    $.fn.deleteContact = function(e) {
        let el = $(e[0]);
        let id = $(el).data('id');

        $.ajax({
            method: "DELETE",
            url: `/contact/${id}`,
            success: function(data){
                if (data.status === 'ok')  {
                    let tr = $(el).parent().parent();
                    $(tr).remove();
                }
            },
            error: function(data){
                console.log('error', data);
            }
        });
    };


    function renderContacts(contacts) {
        if (contacts.length) {
            contacts.forEach(function (el) {
                $('table tbody').append(`
                    <tr>
                        <td>${el.name}</td>
                        <td>${el.tel}</td>
                        <td class="text-right">
                            <a class="btn btn-link" href="/contact/${el._id}">Edit</a>
                            <button type="button" class="btn btn-warning" data-id="${el._id}" onclick="$(this).deleteContact($(this))">Delete</button>
                            
                        </td>
                    </tr>
                `);
            });
        } else {
            $('main .container').append(`Contact list is empty. You can add a contact <a href="/add">here</a>.`);
        }
    }


    $.ajax({
        method: "POST",
        url: '/contacts',
        success: function(data){
            renderContacts(data.contacts);
        },
        error: function(data){
            console.log('error', data);
        }
    });
});