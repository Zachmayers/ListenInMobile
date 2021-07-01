import argparse


def create_arg_parser(ARGS) -> argparse.ArgumentParser:
    """Generate command line argument parser
    Returns:
        argparse.ArgumentParser: command line argument parser
    """

    parser = argparse.ArgumentParser(description='A script for reducing columns and Matching data in Onelink, Ringba, and Leadspedia files.')

    for key, val in ARGS.items():
        parser.add_argument('--' + key, help=val[0], required=val[1])
        
    return parser