import requests

class Ringba:
    def __init__(self, accountId, apiToken):
        self.accountId = accountId
        self.apiToken = apiToken



    def get_ringba_call_data(self, phone):
        
        url = "https://api.ringba.com/v2/" + self.accountId + "/calllogs"
        payload = "{\n\"reportEnd\": \"2021-06-30T07:59:59Z\",\n\"reportStart\":\"2021-05-01T08:00:00Z\",\n\"filters\": [\n{\n\"anyConditionToMatch\": [\n{\n\"column\": \"inboundPhoneNumber\",\n\"value\": \"+" + phone + "\",\n\"isNegativeMatch\": false,\n\"comparisonType\": \"EQUALS\"\n},\n\n]\n},\n]\n}"
        headers = {
        'Authorization': 'Token ' + self.apiToken,
        'Content-Type': 'application/json; charset=utf-8'
        }

        response = requests.request("POST", url, headers=headers, data=payload)

        return response