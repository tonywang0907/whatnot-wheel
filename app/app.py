
# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, jsonify, request, render_template
from selenium import webdriver
import time
 
# Flask constructor takes the name of
# current module (__name__) as argument.
app = Flask(__name__)
 
# The route() function of the Flask class is a decorator,
# which tells the application which URL should call
# the associated function.
@app.route('/')
def home_page():
    example_embed='This string is from python'
    return render_template('index.html', embed=example_embed)

@app.route('/backend', methods=["GET"])
# ‘/’ URL is bound with hello_world() function.
def backend():
    if request.method == 'GET':
        stream_link = "https://www.whatnot.com/live/d1d59656-0246-46da-ae89-6f69a4698e01"
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
                recent_sales = elem.text
                print(elem.text)
                break
            i += 1
        driver.close()
        return jsonify(recent_sales)
 
# main driver function
if __name__ == '__main__':
 
    # run() method of Flask class runs the application
    # on the local development server.
    app.run()