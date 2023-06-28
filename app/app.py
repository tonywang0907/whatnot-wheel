
# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, render_template, request, flash, jsonify
from selenium import webdriver
import time
import re
import sys

# Flask constructor takes the name of
# current module (__name__) as argument.
app = Flask(__name__)


# The route() function of the Flask class is a decorator,
# which tells the application which URL should call
# the associated function.
@app.route("/")
def home_page():
  css_file = "static/css/style.css"
  title = "Home Page"
  return render_template("home.html", title=title, css_file=css_file)

@app.route("/login", methods=["GET", "POST"])
def login():
  title = "Login Page"
  return render_template("login.html", title=title)

@app.route("/wheel_spin_break_sheet")
def wheel_spin_break_sheet():
  css_file = "static/css/style.css"
  title = "Wheel Spin and Break Sheet"
  return render_template("index.html", title=title, css_file=css_file)

@app.route("/help")
def help():
  css_file = "static/css/help.css"
  title = "Help"
  return render_template("help.html", title=title, css_file=css_file)

@app.route("/login_validation", methods=["POST"])
def login_validation():
  if request.method == 'POST':
    css_file = "static/css/style.css"
    title = "Welcome"
    name = "Welcome " + request.form.get("email").capitalize() + "!"
    return render_template("home.html", title=title, name=name, css_file=css_file)

@app.route("/sign_up", methods=["POST"])
def sign_up():
  css_file = "static/css/sign_up.css"
  title = "Sign Up Page"
  return render_template("sign_up.html", title=title, css_file=css_file)

@app.route("/sign_up_validation", methods=['GET', 'POST'])
def sign_up_validation():
  if request.method == 'POST':
    css_file = "static/css/style.css"
    title = "Welcome"
    email = request.form.get("email1")
    username = request.form.get("username")
    password1 = request.form.get("password1")
    password2 = request.form.get("password2")
    if len(email) < 5:
      flash('Email must be greater than 4 characters.', category='error')
    elif len(username) < 5:
      flash('Username must be greater than 4 characters.', category='error')
    elif password1 != password2 :
      flash('Passwords don\'t match.', category='error')
    elif len(password1) < 7:
      flash('Password must be at least 7 characters.', category='error')
    else:
      return render_template("home.html", title=title, css_file=css_file)
    
  return render_template("sign_up.html")

# Wheel Backend Route 
@app.route('/backend', methods=["POST"])
# ‘/’ URL is bound with hello_world() function.
def backend():
  if request.method == 'POST':
    return get_auction_username(request.json)

def get_auction_username(link):
  try:
    stream_link = link
    driver = webdriver.Chrome()
    driver.get(stream_link)

    time.sleep(3)
    lets_go_btn = driver.find_element("xpath", "//button[@class='oUI6p']")
    lets_go_btn.click()

    time.sleep(1)
    xmark_btn = driver.find_element("xpath", "//*[local-name()='svg' and @data-icon='xmark']")
    xmark_btn.click()
    
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
  except:
    return jsonify("Something is wrong with the link...")

# main driver function
if __name__ == '__main__':

  # run() method of Flask class runs the application
  # on the local development server.
  app.run(debug=True)