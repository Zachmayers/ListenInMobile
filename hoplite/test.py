import csv
import pandas as pd
from sqlalchemy import create_engine, types
import pandas as pd
from datetime import datetime
from datetime import date
import os
import argparse
python3 reports_on_matched_data.py --leadspedia_file='LP-0605.csv' --leadspedia_phone_column="Phone Home" --onelink_phone_column="Day_Phone" --ringba_file='RINGBA-0605.csv' --ringba_phone_column="Caller ID"




LP_LEAD_HEADERS = ['Lead ID','First Name', 'Last Name',
              'Phone Home', 'Phone Cell', 'Address', 
              'Address2', 'City', 'State', 'Zip Code',
              'Date Of Birth', 'E-Mail Address', 'Affiliate',
              'Jornaya Lead ID', 'Trusted Form Cert ID', 'Sold',
              'Cost', 'Revenue', 'Profit', 's1', 's2', 's3', 's5'
              'Created On', 'Optin Date Time', 'Universal Lead ID']
file = pd.read_csv('LP_0401-0503.csv')

def remove_unnecessary_headers(headers, file):
    reduced_df = pd.DataFrame()

    for col in headers:
        if col in file.columns:
            reduced_df.insert(len(reduced_df.columns), col, file[col])

    return reduced_df

def trim_header_list(headers, file):
    trimmed = []

    for header in headers:
        if header in file.columns:
            trimmed.append(header)
    
    return trimmed

trim = trim_header_list(LP_LEAD_HEADERS, file)

print(trim)


