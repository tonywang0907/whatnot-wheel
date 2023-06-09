from selenium import webdriver
import os
import sys
import argparse
import time

def main(args):

    # parser = argparse.ArgumentParser(
    #     description=__doc__,
    #     formatter_class=argparse.RawDescriptionHelpFormatter)
    # parser.add_argument('infile', help="Input file", type=argparse.FileType('r'))
    # parser.add_argument('-o', '--outfile', help="Output file",
    #                     default=sys.stdout, type=argparse.FileType('w'))

    # args = parser.parse_args(args)

    # print(args)
    stream_link = "https://www.whatnot.com/live/01c926d0-d204-4b78-8ae9-873ff879ce6e"
    driver = webdriver.Chrome()
    driver.get(stream_link)

    time.sleep(5)
    lets_go_btn = driver.find_element("xpath", "//button[@class='oUI6p']")
    lets_go_btn.click()

    time.sleep(1)
    xmark_btn = driver.find_element("xpath", "//*[local-name()='svg' and @data-icon='xmark']")
    xmark_btn.click()
    
    time.sleep(5)
    sold_btns = driver.find_elements("xpath", "//h5[@data-cy='Sold']")
    for btn in sold_btns:
        if (btn.text != ""):
            btn.click()
            break
    elements = driver.find_elements("xpath", "//div[@data-cy='listing_item']")
    i = 0
    while True:
        elem = elements[i]
        if (elem.text != ""):
            print(elem.text)
            break
        i += 1
    driver.close()


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))