import requests


def get_ringba_call_data(phone):
    apiToken = '09f0c9f0231dcf881399644fae2f1a125212517a2fd9bede3a3c089c6e296ea56ee0dd00a34a0ef11c78e3fe09d6a5c70125e1f82ce018d68e18352ff07d01da254a9cf6c45f75fc6398ee9cb6b715d36fd53bffd0beb2df92e6d0f70d78dd83f14115ac0af387dd6218ed22bc3bd0297b82ab74'
    accountId = 'RA956c02dae7d44b0face945e295d502fd'

    url = f"https://api.ringba.com/v2/{accountId}/calllogs"
    payload = "{\n\"reportEnd\": \"2021-06-30T07:59:59Z\",\n\"reportStart\":\"2021-05-01T08:00:00Z\",\n\"filters\": [\n{\n\"anyConditionToMatch\": [\n{\n\"column\": \"inboundPhoneNumber\",\n\"value\": \"+" + phone + "\",\n\"isNegativeMatch\": false,\n\"comparisonType\": \"EQUALS\"\n},\n\n]\n},\n]\n}"
    headers = {
    'Authorization': 'Token ' + apiToken,
    'Content-Type': 'application/json; charset=utf-8'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    return response