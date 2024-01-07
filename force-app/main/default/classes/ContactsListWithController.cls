public with sharing class ContactsListWithController {
    private String sortOrder = 'LastName';
    
    public List<Contact> getContacts() {
        List<Contact> results;
        String query = 'SELECT Id, FirstName, LastName, Title, Email FROM Contact ORDER BY ' + sortOrder + ' ASC LIMIT 10';

        try {
            results = Database.query(query);
        } catch (Exception e) {
            results = new List<Contact>(); // Handle exception gracefully
        }
        
        return results;
    }

    public void sortByLastName() {
        this.sortOrder = 'LastName';
    }
    public void sortByFirstName() {
        this.sortOrder = 'FirstName';
    }
}