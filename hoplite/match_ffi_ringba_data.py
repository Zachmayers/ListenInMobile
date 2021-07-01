import requests
import pandas as pd
import ringba as __ringba_



def match_data(onelink_phone_numbers):
    ringba = __ringba_.Ringba("RA956c02dae7d44b0face945e295d502fd",'09f0c9f0231dcf881399644fae2f1a125212517a2fd9bede3a3c089c6e296ea56ee0dd00a34a0ef11c78e3fe09d6a5c70125e1f82ce018d68e18352ff07d01da254a9cf6c45f75fc6398ee9cb6b715d36fd53bffd0beb2df92e6d0f70d78dd83f14115ac0af387dd6218ed22bc3bd0297b82ab74')
    for number in onelink_phone_numbers:
        
        ringba_json = ringba.get_ringba_call_data(number)

        ringba_df = pd.read_json(path_or_buf = ringba_json.text, typ='series')

    return ringba_df
