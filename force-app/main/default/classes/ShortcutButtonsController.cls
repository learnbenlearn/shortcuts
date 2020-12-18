public class ShortcutButtonsController {
    @AuraEnabled
    public static void updateClicksCount() {
        List<Clicks_Saved__c> csList = [SELECT Id, Count__c FROM Clicks_Saved__c];
        if(csList.size() == 0){
            csList.add(new Clicks_Saved__c(Count__c=1));
        } else {
            csList[0].Count__c += 1;
        }
        upsert csList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Clicks_Saved__c> getClicksId() {
        return [SELECT Id FROM Clicks_Saved__c];
    }
}