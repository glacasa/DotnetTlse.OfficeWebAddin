/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/office-js/office-js.d.ts" />
/// <reference path="typings/knockout/knockout.d.ts" />
var Meetup;
(function (Meetup) {
    function searchContacts() {
        Office.context.document.getSelectedDataAsync(Office.CoercionType.Text, function (result) {
            var selectedText = result.value;
            var contacts = Meetup.findContacts(selectedText);
            viewModel.contacts(contacts);
        });
    }
    function addContact(contact) {
        var contactText = contact.firstName + " " + contact.lastName + "\n" + contact.address;
        Word.run(function (context) {
            context.document.getSelection().insertText(contactText, "Replace");
            return context.sync();
        });
    }
    var viewModel = {
        contacts: ko.observable([]),
        searchContacts: searchContacts,
        addContact: addContact,
    };
    Office.initialize = function () {
        ko.applyBindings(viewModel);
    };
})(Meetup || (Meetup = {}));
//# sourceMappingURL=Home.js.map