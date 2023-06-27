
# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, jsonify, request, render_template
from selenium import webdriver
import time
import re
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.wait import WebDriverWait
import os


# Flask constructor takes the name of
# current module (__name__) as argument.
app = Flask(__name__)
 
# The route() function of the Flask class is a decorator,
# which tells the application which URL should call
# the associated function.
@app.route('/')
def home_page():
    example_embed=''
    return render_template('index.html', embed=example_embed)

@app.route('/debug')
def debug_page():
    return render_template('debug.html')

@app.route('/backend', methods=["POST"])
# ‘/’ URL is bound with hello_world() function.
def backend():
    if request.method == 'POST':
        return get_auction_username(request.json)

def get_auction_username(link):

    chrome_options = webdriver.ChromeOptions()
    chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_argument("--no-sandbox")
    WINDOW_SIZE = "1200,900" 
    chrome_options.add_argument("--window-size=%s" % WINDOW_SIZE)
    
    try:
        stream_link = link
        driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"), chrome_options=chrome_options)
        # driver = webdriver.Chrome()
        driver.get(stream_link)
        time.sleep(3)
        driver.save_screenshot('./wheelspin/static/img/page_look_before.png')
        lets_go_btn = WebDriverWait(driver, timeout=20).until(lambda d: d.find_element("xpath", "//button[@class='oUI6p']"))
        driver.save_screenshot('./wheelspin/static/img/page_look_after.png')
        try:
            # lets_go_btn = driver.find_element("xpath", "//button[@class='oUI6p']")
            lets_go_btn.click()
        except Exception:
            pass

        time.sleep(1)
        try:
            xmark_btn = driver.find_element("xpath", "//*[local-name()='svg' and @data-icon='xmark']")
            xmark_btn.click()
        except Exception:
            pass
        
        time.sleep(1)
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
                recent_sale = elem.text
                print(elem.text)
                break
            i += 1
        driver.close()

        pattern = r"Sold to:\s+(\w+)"
        # Find the username using regular expressions
        match = re.search(pattern, recent_sale)

        if match:
            username = match.group(1)
            print("Username:", username)
        else:
            print("No match found.")

        return jsonify(username)
    except Exception as e:
        print(e)
        return jsonify("Something is wrong with the link...")

# main driver function
if __name__ == '__main__':
 
    # run() method of Flask class runs the application
    # on the local development server.
    app.run()