/**
 * @description       : Apex controller for shortcuts LWC.
 * @author            : Ben Learn
 * @group             : 
 * @last modified on  : 03-04-2022
 * @last modified by  : Ben Learn
**/
public class ShortcutsService {
    @AuraEnabled
    public static void updateClicksCount(String link) {
        List<Clicks_Saved__c> csList = [SELECT Id, Count__c FROM Clicks_Saved__c];
        Integer clicksSaved = 0;
        switch on link {
            when 'Setup' {
                clicksSaved = 1;
            } when 'Object Manager' {
                clicksSaved = 2;
            } when else {
                clicksSaved = 3;

            }
        }
        if(csList.size() == 0){
            csList.add(new Clicks_Saved__c(Count__c=clicksSaved));
        } else {
            csList[0].Count__c += clicksSaved;
        }
        upsert csList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Clicks_Saved__c> getClicksId() {
        return [SELECT Id FROM Clicks_Saved__c];
    }

    @AuraEnabled(cacheable=true)
    public static List<Shortcut__mdt> getShortcuts() {
        return [SELECT MasterLabel, Icon__c, URL__c FROM Shortcut__mdt];
    }
}