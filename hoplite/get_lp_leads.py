import requests

ARGS = {'from_date': ['Date cannot exceed 31 days', True],
        'to_date': ['Date cannot exceed 31 dats.', True],
       }

def create_arg_parser() -> argparse.ArgumentParser:
    """Generate command line argument parser
    Returns:
        argparse.ArgumentParser: command line argument parser
    """

    parser = argparse.ArgumentParser(description='A script for reducing columns and Matching data in Onelink, Ringba, and Leadspedia files.')

    for key, val in ARGS.items():
        parser.add_argument('--' + key, help=val[0], required=val[1])
        
    return parser

api_secret = '73539f6cf67377ea9703f6455dc32a57'
api_key = '6be228c7887c3c2cc8ad0d4bce1a6138'
url = f'https://api.leadspedia.com/core/v2/leads/getAll.do?api_key={api_key}&api_secret={api_secret}&fromDate=05%2F01%2F2021&toDate=06%2F07%2F2021&start=0'

payload = "{}"
response = requests.request("GET", url, data=payload)

print(response.text)

