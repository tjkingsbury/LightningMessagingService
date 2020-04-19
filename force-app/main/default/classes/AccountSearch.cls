public with sharing class AccountSearch {
    

    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String accountName){
        String accountNameWildcard = '%' + accountName + '%';
        List<Account> accountList = [SELECT Id, Name, Type FROM Account WHERE Name LIKE : accountNameWildcard];
        return accountList;
    }
}
