from selenium import webdriver
import os
import sys
import argparse

def main(args):

    # parser = argparse.ArgumentParser(
    #     description=__doc__,
    #     formatter_class=argparse.RawDescriptionHelpFormatter)
    # parser.add_argument('infile', help="Input file", type=argparse.FileType('r'))
    # parser.add_argument('-o', '--outfile', help="Output file",
    #                     default=sys.stdout, type=argparse.FileType('w'))

    # args = parser.parse_args(args)

    # print(args)
    streamLink = ""
    driver = webdriver.Chrome()
    driver.get(streamLink)
    elements = driver.find_elements("xpath", "@div='listing-item'")



if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))