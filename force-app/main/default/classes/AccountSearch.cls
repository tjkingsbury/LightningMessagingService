public with sharing class AccountSearch {
    

    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String accountName){
        System.debug('searchAccounts');
        String accountNameWildcard = '%' + accountName + '%';
        List<Account> accountList = [SELECT Id, Name FROM Account WHERE Name LIKE : accountNameWildcard];
        System.debug('accountList: ' + accountList);
        return accountList;
    }
}
