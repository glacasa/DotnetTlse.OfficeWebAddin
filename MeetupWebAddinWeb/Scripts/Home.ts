/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/office-js/office-js.d.ts" />
/// <reference path="typings/knockout/knockout.d.ts" />

module Meetup {


    function searchContacts() {
        Office.context.document.getSelectedDataAsync(Office.CoercionType.Text, result => {
            var selectedText = result.value;
            var contacts = Meetup.findContacts(selectedText);
            viewModel.contacts(contacts);
        });
    }

    function addContact(contact: Contact) {
        var contactText = contact.firstName + " " + contact.lastName + "\n" + contact.address;
        Word.run(context => {
            context.document.getSelection().insertText(contactText, "Replace");
            return context.sync();
        });
    }

    var viewModel = {
        contacts: ko.observable<Contact[]>([]),
        searchContacts: searchContacts,
        addContact: addContact,
    };



    Office.initialize = function () {
        ko.applyBindings(viewModel);
    };


}